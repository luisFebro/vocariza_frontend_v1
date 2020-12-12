import { useState, useEffect } from "react";
import Layout from "../../../../components/_layout";
import useSWR, { getVocaData } from "../../../../api/useSWR";
import Field from "../../../../components/fields/Field";
import Snackbar from "../../../../components/Snackbar";
import getId from "../../../../utils/getId";
import { handlePronounceDelimiters } from "../../../../page-helpers/admin/new-vocab";
// LESSON: page's name should be in camelcase format otherwise fast refresh won't work.

export default function Newvocab() {
    const [trigger, setTrigger] = useState(false);
    const [data, setData] = useState({
        newVocab: "",
    });
    const { newVocab } = data;

    const params = { word: newVocab };
    const { data: vocabData, isLoading, error } = useSWR({
        url: getVocaData(),
        method: "get",
        trigger,
        params,
        needNanoId: true,
    });

    const handleEnter = () => {
        const id = getId();
        setTrigger(id);
    };

    const showTranslationResult = () => (
        <main className="animated fadeInUp">
            <p className="my-3 text-center text-normal">
                {handlePronounceDelimiters(vocabData && vocabData.pronounce.en)}
            </p>
            <section className="my-3 container-center">
                <div className="text-center translation-card">
                    <p className="m-0 p-3 font-size text-em-1-4">
                        Best Translation
                    </p>
                    <p className="m-0 px-3 text-title">
                        {vocabData && vocabData.vocaBr}
                    </p>
                </div>
            </section>
            <style jsx>
                {`
                    .translation-card {
                        border-radius: 30px;
                        color: #fff;
                        background-color: var(--mainPurple);
                    }
                `}
            </style>
        </main>
    );

    return (
        <Layout>
            <h1 className="mt-3 text-center">Which word to add, Febro?</h1>
            <div className="container-center">
                <Field
                    size="large"
                    name="newVocab"
                    value={newVocab}
                    onChangeCallback={setData}
                    textAlign="text-center"
                    enterCallback={handleEnter}
                />
            </div>
            {isLoading && trigger && (
                <h1 className="text-center">Loading...</h1>
            )}
            {error && <Snackbar txt={error} type="error" />}
            {!isLoading && !error && showTranslationResult()}
        </Layout>
    );
}
