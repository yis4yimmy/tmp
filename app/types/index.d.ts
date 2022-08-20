interface Frontmatter {
  title?: string;
  subtitle?: string;
  metaTitle?: string;
  slug?: string;
  author?: string;
  description?: string;
}

interface MDXLoaderData {
  code: string;
  frontmatter: Frontmatter;
}
