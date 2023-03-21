import type { HtmlMetaDescriptor } from "@remix-run/node";
import defaultMeta from "../constants/default-meta";

export default function setMetaFromFrontmatter(
  data: unknown
): HtmlMetaDescriptor {
  if (isValidData(data)) {
    return {
      title: data.frontmatter.metaTitle || defaultMeta.title,
      author: data.frontmatter.author || defaultMeta.author,
      description: data.frontmatter.description || defaultMeta.description,
    };
  }
  return defaultMeta;
}

function isValidData(x: any): x is { frontmatter: Frontmatter } {
  return (
    x instanceof Object && "frontmatter" in x && x.fronmatter instanceof Object
  );
}
