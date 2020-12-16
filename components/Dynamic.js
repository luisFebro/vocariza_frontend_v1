import dynamic from "next/dynamic";

export default function Dynamic(loader, options = {}) {
    const {
        loading = () => <p>...</p>,
        ssr = true, // // ssr: You may not always want to include a module on server-side. For example, when the module includes a library that only works in the browser.
    } = options;

    return dynamic(loader, { loading, ssr });
}
