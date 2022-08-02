import { Link, useLoaderData } from "@remix-run/react";
import { getFileFromGit } from "../utilities/github.server";

export const loader = async () => {
  const homeContent = await getFileFromGit("content/home.mdx");

  return homeContent;
};

const Index = () => {
  const homeContent = useLoaderData();

  return (
    <main>
      <pre>{homeContent}</pre>
    </main>
  );
};

export default Index;
