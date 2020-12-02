import Link from "next/link";
import { useEffect, Fragment } from "react";
import { getAPIBack } from "../../api/getAPIBack";
import { readBlog, getStaticBlogPathsList } from "../../api/requestsLib";
import HeadNext from "../../components/HeadNext";
import renderHTML from "react-render-html"; // LESSON: renderHTML use a wrapper tag such as <section> around body content, otherwise it will return an object instead of HTML node and it will not be deployed properly.
import Img from "../../components/Img";
import AuthorAndDate from "../../components/blog/AuthorAndDate";
import Layout, { Breadcrumb } from "../../components/_layout";

// NOT WORKED YET fsdfdlsfljsdjfds
// import Layout from '../../components/Layout';
// import { listRelated } from '../../actions/blog';
// import SmallCard from '../../components/blog/SmallCard';
// import DisqusThread from '../../components/DisqusThread';

// LESSON: if data obj like blog, then add an empty {} because it gets undefined before get filled;
export default function SingleBlog({ blog = {} }) {
    const Head = () => (
        <HeadNext
            metaTitle={blog.metaTitle}
            metaDesc={blog.metaDesc}
            mainPhoto={blog.photo}
            urlPath={`/blog/${blog.slug}`}
            languages={blog.languages}
            noIndex={true} // temp while editing the blog.
        />
    );

    const displayPurpleLine = () => (
        <Fragment>
            <div className="ml-3 ml-md-5 mt-5 purple-line"></div>
            <style jsx>
                {`
                    .purple-line {
                        width: 100px;
                        height: 3px;
                        background: var(--themePDark);
                    }
                `}
            </style>
        </Fragment>
    );

    const showArticleTitleAndAuthor = () => (
        <Fragment>
            <section className="entry-header">
                {displayPurpleLine()}
                <h1 className="animated fadeInUp text-purple mx-3 text-title text-md-center">
                    {blog.title}
                </h1>
                <AuthorAndDate author="Luis Febro" updatedAt={blog.updatedAt} />
            </section>
            <Img
                src={"/img/blog/7-pronounce.jpg"}
                alt={blog.title}
                layout="fill"
                priority={true}
                figcaption="5 palavras difíceis que todos tem dificuldade"
                needFigure={true}
            />
        </Fragment>
    );

    const showArticleMainContent = () => (
        // n4 about section
        <Fragment>
            <main>
                <article className="mx-md-5 mx-3">
                    {renderHTML(
                        `<section><h2>What is Lorem Ipsum?</h2><p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry.</p><h3>Sua história</h3><p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p><h2>Você vai aprender:</h2><ul><li>Qual é a expressão mais difícil</li><li>Sua origem</li></ul><p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p><h2>Why do we use it?</h2><p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. Segundo <a href="https://google.com">Google</a></p><blockquote><p>It was a bright cold day in April, and the clocks were striking thirteen.</p><footer><cite><a href="http://www.george-orwell.org/1984/0.html">Nineteen Eighty-Four</a></cite> by George Orwell (Part 1, Chapter 1).</footer></blockquote>The point of using <mark>Lorem Ipsum</mark> is that it has a more-or-less normal distribution of letters, as opposed to using <a href="google.com" target="_blank" rel="noopener noreferrer">'Content here, content here'</a>, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p><h2>Where does it come from?</h2><p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p></section>`
                    )}
                </article>
            </main>
        </Fragment>
    );

    return (
        <Layout>
            {Head()}
            <Breadcrumb mainCrumb={blog.title} />
            {showArticleTitleAndAuthor()}
            {showArticleMainContent()}
        </Layout>
    );
}

// WARNING: VERY important: If Vercel Deploy is handling after "info  - Collecting page data..."
// Then, check backend because can have an API issue...
// 2. Verify if dates are getting undefined values when passing to server side.
export async function getStaticPaths() {
    // n3 dsadsadsa
    const { data } = await getAPIBack({ url: getStaticBlogPathsList() }).catch(
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

    const { data } = await getAPIBack({ url: readBlog(slug) }).catch((err) => {
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

n4: The article tag is used for wrapping an autonomous content on a page. A content is autonomous if it can be removed from the page and put on some another page. The article tag can contain several section tags inside it, like in our example. An article is actually an autonomous section.
*/
