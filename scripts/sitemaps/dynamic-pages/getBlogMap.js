const fs = require("fs");
const globby = require("globby");
const { DOMAIN_PROD } = require("../../../config");
const getAPIBack = require("../../../api/getAPIBack");
const { getStaticBlogPathsList } = require("../../../api/requestsLib");

const getDate = new Date().toISOString();

async function getBlogMap() {
    // Ignore Next.js specific files (e.g., _app.js) and API routes.
    const pages = await globby([
        // include
        "pages/**/*{.js,.mdx}",
        // exclude
        "!pages/_*.js",
        "!pages/api",
    ]);

    const { data } = await getAPIBack({ url: getStaticBlogPathsList() });
    const paths = data.map((doc) => doc.slug);

    const pagesSitemap = `
    ${paths
        .map((path) => {
            return `
          <url>
            <loc>${DOMAIN_PROD}/blog/${path}</loc>
            <lastmod>${getDate}</lastmod>
          </url>
        `;
        })
        .join("")}
  `;

    return pagesSitemap;
}

module.exports = getBlogMap;
