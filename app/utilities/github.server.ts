import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.MDX_GITHUB_TOKEN,
});

export const getFileFromGit = async (path: string) => {
  try {
    const content = (await octokit.repos.getContent({
      owner: "yis4yimmy",
      repo: "tmp",
      path,
    })) as { data: { git_url: string | null } };

    const blobUrl = content.data.git_url;

    if (!blobUrl) {
      throw new Error("Requested file cannot be fetched as a blob");
    }

    const blobResponse = await octokit.request({ url: blobUrl });

    return Buffer.from(
      blobResponse.data.content,
      blobResponse.data.encoding
    ).toString();
  } catch (error) {
    console.error(error);

    return "Error";
  }
};
