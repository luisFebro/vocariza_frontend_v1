import React from 'react';
// import Layout from "../../../components/_Layout";
// import { getAllPostIds, getPostData } from "../../../demo/lib/posts";
// import Head from "next/head";
// import Date from "../../../components/demo/date";
// import utilStyles from "../../../styles/utils.module.css";

export default function Post() {
        return(<h1>Hello Post</h1>)
//     return (
//         <Layout>
//             <Head>
//                 <title>{postData.title}</title>
//             </Head>
//             <article>
//                 <h1 className={utilStyles.headingXl}>{postData.title}</h1>
//                 <div className={utilStyles.lightText}>
//                     <Date dateString={postData.date} />
//                 </div>
//                 <div
//                     dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
//                 />
//             </article>
//         </Layout>
//     );
// }

// // In production, getStaticPaths runs at build time.
// // n3. catch-all routes.
// export async function getStaticPaths() {
//     const paths = getAllPostIds();
//     return {
//         paths, // n1
//         fallback: false, // n2
//     };
// }

// export async function getStaticProps({ params }) {
//     const postData = await getPostData(params.id);
//     return {
//         props: {
//             postData,
//         },
//     };
}

/* COMMENTS
n1:
The array of possible values for id must be the value of the paths key of the returned object. This is exactly what getAllPostIds() returns.

n2:
If fallback is false, then any paths not returned by getStaticPaths will result in a 404 page.

n3:
Catch-all Routes
Dynamic routes can be extended to catch all paths by adding three dots (...) inside the brackets. For example:

pages/posts/[...id].js matches /posts/a, but also /posts/a/b, /posts/a/b/c and so on.
If you do this, in getStaticPaths, you must return an array as the value of the id key like so:

return [
  {
    params: {
      // Statically Generates /posts/a/b/c
      id: ['a', 'b', 'c']
    }
  }
  //...
]
And params.id will be an array in getStaticProps:

export async function getStaticProps({ params }) {
  // params.id will be like ['a', 'b', 'c']
}

*/
