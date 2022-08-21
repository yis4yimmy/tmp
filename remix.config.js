/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
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
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
};
