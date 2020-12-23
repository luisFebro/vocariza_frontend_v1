import { Fragment, useEffect, useState } from "react";
import CTAs from "./comps/CTAs";
import { useContext } from "global/Context";
import DefinitionList from "./definition-list/DefinitionList";
import useScrollUp from "hooks/scroll/useScrollUp";
import Snackbar from "components/Snackbar";
import getAPIBack from "api/getAPIBack";
import { createVoca } from "api/requestsLib";
import Etymology from "./comps/Etymology";

export default function Definition() {
    const [error, setError] = useState("");
    const {
        setCurrStep,
        globalData: {
            vocaBr,
            vocaEn,
            allSpeeches,
            frequencyLevel,
            frequencyGrade,
            wordData = {},
            etymology,
        },
    } = useContext();

    useScrollUp();

    const gotWordData = Boolean(wordData);

    const saveWord = async () => {
        const {
            definition: mainDefinition,
            examples: mainExamples,
            synonyms: mainSynonyms,
            antonyms: mainAntonyms,
            dialect: mainDialect,
            langRegister: mainLangRegister,
            vulgarLevel: mainVulgarLevel,
        } = wordData.treatedWordData[0];

        const ultimateTreatedData = wordData.treatedWordData;
        const otherDefinitions = ultimateTreatedData.slice(1);

        const body = {
            mainEn: vocaEn,
            mainBr: vocaBr,
            mainPartOfSpeech: wordData.allSpeeches,
            mainPronounce: wordData.mainPronounce,
            mainDefinition,
            allSpeeches,
            frequencyLevel,
            frequencyGrade,
            mainExamples,
            mainSynonyms,
            mainAntonyms,
            mainDialect,
            mainLangRegister,
            mainVulgarLevel,
            otherDefinitions,
            etymology,
        };

        await getAPIBack({
            method: "post",
            url: createVoca(),
            body,
        });
    };

    const getPartsOfSpeech = () => {
        return (
            gotWordData &&
            wordData.allSpeeches.map((part, ind) => {
                const isLast = wordData.allSpeeches.length === ind + 1;
                return `${part}${!isLast ? ", " : "."}`;
            })
        );
    };

    const showInstru = () => (
        <section className="container">
            <ul className="max-w-500">
                <li className="text-sm-left text-md-center">
                    Drag and drop to arrange definitions below by the{" "}
                    <em>level of meaning's quality</em>
                </li>
            </ul>
        </section>
    );

    return (
        <section>
            {!gotWordData ? (
                <div className="text-subtitle font-weight-bold text-center">
                    No data.
                </div>
            ) : (
                <section className="mx-3">
                    <section className="container-center">
                        <div className="root-word-title">
                            <div className="text-pill d-table text-subtitle font-weight-bold text-center">
                                {vocaEn} ({vocaBr})
                            </div>
                            <p className="position-relative text-small mb-0 text-capitalize">
                                {frequencyLevel}
                            </p>
                        </div>
                    </section>
                    <h2 className="text-center">
                        <strong>{wordData.treatedWordData.length}</strong>{" "}
                        definitions found.
                    </h2>
                    <h3 className="text-sm-left text-md-center">
                        Parts of Speech:
                        <br />
                        <span className="text-normal font-weight-normal">
                            {getPartsOfSpeech()}
                        </span>
                    </h3>
                    {showInstru()}
                    <DefinitionList />
                    <style jsx>
                        {`
                            .root-word-title p {
                                font-weight: bold;
                                top: -10px;
                                text-align: right;
                            }
                        `}
                    </style>
                </section>
            )}
            <Etymology ety={etymology} currWord={vocaEn} />
            <div className="my-5">
                <CTAs
                    onClickNext={async () => {
                        let countTranslated = 0;
                        wordData.treatedWordData.forEach((elem) => {
                            if (elem.definition.br) countTranslated += 1;
                        });

                        const translatedLeft =
                            wordData.treatedWordData.length - countTranslated;
                        if (translatedLeft) {
                            return setError(
                                `${translatedLeft} definitions missing to be translated, checked or removed`
                            );
                        }

                        await saveWord();

                        gotWordData || translatedLeft === 0
                            ? setCurrStep("success")
                            : null;
                    }}
                    nextTitle="salvar"
                    onClickBack={() => setCurrStep("translation")}
                />
            </div>
            {error && <Snackbar txt={error} type="error" />}
        </section>
    );
}
