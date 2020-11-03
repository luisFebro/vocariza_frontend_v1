import { Fragment } from "react";
import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    // n1 about global stuff
    return (
        <Fragment>
            <Head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="Content-Language" content="pt-br" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />

                {/*TOOLBAR COLOR - requires valid HTTPS certification to work #9400d3 = purple*/}
                <meta name="theme-color" content="#9400d3" />
                <meta name="msapplication-TileColor" content="#9400d3" />
                <meta name="msapplication-navbutton-color" content="#9400d3" />
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    content="#9400d3"
                />
                {/*END TOOLBAR COLOR*/}

                {/*META SEO*/}
                <link rel="canonical" href="https://vocariza.com" />
                <meta name="generator" content="https://vocariza.com" />
                <meta name="author" content="Febro" />
                <meta
                    name="description"
                    content="Memorize vocabulários para sempre"
                />
                <meta
                    name="keywords"
                    content="vocabulários, inglês, idioma, memorização, pronúncia, aprendizado, técnicas"
                />
                {/* END META SEO*/}

                {/* FAVICON */}
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/icons/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/icons/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/icons/favicon-16x16.png"
                />
                <link rel="manifest" href="/icons/site.webmanifest" />
                <link
                    rel="mask-icon"
                    href="/icons/safari-pinned-tab.svg"
                    color="#9400d3"
                />
                <link rel="shortcut icon" href="/icons/favicon.ico" />
                <meta name="msapplication-TileColor" content="#9400d3" />
                <meta
                    name="msapplication-config"
                    content="/icons/browserconfig.xml"
                />
                <meta name="theme-color" content="#ffffff" />
                {/* END FAVICON */}
            </Head>
            <Component {...pageProps} />
        </Fragment>
    );
}

export default MyApp;

/*
This App component is the top-level component which will be common across all the different pages. You can use this App component to keep state when navigating between pages, for example.

Important: You need to restart the development server when you add pages/_app.js.

In Next.js, you can add global CSS files by importing them from pages/_app.js. You cannot import global CSS anywhere else.
 */
