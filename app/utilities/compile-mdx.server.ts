import { bundleMDX } from "mdx-bundler";
import path from "path";
import remarkGfm from "remark-gfm";
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

export const bundleMDXForPage = async (path: string) => {
  try {
    const blob = await getFileFromGit(path);

    return bundleMDXWithOptions(blob);
  } catch (error) {
    console.error(error);
  }
};

export const getContentForListPage = async (path: string) => {
  try {
    const dirItems = await getDirItemsFromGit(path);

    const itemsContent = await Promise.all(
      dirItems.reduce((requests, { git_url: gitUrl }) => {
        if (gitUrl) {
          requests.push(getBlobFromGitUrl(gitUrl));
        }
        return requests;
      }, [] as Promise<string>[])
    );

    const compiledContent = await Promise.all(
      itemsContent.map((blob) => bundleMDXWithOptions(blob))
    );

    return compiledContent;
  } catch (error) {
    console.error(error);
  }
};
