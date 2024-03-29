import HeadNext from "components/HeadNext";
import Link from "next/link";
import { useState, Fragment } from "react";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import { useRouter } from "next/router";
import Layout, { Breadcrumb } from "components/_layout";

// import Layout from '../../components/Layout';
// import { listBlogsWithCategoriesAndTags } from '../../actions/blog';
// import Card from '../../components/blog/Card';

export default function Blogs({
    blogs,
    categories,
    tags,
    totalBlogs,
    blogsLimit,
    blogSkip,
}) {
    const router = useRouter();

    const Head = () => (
        <HeadNext
            metaTitle={`Blogs | ${APP_NAME}`}
            metaDesc="Vocariza - memorizar vocabulários em Inglês"
            mainPhoto="/img/logo.png"
            urlPath={`/blog`}
            languages={null}
        />
    );

    const [limit, setLimit] = useState(blogsLimit);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(totalBlogs);
    const [loadedBlogs, setLoadedBlogs] = useState([]);

    // const loadMore = () => {
    //     let toSkip = skip + limit;
    //     listBlogsWithCategoriesAndTags(toSkip, limit).then(data => {
    //         if (data.error) {
    //             console.log(data.error);
    //         } else {
    //             setLoadedBlogs([...loadedBlogs, ...data.blogs]);
    //             setSize(data.size);
    //             setSkip(toSkip);
    //         }
    //     });
    // };

    // const loadMoreButton = () => {
    //     return (
    //         size > 0 &&
    //         size >= limit && (
    //             <button onClick={loadMore} className="btn btn-outline-primary btn-lg">
    //                 Load mmore
    //             </button>
    //         )
    //     );
    // };

    // const showAllBlogs = () => {
    //     return blogs.map((blog, i) => {
    //         // ()
    //         return (
    //             <article key={i}>
    //                 <Card blog={blog} />
    //                 <hr />
    //             </article>
    //         );
    //     });
    // };

    // const showAllCategories = () => {
    //     return categories.map((c, i) => (
    //         <Link href={`/categories/${c.slug}`} key={i}>
    //             <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
    //         </Link>
    //     ));
    // };

    // const showAllTags = () => {
    //     return tags.map((t, i) => (
    //         <Link href={`/tags/${t.slug}`} key={i}>
    //             <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
    //         </Link>
    //     ));
    // };

    // const showLoadedBlogs = () => {
    //     return loadedBlogs.map((blog, i) => (
    //         <article key={i}>
    //             <Card blog={blog} />
    //         </article>
    //     ));
    // };

    return (
        <Layout>
            {Head()}
            <Breadcrumb txt="blogues" />
            <ul>
                <li>
                    <Link href="/blog/5-vocabularios-mais-dificeis-de-pronunciar-em-ingles">
                        <a>First article</a>
                    </Link>
                </li>
            </ul>
        </Layout>
    );
}

/*
 <Layout>
                <main>
                    <div className="container-fluid">
                        <header>
                            <div className="col-md-12 pt-3">
                                <h1 className="display-4 font-weight-bold text-center">
                                    Programming blogs and tutorials
                                </h1>
                            </div>
                            <section>
                                <div className="pb-5 text-center">
                                    {showAllCategories()}
                                    <br />
                                    {showAllTags()}
                                </div>
                            </section>
                        </header>
                    </div>
                    <div className="container-fluid">{showAllBlogs()}</div>
                    <div className="container-fluid">{showLoadedBlogs()}</div>
                    <div className="text-center pt-5 pb-5">{loadMoreButton()}</div>
                </main>
            </Layout>
 */

// getInitialProps can only be used with PAGES! Not components..
// Blogs.getInitialProps = () => {
//     return listBlogsWithCategoriesAndTags().then(data => {
//         if (data.error) {
//             console.log(data.error);
//         } else {
//             return {
//                 blogs: data.blogs,
//                 categories: data.categories,
//                 tags: data.tags,
//                 size: data.size
//             };
//         }
//     });
// };
