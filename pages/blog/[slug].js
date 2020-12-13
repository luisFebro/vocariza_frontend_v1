import SinglePage from "pages-content/blog/SingleBlog";
import { getAPIBack } from "api/getAPIBack";
import { readBlog, getStaticBlogPathsList } from "api/requestsLib";

export default SinglePage;

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
