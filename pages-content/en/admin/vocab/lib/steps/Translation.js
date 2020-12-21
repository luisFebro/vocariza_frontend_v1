import { useState, useEffect, Fragment } from "react";
import useSWR, { getVocaData, countVocas } from "api/useSWR";
import Field from "components/fields/Field";
import Snackbar from "components/Snackbar";
import getId from "utils/getId";
import { handlePronounceDelimiters } from "./helpers";
import CTAs from "./comps/CTAs";
import { useContext } from "global/Context";
import Img from "components/Img";
import runWatson from "utils/tts/runWatson";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ButtonFab from "components/buttons/material-ui/ButtonFab";
//dsa
export default function Translation() {
    const {
        setCurrStep,
        setGlobalData,
        globalData: { frequencyLevel, frequencyGrade },
    } = useContext();

    const [trigger, setTrigger] = useState(false);
    const [data, setData] = useState({
        newVocab: "",
        editMainBr: false,
        newValueMainBr: "",
    });
    const { newVocab, editMainBr, newValueMainBr } = data;

    const params = { word: newVocab };
    const { data: vocabData, isLoading, error } = useSWR({
        url: getVocaData(),
        trigger,
        params,
        needNanoId: true,
    });

    const { data: vocaCount, isLoading: loadingCount } = useSWR({
        url: countVocas(),
    });

    useEffect(() => {
        if (!vocabData || !newVocab) return;
        const {
            frequencyLevel,
            frequencyGrade,
            allSpeeches,
            mainBr,
        } = vocabData;

        setGlobalData({
            vocaBr: mainBr,
            vocaEn: newVocab,
            frequencyLevel,
            frequencyGrade,
            allSpeeches,
            wordData: vocabData,
        });
    }, [vocabData, newVocab]);

    const handleEnter = () => {
        const id = getId();
        setTrigger(id);
    };

    // useEffect(() => {
    //     if(newVocab) handleEnter();
    // }, [newVocab])

    const showPronounce = () => (
        <section className="my-2 container-center">
            <p className="text-normal">
                {handlePronounceDelimiters(vocabData.mainPronounce.en)}
            </p>
            <div className="ml-3">
                <ButtonFab
                    variant="round"
                    size="small"
                    faIcon={<FontAwesomeIcon icon="volume-up" />}
                    onClick={async () =>
                        await runWatson({ text: vocabData.mainEn })
                    }
                />
            </div>
        </section>
    );

    const handleMainBrDone = async () => {
        await setGlobalData((prev) => ({
            ...prev,
            vocaBr: newValueMainBr,
        }));

        setData({ ...data, editMainBr: false });
    };

    const showTranslationResult = () => (
        <main className="animated fadeInUp">
            <section className="my-3 container-center">
                <div className="text-center translation-card">
                    <p className="text-white m-0 p-3 font-size text-em-1-4">
                        <Img
                            src="/img/icons/flags/br.svg"
                            width={70}
                            height={30}
                            alt="brazilian flag"
                        />
                        <br />
                        Best Translation:
                    </p>
                    <section className="container-center">
                        {editMainBr ? (
                            <Field
                                size="medium"
                                name="newValueMainBr"
                                value={newValueMainBr}
                                onChangeCallback={setData}
                                enterCallback={handleMainBrDone}
                            />
                        ) : (
                            <p className="text-white m-0 px-3 text-title">
                                {newValueMainBr || vocabData.mainBr}
                            </p>
                        )}
                        <div className="ml-1">
                            {!editMainBr && (
                                <ButtonFab
                                    variant="round"
                                    size="extra-small"
                                    faIcon={
                                        <FontAwesomeIcon icon="pencil-alt" />
                                    }
                                    onClick={() =>
                                        setData({ ...data, editMainBr: true })
                                    }
                                />
                            )}
                        </div>
                    </section>
                    <p className="text-white text-small">
                        <strong>Frequency:</strong>
                        <br />
                        {frequencyLevel} ({frequencyGrade})
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
                <p>
                    <strong>{loadingCount ? "..." : vocaCount} words</strong>{" "}
                    added so far
                </p>
                <Field
                    size="large"
                    fullWidth={false}
                    name="newVocab"
                    value={newVocab}
                    onChangeCallback={setData}
                    debounceCallback={handleEnter}
                    textAlign="text-center"
                />
            </div>
            {isLoading && trigger && (
                <h1 className="text-center">Loading...</h1>
            )}
            {error && <Snackbar txt={error} type="error" />}
            {vocabData && (
                <Fragment>
                    {showPronounce()}
                    <section className="container-result">
                        {showTranslationResult()}
                        <div className="mb-5 mb-md-0 ml-md-5">
                            <CTAs
                                onClickNext={() => {
                                    setCurrStep("definition");
                                }}
                            />
                        </div>
                    </section>
                </Fragment>
            )}
            <style jsx>
                {`
                    .container-result {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-flow: column wrap;
                    }

                    @media screen and (min-width: 768px) {
                        .container-result {
                            flex-flow: row wrap;
                        }
                    }
                `}
            </style>
        </Fragment>
    );
}
