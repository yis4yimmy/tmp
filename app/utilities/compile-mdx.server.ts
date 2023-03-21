import { bundleMDX } from "mdx-bundler";
import path from "path";
import remarkGfm from "remark-gfm";
import { checkCache, getCachedContent } from "./cache.server";
import {
  getBlobFromGitUrl,
  getDirItemsFromGit,
  getFileFromGit,
} from "./github.server";

if (process.platform === "win32") {
  process.env.ESBUILD_BINARY_PATH = path.join(
    process.cwd(),
    "node_modules",
    "esbuild",
    "esbuild.exe"
  );
} else {
  process.env.ESBUILD_BINARY_PATH = path.join(
    process.cwd(),
    "node_modules",
    "esbuild",
    "bin",
    "esbuild"
  );
}

const bundleMDXWithOptions = async (blob: string) => {
  const { code, frontmatter } = await bundleMDX<Frontmatter>({
    source: blob,
    mdxOptions: (options) => {
      options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm];
      return options;
    },
  });

  return { code, frontmatter };
};

const bundleMDXForPage = async (path: string) => {
  const blob = await getFileFromGit(path);

  return bundleMDXWithOptions(blob);
};

export const getContentForPage = async (path: string) =>
  getCachedContent(path, () => bundleMDXForPage(path));

export const getContentForListPage = async (path: string) => {
  const dirItems = await getDirItemsFromGit(path);

  const itemsContent = await Promise.all(
    dirItems.reduce((requests, { git_url: gitUrl, path }) => {
      if (checkCache(path)) {
        console.info("List item in cache:", path);

        requests.push(
          new Promise((resolve) => resolve({ cached: true, path }))
        );
      } else if (gitUrl) {
        requests.push(
          (async () => {
            const blob = await getBlobFromGitUrl(gitUrl);

            return { cached: false, path, blob };
          })()
        );
      }

      return requests;
    }, [] as Promise<{ cached: boolean; path: string; blob?: string }>[])
  );

  const compiledContent = await Promise.all(
    itemsContent.map(({ cached, path, blob }) => {
      if (cached || !blob) {
        return getCachedContent(path, () => bundleMDXForPage(path));
      }

      return getCachedContent(path, () => bundleMDXWithOptions(blob));
    })
  );

  return compiledContent;
};
