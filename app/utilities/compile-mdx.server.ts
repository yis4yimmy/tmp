import { bundleMDX } from "mdx-bundler";
import path from "path";
import remarkGfm from "remark-gfm";
import { getFileFromGit } from "./github.server";

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

export const bundleMDXForPage = async (path: string) => {
  try {
    const fileContents = await getFileFromGit(path);

    const { code, frontmatter } = await bundleMDX<Frontmatter>({
      source: fileContents,
      mdxOptions: (options) => {
        options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm];
        return options;
      },
    });

    return { code, frontmatter };
  } catch (error) {
    console.error(error);
  }
};
