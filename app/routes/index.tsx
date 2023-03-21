import { json } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import Main from "../components/Main";
import PostList from "../components/PostList";
import Title from "../components/Title";
import useMDXComponent from "../hooks/useMDXComponent";
import {
  getContentForPage,
  getContentForListPage,
} from "../utilities/compile-mdx.server";
import setMetaFromFrontmatter from "../utilities/frontmatter-to-meta";

export async function loader() {
  try {
    const mainContent = await getContentForPage("content/home.mdx");
    const postsList = await getContentForListPage("content/blog");

    if (mainContent && postsList.length > 0) {
      return json({ mainContent, postsList });
    }
  } catch (error) {
    console.error(error);
  }

  throw new Response("Application Error", {
    status: 500,
    statusText: "Application Error",
  });
}

export const meta: MetaFunction<typeof loader> = ({ data }) =>
  setMetaFromFrontmatter(data?.mainContent);

export default function Index() {
  const { mainContent, postsList } = useLoaderData<typeof loader>();

  const HomeContent = useMDXComponent(mainContent.code);

  return (
    <Main>
      <Title
        title={mainContent.frontmatter.title}
        subtitle={mainContent.frontmatter.subtitle}
      />
      <HomeContent />
      <PostList posts={postsList.map(({ frontmatter }) => frontmatter)} />
    </Main>
  );
}
