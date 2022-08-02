import { useLoaderData } from "@remix-run/react";
import { getFileFromGit } from "../utilities/github.server";

export const loader = async () => {
  const aboutContent = await getFileFromGit("content/about.mdx");

  return aboutContent;
};

const About = () => {
  const aboutContent = useLoaderData();

  return (
    <main>
      <pre>{aboutContent}</pre>
    </main>
  );
};

export default About;
