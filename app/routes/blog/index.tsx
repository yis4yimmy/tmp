import { json } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Main from "../../components/Main";
import PostList from "../../components/PostList";
import Title from "../../components/Title";
import {
  getContentForPage,
  getContentForListPage,
} from "../../utilities/compile-mdx.server";
import setMetaFromFrontmatter from "../../utilities/frontmatter-to-meta";

export async function loader() {
  try {
    const blogContent = await getContentForPage("content/blog-list.mdx");
    const postsList = await getContentForListPage("content/blog");

    if (blogContent && postsList.length > 0) {
      return json({ blogContent, postsList });
    }
  } catch (error) {
    console.error(error);
  }

  throw new Response("Application Error", {
    status: 500,
    statusText: "ApplicationError",
  });
}

export const meta: MetaFunction = ({ data }) =>
  setMetaFromFrontmatter({ frontmatter: data.blogContent.frontmatter });

const BlogIndex = () => {
  const { blogContent, postsList } = useLoaderData<typeof loader>();

  return (
    <Main>
      <Title
        title={blogContent.frontmatter.title}
        subtitle={blogContent.frontmatter.subtitle}
      />
      <PostList posts={postsList.map(({ frontmatter }) => frontmatter)} />
    </Main>
  );
};

export default BlogIndex;
