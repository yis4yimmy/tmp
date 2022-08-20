import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { bundleMDXForPage } from "../utilities/compile-mdx.server";
import useMDXComponent from "../hooks/useMDXComponent";
import setMetaFromFrontmatter from "../utilities/frontmatter-to-meta";
import Title from "../components/Title";
import Main from "../components/Main";

export const loader: LoaderFunction = async () =>
  bundleMDXForPage("content/about.mdx");

export const meta: MetaFunction = ({ data }) => setMetaFromFrontmatter(data);

const About = () => {
  const { code, frontmatter } = useLoaderData<MDXLoaderData>();

  const AboutContent = useMDXComponent(code);

  return (
    <Main>
      <Title title={frontmatter.title} subtitle={frontmatter.subtitle} />
      <AboutContent />
    </Main>
  );
};

export default About;
