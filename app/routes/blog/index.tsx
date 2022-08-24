import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import Main from "../../components/Main";
import Title from "../../components/Title";
import {
  bundleMDXForPage,
  getContentForListPage,
} from "../../utilities/compile-mdx.server";
import setMetaFromFrontmatter from "../../utilities/frontmatter-to-meta";

export const loader: LoaderFunction = async () => {
  const blogContent = await bundleMDXForPage("content/blog-list.mdx");
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
      <ul>
        {postsList.map(({ frontmatter }) => (
          <Link key={frontmatter.slug} to={`/blog/${frontmatter.slug}`}>
            <li>
              <span>{frontmatter.date}</span>
              <h3>{frontmatter.title}</h3>
              <p>{frontmatter.description}</p>
            </li>
          </Link>
        ))}
      </ul>
    </Main>
  );
};

export default BlogIndex;
