import { Fragment, useEffect } from "react";
import CTAs from "./comps/CTAs";
import { useContext } from "global/Context";
import DraggableGrid from "components/DraggableGrid";

const WordCard = ({ wordData, key }) => (
    <Fragment>
        <section key={key} className="my-3 root-card position-relative">
            <div className="position-relative board">
                <strong>{wordData.partOfSpeech}</strong>
            </div>
            <section className="card">
                <div className="position-relative text-left">
                    Definition: <strong>{wordData.definition}</strong>
                </div>
                <div className="position-relative text-left">
                    Examples: {!wordData.examples && "no examples"}
                    {wordData.examples && (
                        <ul>
                            {wordData.examples.map((elem) => (
                                <li>{elem}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </section>
        </section>
        <style jsx global>
            {`
                .root-card {
                    width: 500px;
                }

                .card {
                    border-radius: 20px;
                    padding: 10px 15px;
                    background-color: var(--mainPurple);
                    color: #fff;
                }
            `}
        </style>
    </Fragment>
);

export default function Definition() {
    const {
        setCurrStep,
        globalData: { vocaBr, vocaEn, wordData = {}, sortedDataList = [] },
        setGlobalData,
    } = useContext();

    const gotWordData = Boolean(wordData);
    const mainData = gotWordData && wordData.treatedWordData;
    useEffect(() => {
        if (!mainData) return;

        setGlobalData((prev) => ({
            ...prev,
            sortedDataList: mainData,
        }));
    }, [mainData]);

    const ultimateList =
        gotWordData &&
        mainData.map((item) => (
            <div
                style={{
                    cursor: "grab",
                }}
                key={item.definition}
                data-grid={{ i: item.definition, x: 0, y: 0, w: 4, h: 2 }} // use y to check the current dropped position from each element
            >
                <WordCard wordData={item} />
            </div>
        ));

    const getLayoutResult = (res) => {
        setGlobalData((prev) => ({
            ...prev,
            sortedDataList: res,
        }));
    };

    console.log("sortedDataList", sortedDataList);

    const showList = () => (
        <DraggableGrid
            reactList={ultimateList}
            rawData={mainData}
            getLayoutResult={getLayoutResult}
            targetElem="definition"
        />
    );

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
            {gotWordData ? (
                <div className="text-subtitle font-weight-bold text-center">
                    {vocaEn} ({vocaBr})
                </div>
            ) : (
                <div className="text-subtitle font-weight-bold text-center">
                    No data.
                </div>
            )}
            {gotWordData && (
                <p className="text-center">
                    Parts of Speech: <strong>{getPartsOfSpeech()}</strong>
                </p>
            )}
            {gotWordData && showList()}
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
