/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  future: {
    unstable_tailwind: true,
  },
  ignoredRouteFiles: ["**/.*"],
  serverDependenciesToBundle: [
    /^ccount.*/,
    /^character-entities.*/,
    /^decode-named-character-reference.*/,
    /^estree-util-is-identifier-name.*/,
    /^fault.*/,
    /^markdown-table.*/,
    /^mdast-util.*/,
    /^mdx-bundler.*/,
    /^micromark.*/,
    /^remark.*/,
    /^unist-util.*/,
  ],
};
