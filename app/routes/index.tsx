import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import useMDXComponent from "../hooks/useMDXComponent";
import { bundleMDXForPage } from "../utilities/compile-mdx.server";
import setMetaFromFrontmatter from "../utilities/frontmatter-to-meta";

export const loader: LoaderFunction = async () =>
  bundleMDXForPage("content/home.mdx");

export const meta: MetaFunction = ({ data }) => setMetaFromFrontmatter(data);

const Index = () => {
  const { code } = useLoaderData();

  const HomeContent = useMDXComponent(code);

  return (
    <main>
      <HomeContent />
    </main>
  );
};

export default Index;
