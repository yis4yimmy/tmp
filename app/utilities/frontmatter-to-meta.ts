import type { HtmlMetaDescriptor } from "@remix-run/node";
import defaultMeta from "../constants/default-meta";

interface Frontmatter {
  metaTitle?: string;
  author?: string;
  description?: string;
}

const setMetaFromFrontmatter = ({
  frontmatter = {},
}: {
  frontmatter: Frontmatter;
}): HtmlMetaDescriptor => ({
  title: frontmatter.metaTitle || defaultMeta.title,
  author: frontmatter.author || defaultMeta.author,
  description: frontmatter.description || defaultMeta.description,
});

export default setMetaFromFrontmatter;
