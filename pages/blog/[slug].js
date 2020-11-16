import Link from "next/link";
import { useState, useEffect, Fragment } from "react";
import { getAPI } from "../../api-front/getAPI";
import { readBlog, getStaticBlogPathsList } from "../../api/requestsLib";
import HeadNext from "../../components/HeadNext";
import renderHTML from "react-render-html"; // LESSON: renderHTML use a wrapper tag such as <section> around body content, otherwise it will return an object instead of HTML node and it will not be deployed properly.

// NOT WORKED YET fsdfdlsfljsdjfds
// import Layout from '../../components/Layout';
// import { listRelated } from '../../actions/blog';
// import SmallCard from '../../components/blog/SmallCard';
// import DisqusThread from '../../components/DisqusThread';

// LESSON: if data obj like blog, then add an empty {} because it gets undefined before get filled;
export default function SingleBlog({ blog = {} }) {
    const [renderDone, setRenderDone] = useState(false);

    let HTML;

    useEffect(() => {
        HTML = require("react-render-html");
        setRenderDone(true);
    }, []);

    const Head = () => (
        <HeadNext
            metaTitle={blog.metaTitle}
            metaDesc={blog.metaDesc}
            mainPhoto={blog.photo}
            urlPath={`/blog/${blog.slug}`}
            languages={blog.languages}
        />
    );

    const showHeader = () => <header className="">I am the nav stuff</header>;

    const showArticleEntry = () => (
        <Fragment>
            <section className="entry-header">
                <h1 className="mx-md-5 mx-3 text-title text-center">
                    {blog.title}
                </h1>
            </section>
            <section>
                <figure>
                    <img
                        src={"/img/blog/7-pronounce.jpg"}
                        alt={blog.title}
                        height={400}
                        width=""
                        className="img img-fluid featured-img"
                    />
                </figure>
            </section>
            <style jsx>
                {`
                    .featured-img {
                        width: 100%;
                        max-height: 300px;
                        object-fit: cover;
                    }
                `}
            </style>
        </Fragment>
    );

    const showArticleMainContent = () => (
        <Fragment>
            <main>
                <section className="mx-md-5 ml-3 mr-2 text-normal text-justify">
                    {renderHTML(`<section>${blog.body}</section>`)}
                </section>
            </main>
        </Fragment>
    );
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

    return (
        <Fragment>
            {Head()}
            {showHeader()}
            <article className="container-fluid">
                {showArticleEntry()}
                {showArticleMainContent()}
            </article>
        </Fragment>
    );
}

// WARNING: VERY important: If Vercel Deploy is handling after "info  - Collecting page data..."
// Then, check backend because can have an API issue...
export async function getStaticPaths() {
    // n3 dsadsadsa
    const { data } = await getAPI({ url: getStaticBlogPathsList() }).catch(
        (err) => {
            console.log("ERROR: " + err);
        }
    );

    const list = data && data.map((doc) => `/blog/${doc.slug}`);

    return {
        paths: list,
        fallback: true, // n2
    };
}

export async function getStaticProps({ params }) {
    const { slug } = params;

    const { data } = await getAPI({ url: readBlog(slug) }).catch((err) => {
        console.log("ERROR: " + err);
    });

    if (data) {
        return {
            props: { blog: data },
            revalidate: 1, // n1 seconds
        };
    }
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
