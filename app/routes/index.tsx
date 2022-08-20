import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Main from "../components/Main";
import Title from "../components/Title";
import useMDXComponent from "../hooks/useMDXComponent";
import { bundleMDXForPage } from "../utilities/compile-mdx.server";
import setMetaFromFrontmatter from "../utilities/frontmatter-to-meta";

export const loader: LoaderFunction = async () =>
  bundleMDXForPage("content/home.mdx");

export const meta: MetaFunction = ({ data }) => setMetaFromFrontmatter(data);

const Index = () => {
  const { code, frontmatter } = useLoaderData<MDXLoaderData>();

  const HomeContent = useMDXComponent(code);

  return (
    <Main>
      <Title title={frontmatter.title} />
      <HomeContent />
    </Main>
  );
};

export default Index;
