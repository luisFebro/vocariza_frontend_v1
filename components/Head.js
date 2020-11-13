import { Fragment } from "react";
import { default as NextHead } from "next/head";
import { DOMAIN, APP_NAME, FB_APP_ID } from "../config";

const getMultiLangMeta = ({ languages, urlPath }) => {
    return languages.map((lang, ind) => {
        let hreflang = lang.trim();
        let param = `/${hreflang}`;

        if (lang === "br") {
            hreflang = "pt-br";
            param = "";
        }

        return (
            <Fragment key={ind}>
                <link
                    rel="alternate"
                    href={`${DOMAIN}${param}${urlPath}`}
                    hrefLang={hreflang}
                />
            </Fragment>
        );
    });
};

export default function Head({
    metaTitle,
    metaDesc,
    mainPhoto,
    urlPath,
    languages, // e.g ["br", "en"]
    isArticle = true,
}) {
    const currUrl = `${DOMAIN}${urlPath}`;
    const getOpenGraphMeta = () => (
        <Fragment>
            <meta property="og:locale" content="pt_BR" />
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDesc} />
            <meta
                property="og:type"
                content={isArticle ? "article" : "website"}
            />
            <meta property="og:url" content={currUrl} />
            <meta property="og:site_name" content={`${APP_NAME}`} />
            <meta property="og:image" content={mainPhoto} />
            <meta property="og:image:secure_url" content={mainPhoto} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
            <meta property="og:image:width" content="800" />
            <meta property="og:image:height" content="600" />
        </Fragment>
    );

    const needLang = languages && languages.length >= 2;
    return (
        <NextHead>
            <title>{metaTitle}</title>
            <link rel="canonical" href={currUrl} />
            <meta name="description" content={metaDesc} />
            {needLang && getMultiLangMeta({ languages, urlPath })}
            {getOpenGraphMeta()}
        </NextHead>
    );
}
