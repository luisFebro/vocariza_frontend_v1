import { useState } from "react";
import Layout from "../../../../components/_layout";
import useSWR, { getVocaData } from "../../../../api/useSWR";
import Field from "../../../../components/fields/Field";
import Snackbar from "../../../../components/Snackbar";
import getId from "../../../../utils/getId";
import parse from "html-react-parser";
// LESSON: page's name should be in camelcase format otherwise fast refresh won't work.

const handlePronounceDelimiters = (pronounceArray) => {
    if (!pronounceArray) return;
    const syllablesCount = pronounceArray.length;
    const armStrongCss = `<span style="font-size: 40px; color: var(--mainPurple); position: relative; top: -20px; left: 15px; transform: rotate(-10deg) scaleX(-1);" class="d-inline-block">💪</span>`;
    if (syllablesCount === 1) {
        let singleSyllable = pronounceArray[0];
        singleSyllable = singleSyllable.replace("ˈ", armStrongCss);
        return parse(singleSyllable);
    }

    let finalIpa = "";
    pronounceArray.forEach((s, ind) => {
        console.log("s", s);
        s = s.replace("ˌ", "");
        s = s.replace("ˈ", armStrongCss);
        const isLast = syllablesCount === ind + 1;
        finalIpa += `${s}${!isLast ? " ▪ " : ""}`;
    });

    return parse(finalIpa);
};

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
            <p className="text-center text-normal">
                {handlePronounceDelimiters(vocabData && vocabData.pronounce.en)}
            </p>
            <section className="my-3 container-center">
                <div className="text-center translation-card">
                    <p className="px-3 font-size text-em-1-4">
                        Best Translation
                    </p>
                    <p className="px-3 text-title">
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
            <h1 className="mt-5 text-center">Which word to add, Febro?</h1>
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
