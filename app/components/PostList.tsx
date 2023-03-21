import { Link } from "@remix-run/react";

type PostListProps = {
  posts: Frontmatter[];
};

const PostList = ({ posts }: PostListProps) => (
  <ul className="my-8">
    {posts.map(({ date, description, slug, title }) => {
      if (date && description && slug && title) {
        return (
          <li key={slug} className="card-link mb-4">
            <span>{date}</span>
            <h3>
              <Link to={`/blog/${slug}`}>{title}</Link>
            </h3>
            <p>{description}</p>
          </li>
        );
      }

      return null;
    })}
  </ul>
);

export default PostList;
