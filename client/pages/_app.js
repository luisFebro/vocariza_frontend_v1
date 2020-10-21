import { Fragment } from "react";
import Head from "next/head";
import "../styles/globals.css";

/*
This App component is the top-level component which will be common across all the different pages. You can use this App component to keep state when navigating between pages, for example.

Important: You need to restart the development server when you add pages/_app.js.

In Next.js, you can add global CSS files by importing them from pages/_app.js. You cannot import global CSS anywhere else.
 */

function MyApp({ Component, pageProps }) {
    return (
        <Fragment>
            <Head>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </Head>
            <Component {...pageProps} />
        </Fragment>
    );
}

export default MyApp;
