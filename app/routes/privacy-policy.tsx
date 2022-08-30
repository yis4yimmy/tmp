import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Main from "../components/Main";
import Title from "../components/Title";
import useMDXComponent from "../hooks/useMDXComponent";
import { getContentForPage } from "../utilities/compile-mdx.server";
import setMetaFromFrontmatter from "../utilities/frontmatter-to-meta";

export const loader: LoaderFunction = async () =>
  getContentForPage("content/privacy-policy.mdx");

export const meta: MetaFunction = ({ data }) => setMetaFromFrontmatter(data);

const PrivacyPolicy = () => {
  const { code, frontmatter } = useLoaderData<MDXLoaderData>();

  const PrivacyContent = useMDXComponent(code);

  return (
    <Main>
      <Title title={frontmatter.title} subtitle={frontmatter.subtitle} />
      <PrivacyContent />
    </Main>
  );
};

export default PrivacyPolicy;
