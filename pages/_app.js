import { Fragment, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
// import Script from 'next/script';

import "../styles/App.scss"; // LESSON: do not use .module.css for global.
import "../styles/libs/fontawesome.js";

function MyApp({ Component, pageProps }) {
    const router = useRouter();

    useEffect(() => {
        const handleRouteChange = (url) => {
            console.log("App is changing to: ", url);
        };

        router.events.on("routeChangeStart", handleRouteChange); // n1

        const handleRouteChangeError = (err, url) => {
            if (err.cancelled) {
                console.log(`Route to ${url} was cancelled!`);
            }
        };

        router.events.on("routeChangeError", handleRouteChangeError);
        // If the component is unmounted, unsubscribe
        // from the event with the `off` method:
        return () => {
            router.events.off("routeChangeStart", handleRouteChange);
            router.events.off("routeChangeError", handleRouteChangeError);
        };
    }, []);

    return (
        <Fragment>
            <Head>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />

                <meta name="creator" content="Vocariza" />

                {/* TOOLBAR COLOR - requires valid HTTPS certification to work #9400d3 = purple */}
                <meta name="theme-color" content="#9400d3" />
                <meta name="msapplication-TileColor" content="#9400d3" />
                <meta name="msapplication-navbutton-color" content="#9400d3" />
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    content="#9400d3"
                />
                {/* END TOOLBAR COLOR */}

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

                {/* GOOGLE FONTS */}
                <link
                    rel="prefetch"
                    href="https://fonts.googleapis.com/css?family=Poppins&display=swap"
                    as="style"
                    onLoad="this.onload=null;this.rel='stylesheet'"
                />
                {/* END GOOGLE FONTS */}
            </Head>
            <Component {...pageProps} />
        </Fragment>
    );
}

export default MyApp;

/* COMMENTS
n1: Router events should be registered when a component mounts (useEffect or componentDidMount / componentWillUnmount) or imperatively when an event happens.
n2: If a route load is cancelled (for example, by clicking two links rapidly in succession), routeChangeError will fire. And the passed err will contain a cancelled property set to true
*/

/*
This App component is the top-level component which will be common across all the different pages. You can use this App component to keep state when navigating between pages, for example.

Important: You need to restart the development server when you add pages/_app.js.

In Next.js, you can add global CSS files by importing them from pages/_app.js. You cannot import global CSS anywhere else.
 */
