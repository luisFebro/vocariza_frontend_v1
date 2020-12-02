import { useState } from "react";
import Layout from "../../../../components/_layout";
import useSWR, { getVocabData } from "../../../../api/useSWR";
// LESSON: page's name should be in camelcase format otherwise fast refresh won't work.

export default function Newvocab() {
    const [trigger, setTrigger] = useState(false);

    const body = { vocabEn: "cool" };
    const { data, isLoading, error } = useSWR({
        url: getVocabData(),
        method: "post",
        body,
        trigger,
    });

    // if (error) return <h1>An error occured: {JSON.stringify(error)}</h1>;

    const runTrigger = () => {
        setTrigger(true);
    };

    return (
        <Layout>
            <h1 className="mt-5 text-center text-purple">
                Which word to add, Febro?
            </h1>
            {isLoading && trigger && <h1>Loading...</h1>}
            {JSON.stringify(data)}
            <button className="btn" onClick={runTrigger}>
                Click to get Data
            </button>
        </Layout>
    );
}
