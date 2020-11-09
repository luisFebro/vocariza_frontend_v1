import Layout, { siteTitle } from "../../components/_Layout";
import Link from "next/link";
import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";

export default function index() {
    return (
        <Layout home>
            <Head>
                <title>Blog | {siteTitle}</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <p>Product Designer, Languages Freak, biz and Rock 'n' Roll</p>
                <p>
                    (This is a sample website - you’ll be building a site like
                    this on{" "}
                    <a href="https://nextjs.org/learn">our Next.js tutorial</a>
                    .)
                </p>
            </section>
        </Layout>
    );
}
