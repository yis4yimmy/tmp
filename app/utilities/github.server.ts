import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.MDX_GITHUB_TOKEN,
});

export const getDirItemsFromGit = async (dirPath: string) => {
  const dirItems = await octokit.repos.getContent({
    owner: "yis4yimmy",
    repo: "tmp",
    path: dirPath,
  });

  const items = dirItems.data;

  if (!items || !Array.isArray(items)) {
    throw new Error("Invalid directory maybe?");
  }

  return items;
};

export const getBlobFromGitUrl = async (gitUrl: string) => {
  const blobResponse = await octokit.request({ url: gitUrl });

  return Buffer.from(
    blobResponse.data.content,
    blobResponse.data.encoding
  ).toString();
};

export const getFileFromGit = async (path: string) => {
  const content = (await octokit.repos.getContent({
    owner: "yis4yimmy",
    repo: "tmp",
    path,
  })) as { data: { git_url: string | null } };

  const blobUrl = content.data.git_url;

  if (!blobUrl) {
    throw new Error("Requested file cannot be fetched as a blob");
  }

  return getBlobFromGitUrl(blobUrl);
};
