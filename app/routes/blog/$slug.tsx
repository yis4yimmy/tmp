import { json } from "@remix-run/node";
import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import Main from "../../components/Main";
import Title from "../../components/Title";
import useMDXComponent from "../../hooks/useMDXComponent";
import { getContentForPage } from "../../utilities/compile-mdx.server";
import setMetaFromFrontmatter from "../../utilities/frontmatter-to-meta";

export async function loader({ params }: LoaderArgs) {
  try {
    const postContent = await getContentForPage(
      `content/blog/${params.slug}.mdx`
    );

    console.log({ postContent });

    return json(postContent);
  } catch (error) {
    if (error instanceof Error && error.message === "Not Found") {
      throw new Response("Post Not Found", {
        status: 404,
        statusText: "Post Not Found",
      });
    }
  }

  throw new Response("Application Error", {
    status: 500,
    statusText: "Application Error",
  });
}

export const meta: MetaFunction = ({ data }) => setMetaFromFrontmatter(data);

export default function Post() {
  const { code, frontmatter } = useLoaderData<typeof loader>();

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
}
