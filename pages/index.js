import HeadNext from "../components/HeadNext";
import Layout, { siteTitle } from "../components/_layout";
import Link from "next/link";
import Image from "next/image";
// import { getSortedPostsData } from "../demo/lib/posts";
// import Date from "../components/demo/date";
// import styles from '../styles/Home.module.css'

export default function Home() {
    const Head = () => (
        <HeadNext
            metaTitle={siteTitle}
            metaDesc="Descubra as melhores técnicas de memorização de vocabulários em Inglês com repetição espaçada"
            mainPhoto="/img/logo/logo.png"
            urlPath={`/`}
            languages={null}
        />
    );

    return (
        <Layout home>
            {Head()}
            <section>
                <h1>Memorize Vocabulários para sempre</h1>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Image src="/img/logo-name.png" width="200" height="100%" />
                </div>
            </section>
        </Layout>
    );
}

// export const getStaticProps = async ({ query }) => {
//     const { data } = await getAPI({
//         url: getTestMsg(),
//     });

//     return {
//         props: {
//             msg: data.msg,
//         },
//     };
// };

/* COMMENTS

n1:
The naming convention for pages is all lowercase. Your root page should thusly be called index.js.
PRE-RENDERING: By default, Next.js pre-renders every page. This means that Next.js generates HTML for each page in advance, instead of having it all done by client-side JavaScript. Pre-rendering can result in better performance and SEO.

Two Forms of Pre-rendering
Next.js has two forms of pre-rendering: Static Generation and Server-side Rendering. The difference is in when it generates the HTML for a page.
Static Generation (Recommended): The HTML is generated at build time and will be reused on EACH REQUEST. That means in production, the page HTML is generated when you run next build
Server-side Rendering: The HTML is generated on each request.

In development mode (when you run npm run dev or yarn dev), every page is pre-rendered on each request — even for pages that use Static Generation.

When to Use Static Generation v.s. Server-side Rendering
We recommend using STATIC GENERATION (with and without data) whenever possible because your page can be built once and served by CDN, which makes it much faster than having a server render the page on every request.

You can use Static Generation for many types of pages, including:
Marketing pages
Blog posts
E-commerce product listings
Help and documentation
You should ask yourself: "Can I pre-render this page ahead of a user's request?" If the answer is yes, then you should choose Static Generation.

On the other hand, Static Generation is not a good idea if you cannot pre-render a page ahead of a user's request. Maybe your page shows frequently updated data, and the page content changes on every request.

In that case, you can use Server-side Rendering. It will be slower, but the pre-rendered page will always be up-to-date. Or you can skip pre-rendering and use client-side JavaScript to populate frequently updated data.

getStaticProps
Essentially, getStaticProps allows you to tell Next.js: “Hey, this page has some data dependencies — so when you pre-render this page at build time, make sure to resolve them first!”
This is possible because getStaticProps runs only on the server-side. It will never run on the client-side. It won’t even be included in the JS bundle for the browser. That means you can write code such as direct database queries without them being sent to browsers.
You can import modules in top-level scope for use in getStaticProps. Imports used in getStaticProps will not be bundled for the client-side.
This means you can write server-side code directly in getStaticProps. This includes reading from the filesystem or a database.

When should I use getStaticProps?
You should use getStaticProps if:

The data required to render the page is available at build time ahead of a user’s request.
The data comes from a headless CMS.
The data can be publicly cached (not user-specific).
The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

getServerSideProps
To use Server-side Rendering (Also referred to as "SSR" or "Dynamic Rendering".), you need to export getServerSideProps instead of getStaticProps from your page.
You should use getServerSideProps only if you need to pre-render a page whose data must be fetched at request time. Time to first byte (TTFB) will be slower than getStaticProps because the server must compute the result on every request, and the result cannot be cached by a CDN without extra configuration.

Client-side rendering
Statically generate (pre-render) parts of the page that do not require external data.
When the page loads, fetch external data from the client using JavaScript and populate the remaining parts
This approach works well for user dashboard pages, for example. Because a dashboard is a private, user-specific page, SEO is not relevant, and the page doesn’t need to be pre-rendered. The data is frequently updated, which requires request-time data fetching.

SWR
The team behind Next.js has created a React hook for data fetching called SWR. We highly recommend it if you’re fetching data on the client side. It handles caching, revalidation, focus tracking, refetching on interval, and more.


n2:
With getStaticProps you don't have to stop relying on dynamic content, as static content can also be dynamic. Incremental Static Regeneration allows you to update existing pages by re-rendering them in the background as traffic comes in.
Inspired by stale-while-revalidate, background regeneration ensures traffic is served uninterruptedly, always from static storage, and the newly built page is pushed only after it's done generating.
*/
