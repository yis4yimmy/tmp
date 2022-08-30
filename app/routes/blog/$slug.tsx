import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Main from "../../components/Main";
import Title from "../../components/Title";
import useMDXComponent from "../../hooks/useMDXComponent";
import { getContentForPage } from "../../utilities/compile-mdx.server";
import setMetaFromFrontmatter from "../../utilities/frontmatter-to-meta";

export const loader: LoaderFunction = async ({ params }) => {
  const postContent = await getContentForPage(
    `content/blog/${params.slug}.mdx`
  );

  return postContent;
};

export const meta: MetaFunction = ({ data }) => setMetaFromFrontmatter(data);

const Post = () => {
  const { code, frontmatter } = useLoaderData<MDXLoaderData>();

  const PostContent = useMDXComponent(code);

  return (
    <Main>
      <Title
        title={frontmatter.title}
        subtitle={frontmatter.subtitle}
        date={frontmatter.date}
      />
      <PostContent />
    </Main>
  );
};

export default Post;
