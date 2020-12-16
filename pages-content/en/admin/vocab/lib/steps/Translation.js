import { useState, useEffect, Fragment } from "react";
import useSWR, { getVocaData } from "api/useSWR";
import Field from "components/fields/Field";
import Snackbar from "components/Snackbar";
import getId from "utils/getId";
import { handlePronounceDelimiters } from "./helpers";
import CTAs from "./comps/CTAs";
import { useContext } from "global/Context";

export default function Translation() {
    const { setCurrStep, setGlobalData } = useContext();

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

    useEffect(() => {
        if (!vocabData || !newVocab) return;
        setGlobalData({
            vocaBr: vocabData.vocaBr,
            vocaEn: newVocab,
            wordData: vocabData,
        });
    }, [vocabData, newVocab]);

    const handleEnter = () => {
        const id = getId();
        setTrigger(id);
    };

    const showTranslationResult = () => (
        <main className="animated fadeInUp">
            <p className="my-3 text-center text-normal">
                {handlePronounceDelimiters(vocabData.pronounce.en)}
            </p>
            <section className="my-3 container-center">
                <div className="text-center translation-card">
                    <p className="text-white m-0 p-3 font-size text-em-1-4">
                        Best Translation
                    </p>
                    <p className="text-white m-0 px-3 text-title">
                        {vocabData.vocaBr}
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
        <Fragment>
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
            {vocabData && (
                <Fragment>
                    {showTranslationResult()}
                    <CTAs
                        onClickNext={() => {
                            setCurrStep("definition");
                        }}
                    />
                </Fragment>
            )}
        </Fragment>
    );
}
