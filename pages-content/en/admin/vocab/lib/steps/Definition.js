import { Fragment, useEffect } from "react";
import CTAs from "./comps/CTAs";
import { useContext } from "global/Context";
import DefinitionList from "./definition-list/DefinitionList";

export default function Definition() {
    const {
        setCurrStep,
        globalData: {
            vocaBr,
            vocaEn,
            frequencyLevel,
            wordData = {},
            sortedDataList = [],
        },
    } = useContext();

    const gotWordData = Boolean(wordData);

    const getPartsOfSpeech = () => {
        return (
            gotWordData &&
            wordData.allSpeeches.map((part, ind) => {
                const isLast = wordData.allSpeeches.length === ind + 1;
                return `${part}${!isLast ? ", " : "."}`;
            })
        );
    };

    return (
        <Fragment>
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
                        <strong>{sortedDataList.length}</strong> definitions
                        found.
                    </h2>
                    <h3 className="text-sm-left text-md-center">
                        Parts of Speech:
                        <br />
                        <span className="text-normal font-weight-normal">
                            {getPartsOfSpeech()}
                        </span>
                    </h3>
                    <ul>
                        <li>
                            Drag and drop to arrange definitions below by the{" "}
                            <em>level of meaning's quality</em>
                        </li>
                        <li>
                            <em>Generate translation</em> from each one or
                            delete uncommon definitions instead
                        </li>
                    </ul>
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
            <div className="my-5">
                <CTAs
                    onClickNext={
                        gotWordData ? () => setCurrStep("examples") : null
                    }
                    onClickBack={() => setCurrStep("translation")}
                />
            </div>
        </Fragment>
    );
}
