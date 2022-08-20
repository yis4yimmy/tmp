import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { bundleMDXForPage } from "../utilities/compile-mdx.server";
import useMDXComponent from "../hooks/useMDXComponent";
import setMetaFromFrontmatter from "../utilities/frontmatter-to-meta";

export const loader: LoaderFunction = async () =>
  bundleMDXForPage("content/about.mdx");

export const meta: MetaFunction = ({ data }) => setMetaFromFrontmatter(data);

const About = () => {
  const { code } = useLoaderData();

  const AboutContent = useMDXComponent(code);

  return (
    <main>
      <AboutContent />
    </main>
  );
};

export default About;
