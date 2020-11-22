import { useEffect } from "react";
import dynamic from "next/dynamic";
import Layout from "../components/_layout";
const DynamicWatson = dynamic(() => import("../components/tts/Watson"), {
    ssr: false,
});

export default function descubra() {
    // useEffect(() => {
    // }, []);

    return (
        <Layout>
            <section className="text-hero">
                I am Discover
                <DynamicWatson />
            </section>
        </Layout>
    );
}
