import HeadNext from "components/HeadNext";
import Layout, { Breadcrumb } from "components/_layout";
import { useRouter } from "next/router";
import cap from "utils/string/cap";

export default function Category() {
    const router = useRouter();
    const {
        query: { c },
    } = router;

    const cat = {
        metaTitle: c,
        metaDesc: `Aprenda palavras e expressões de ${
            c && c.toUpperCase()
        } em Inglês`,
    };

    return (
        <Layout>
            <HeadNext
                metaTitle={cat.metaTitle}
                metaDesc={cat.metaDesc}
                mainPhoto={cat.photo}
                urlPath={`/c/${cat.slug}`}
                languages={cat.languages}
                noIndex={true} // temp while editing the blog.
            />
            <Breadcrumb />
            <h1 className="text-center">{cap(c)}</h1>
        </Layout>
    );
}
