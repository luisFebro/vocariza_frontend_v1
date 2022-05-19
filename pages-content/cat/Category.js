import HeadNext from "components/HeadNext";
import Layout, { Breadcrumb } from "components/_layout";

export default function Category() {
    const cat = {
        metaTitle: "Gírias",
        metaDesc: "Aprenda palavras de GÍRIAS em Inglês",
    };

    return (
        <Layout>
            <HeadNext
                metaTitle={cat.metaTitle}
                metaDesc={cat.metaDesc}
                mainPhoto={cat.photo}
                urlPath={`/cat/${cat.slug}`}
                languages={cat.languages}
                noIndex={true} // temp while editing the blog.
            />
            <Breadcrumb txt="Gírias" />
        </Layout>
    );
}
