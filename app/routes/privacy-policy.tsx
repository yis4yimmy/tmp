import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import useMDXComponent from "../hooks/useMDXComponent";
import { bundleMDXForPage } from "../utilities/compile-mdx.server";
import setMetaFromFrontmatter from "../utilities/frontmatter-to-meta";

export const loader: LoaderFunction = async () =>
  bundleMDXForPage("content/privacy-policy.mdx");

export const meta: MetaFunction = ({ data }) => setMetaFromFrontmatter(data);

const PrivacyPolicy = () => {
  const { code } = useLoaderData();

  const PrivacyContent = useMDXComponent(code);

  return (
    <main>
      <PrivacyContent />
    </main>
  );
};

export default PrivacyPolicy;
