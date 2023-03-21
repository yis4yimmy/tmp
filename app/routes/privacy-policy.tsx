import { json } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Main from "../components/Main";
import Title from "../components/Title";
import useMDXComponent from "../hooks/useMDXComponent";
import { getContentForPage } from "../utilities/compile-mdx.server";
import setMetaFromFrontmatter from "../utilities/frontmatter-to-meta";

export async function loader() {
  try {
    const pageData = await getContentForPage("content/privacy-policy.mdx");

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

const PrivacyPolicy = () => {
  const { code, frontmatter } = useLoaderData<typeof loader>();

  const PrivacyContent = useMDXComponent(code);

  return (
    <Main>
      <Title title={frontmatter.title} subtitle={frontmatter.subtitle} />
      <PrivacyContent />
    </Main>
  );
};

export default PrivacyPolicy;
