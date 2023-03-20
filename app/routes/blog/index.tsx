import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import Main from "../../components/Main";
import PostList from "../../components/PostList";
import Title from "../../components/Title";
import {
  getContentForPage,
  getContentForListPage,
} from "../../utilities/compile-mdx.server";
import setMetaFromFrontmatter from "../../utilities/frontmatter-to-meta";

export const loader: LoaderFunction = async () => {
  const blogContent = await getContentForPage("content/blog-list.mdx");
  const postsList = await getContentForListPage("content/blog");

  return { blogContent, postsList };
};

export const meta: MetaFunction = ({ data }) =>
  setMetaFromFrontmatter({ frontmatter: data.blogContent.frontmatter });

const BlogIndex = () => {
  const { blogContent, postsList } = useLoaderData<{
    blogContent: MDXLoaderData;
    postsList: MDXLoaderData[];
  }>();

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
