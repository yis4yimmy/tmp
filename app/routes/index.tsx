import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import Main from "../components/Main";
import Title from "../components/Title";
import useMDXComponent from "../hooks/useMDXComponent";
import {
  bundleMDXForPage,
  getContentForListPage,
} from "../utilities/compile-mdx.server";
import setMetaFromFrontmatter from "../utilities/frontmatter-to-meta";

export const loader: LoaderFunction = async () => {
  const mainContent = await bundleMDXForPage("content/home.mdx");
  const postsList = await getContentForListPage("content/blog");

  return { mainContent, postsList };
};

export const meta: MetaFunction = ({ data }) => setMetaFromFrontmatter(data);

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
      <ul className="">
        {postsList.map(({ frontmatter }) => (
          <Link key={frontmatter.slug} to={`blog/${frontmatter.slug}`}>
            <li className="">
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

export default Index;
