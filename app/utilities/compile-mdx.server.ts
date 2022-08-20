import { bundleMDX } from "mdx-bundler";
import { getFileFromGit } from "./github.server";

export const bundleMDXForPage = async (path: string) => {
  try {
    const fileContents = await getFileFromGit(path);

    const { code, frontmatter } = await bundleMDX<Frontmatter>({
      source: fileContents,
    });

    return { code, frontmatter };
  } catch (error) {
    console.error(error);
  }
};
