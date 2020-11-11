const fs = require("fs");
const globby = require("globby");
const prettier = require("prettier");
const { DOMAIN_PROD } = require("../../config");
const getBlogMap = require("./dynamic-pages/getBlogMap");

const getDate = new Date().toISOString();

const handlePath = (path) => {
    const isDynamic = path === "/blog/[slug]";

    if (isDynamic) return false;
    return path === "/index" ? "" : path;
};

(async () => {
    // Ignore Next.js specific files (e.g., _app.js) and API routes.
    const pages = await globby([
        // include
        "pages/**/*{.js,.mdx}",
        // exclude
        "!pages/_*.js",
        "!pages/api",
    ]);

    const defaultPages = `
    ${pages
        .map((page) => {
            const path = page
                .replace("pages", "")
                .replace(".js", "")
                .replace(".mdx", "");
            const route = handlePath(path);
            if (!route) return;

            return `
          <url>
            <loc>${DOMAIN_PROD}${route}</loc>
            <lastmod>${getDate}</lastmod>
          </url>
        `;
        })
        .join("")}
  `;

    const blogPages = await getBlogMap();
    const pagesSitemap = defaultPages + blogPages;

    const generatedSitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    >
      ${pagesSitemap}
    </urlset>
  `;

    const prettierConfig = await prettier.resolveConfig("./.prettierrc.js");
    const prettify = (sitemap) =>
        prettier.format(sitemap, {
            ...prettierConfig,
            parser: "html",
        });

    fs.writeFileSync("public/sitemap.xml", prettify(generatedSitemap), "utf8");
})();

/*
LESSON: all paths considers the root as the starting point
if I write this path ../public/..., then this error occurs: UnhandledPromiseRejectionWarning: Error: ENOENT: no such file or directory, open '../public/sitemap.xml'

prior had only this:
<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
 */
