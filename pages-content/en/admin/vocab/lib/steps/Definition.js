import { Fragment } from "react";
import CTAs from "./comps/CTAs";
import { useContext } from "global/Context";
import GridLayout from "react-grid-layout";

const WordCard = ({ wordData, key }) => (
    <Fragment>
        <section key={key} className="my-3 root-card position-relative">
            <div className="position-relative board">
                <strong>{wordData.partOfSpeech}</strong>
            </div>
            <div className="position-relative text-left card">
                Definition: <strong>{wordData.definition}</strong>
            </div>
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
        globalData: { vocaBr, vocaEn, wordData },
    } = useContext();

    const gotWordData = Boolean(wordData && wordData.length);

    const layout = [
        { i: "1", x: 0, y: 0, w: 1, h: 2 },
        { i: "2", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
        { i: "3", x: 4, y: 0, w: 1, h: 2 },
    ];

    const list = [{ color: "blue" }, { color: "pink" }, { color: "red" }];

    const showList = () => (
        <section className="mx-3 my-3 container-center">
            <GridLayout
                className="layout"
                layout={layout}
                cols={1}
                rowHeight={60}
                width={500}
            >
                {list.map((l, ind) => (
                    <div
                        style={{
                            color: "#fff",
                            backgroundColor: l.color,
                            cursor: "grab",
                        }}
                        key={ind}
                    >
                        {l.color}
                    </div>
                ))}
            </GridLayout>
            <style jsx global>
                {`
                    .react-grid-layout {
                        display: flex;
                        justify-content: center;
                    }
                `}
            </style>
        </section>
    );

    return (
        <Fragment>
            <div className="text-subtitle font-weight-bold text-center">
                {vocaEn} ({vocaBr})
            </div>
            <p className="text-center">
                Parts of Speech:{" "}
                <strong>{gotWordData && wordData.allSpeeches}</strong>
            </p>
            {gotWordData && showList()}
            <div className="my-5">
                <CTAs
                    onClickNext={() => setCurrStep("examples")}
                    onClickBack={() => setCurrStep("translation")}
                />
            </div>
        </Fragment>
    );
}

/*
{wordData.map((data, ind) => (
    <Fragment key={data.definition}>
        <WordCard wordData={data} key={ind} />
    </Fragment>
))}
 */
