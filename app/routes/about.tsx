import { json } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getContentForPage } from "../utilities/compile-mdx.server";
import useMDXComponent from "../hooks/useMDXComponent";
import setMetaFromFrontmatter from "../utilities/frontmatter-to-meta";
import Title from "../components/Title";
import Main from "../components/Main";

export async function loader() {
  try {
    const pageData = await getContentForPage("content/about.mdx");

    return json(pageData);
  } catch (error) {
    console.error(error);
  }

  throw new Response("Application Error", {
    status: 500,
    statusText: "Application Error",
  });
}

export const meta: MetaFunction = ({ data }) => setMetaFromFrontmatter(data);

const About = () => {
  const { code, frontmatter } = useLoaderData<typeof loader>();

  const AboutContent = useMDXComponent(code);

  return (
    <Main>
      <Title title={frontmatter.title} subtitle={frontmatter.subtitle} />
      <AboutContent />
    </Main>
  );
};

export default About;
