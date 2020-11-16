import { useEffect } from "react";
import dynamic from "next/dynamic";
const DynamicWatson = dynamic(() => import("../components/tts/Watson"), {
    ssr: false,
});

export default function descubra() {
    // useEffect(() => {
    // }, []);

    return (
        <section className="text-hero">
            I am Discover
            <DynamicWatson />
        </section>
    );
}
