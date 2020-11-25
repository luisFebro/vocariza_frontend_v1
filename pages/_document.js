import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    // n1 about HEAD and metatag
    render() {
        return (
            <Html lang="pt-br" dir="ltr">
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;

/* COMMENTS
n1:
Document is only rendered in the server, event handlers like onClick won't work

The <Head /> component used here is not the same one from next/head. The <Head /> component used here should only be used for any <head> code that is common for all pages. For all other cases, such as <title> tags, we recommend using next/head in your pages or components.

To avoid duplicate tags in your head you can use the key property, which will make sure the tag is only rendered once, as in the following example:

<Head>
<title>My page title</title>
<meta property="og:title" content="My page title" key="title" />
</Head>
<Head>
<meta property="og:title" content="My new title" key="title" />
</Head>

In this case only the second <meta property="og:title" /> is rendered. meta tags with duplicate name attributes are automatically handled.

The contents of head get cleared upon unmounting the component, so make sure each page completely defines what it needs in head, without making assumptions about what other pages added.
 */
