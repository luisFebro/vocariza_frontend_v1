import Link from "next/link";
import { useState, useEffect, Fragment } from "react";
import renderHTML from "react-render-html";
import { getAPI } from "../../api/getAPI";
import { readBlog, getStaticBlogPathsList } from "../../api/requestsLib";
import Head from "../../components/Head";
import { API } from "../../config";
// NOT WORKED YET
// import Layout from '../../components/Layout';
// import { listRelated } from '../../actions/blog';
// import SmallCard from '../../components/blog/SmallCard';
// import DisqusThread from '../../components/DisqusThread';

// const getStyles = () => ({
//     featuredImg: {
//         width: "100%",
//         maxHeight: "500px",
//         objectFit: "cover",
//     },
// });

export default function SingleBlog({ blog, slug }) {
    // const styles = getStyles();

    // const getHead = () => (
    //     <Head
    //         metaTitle={blog.metaTitle}
    //         metaDesc={blog.metaDesc}
    //         mainPhoto={`${API}/blog/photo/${blog.slug}`}
    //         urlPath={`/blog/${slug}`}
    //         languages={blog.languages}
    //     />
    // );
    // const [related, setRelated] = useState([]);

    // const loadRelated = () => {
    //     listRelated({ blog }).then(data => {
    //         if (data.error) {
    //             console.log(data.error);
    //         } else {
    //             setRelated(data);
    //         }
    //     });
    // };

    // useEffect(() => {
    //     loadRelated();
    // }, []);

    // const showBlogCategories = blog =>
    //     blog.categories.map((c, i) => (
    //         <Link key={i} href={`/categories/${c.slug}`}>
    //             <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
    //         </Link>
    //     ));

    // const showBlogTags = blog =>
    //     blog.tags.map((t, i) => (
    //         <Link key={i} href={`/tags/${t.slug}`}>
    //             <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
    //         </Link>
    //     ));

    // const showRelatedBlog = () => {
    //     return related.map((blog, i) => (
    //         <div className="col-md-4" key={i}>
    //             <article>
    //                 <SmallCard blog={blog} />
    //             </article>
    //         </div>
    //     ));
    // };

    // {getHead()}
    return (
        <Fragment>
            <h1>Hello world! This is my first real world blog!</h1>
        </Fragment>
    );
}

export async function getStaticPaths() {
    // n3 dsadsadsa
    // const { data } = await getAPI({ url: getStaticBlogPathsList() });
    // console.log("data", data);

    // const list = data && data.map((doc) => `/blog/${doc.slug}`);

    return {
        paths: ["/blog/5-vocabularios-mais-dificeis-de-pronunciar-em-ingles"],
        fallback: true, // n2
    };
}

export async function getStaticProps(context) {
    console.log("context", context);
    // const { slug } = params;

    // const { data } = await getAPI({ url: readBlog(slug) }).catch((err) => {
    //     console.log("ERROR: " + err);
    // });

    return {
        props: { blog: "a", slug: "fuck" },
        revalidate: 1, // n1 seconds
    };
    // if (data) {
    //     const obj = { blog: data, slug };
    // }
}

/*

<Layout>
    <main>
        <article>
            <div className="container-fluid">
                <section>
                    <div className="row" style={{ marginTop: '-30px' }}>
                        <img
                            src={`${API}/blog/photo/${blog.slug}`}
                            alt={blog.title}
                            className="img img-fluid"
                            style={styles.featuredImg}
                        />
                    </div>
                </section>

                <section>
                    <div className="container">
                        <h1 className="display-2 pb-3 pt-3 text-center font-weight-bold">{blog.title}</h1>
                        <p className="lead mt-3 mark">
                            Written by
                            <Link href={`/profile/${blog.postedBy.username}`}>
                                <a>{blog.postedBy.name}</a>
                            </Link> | Published {moment(blog.updatedAt).fromNow()}
                        </p>

                        <div className="pb-3">
                            {showBlogCategories(blog)}
                            {showBlogTags(blog)}
                            <br />
                            <br />
                        </div>
                    </div>
                </section>
            </div>

            <div className="container">
                <section>
                    <div className="col-md-12 lead">{renderHTML(blog.body)}</div>
                </section>
            </div>

            <div className="container">
                <h4 className="text-center pt-5 pb-5 h2">Related blogs</h4>
                <div className="row">{showRelatedBlog()}</div>
            </div>

            <div className="container pb-5">
                <DisqusThread
                    id={blog.id}
                    title={blog.title}
                    path={`/blog/${blog.slug}`}
                />
            </div>
        </article>
    </main>
</Layout>
 */

/* COMMENTS
n1: fallback: this property is a Boolean, specifying whether or not a fallback version of this page should be generated.
Enabling fallback (via true) allows you to return a subset of all the possible paths that should be statically generated. At runtime, Next.js will statically generate the remaining paths the first time they are requested. Consecutive calls to the path will be served as-if it was statically generated at build-time. This reduces build times when dealing with thousands or millions of pages.
Disabling fallback (via false) requires you return the full collection of paths you would like to statically generate at build-time. At runtime, any path that was not generated at build-time will 404.

n2: Next.js will attempt to re-generate the page:
- When a request comes in
- At most once every second

Now the list of blog posts will be revalidated once per second; if you add a new blog post it will be available almost immediately, without having to re-build your app or make a new deployment.
This works perfectly with fallback: true. Because now you can have a list of posts that's always up to date with the latest posts, and have a blog post page that generates blog posts on-demand, no matter how many posts you add or update.

n3: If omit on a dynamic page: Error: getStaticPaths is required for dynamic SSG (Static Site Generation) pages and is missing for '/blog/[slug]'
alternative format Object variant:
{ params: { slug: '5-vocabularios-mais-dificeis-de-pronunciar-em-ingles' } },
*/
