import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Main from "../components/Main";
import PostList from "../components/PostList";
import Title from "../components/Title";
import useMDXComponent from "../hooks/useMDXComponent";
import {
  getContentForPage,
  getContentForListPage,
} from "../utilities/compile-mdx.server";
import setMetaFromFrontmatter from "../utilities/frontmatter-to-meta";

export const loader: LoaderFunction = async () => {
  const mainContent = await getContentForPage("content/home.mdx");
  const postsList = await getContentForListPage("content/blog");

  return { mainContent, postsList };
};

export const meta: MetaFunction = ({ data }) =>
  setMetaFromFrontmatter({ frontmatter: data.mainContent.frontmatter });

const Index = () => {
  const { mainContent, postsList } = useLoaderData<{
    mainContent: MDXLoaderData;
    postsList: MDXLoaderData[];
  }>();

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
};

export default Index;
