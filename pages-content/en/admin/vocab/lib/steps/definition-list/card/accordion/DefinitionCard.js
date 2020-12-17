import { Fragment, useEffect } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ButtonFab from "components/buttons/material-ui/ButtonFab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "global/Context";
import DefinitionMoreBtn from "./more-btn/DefinitionMoreBtn";
import truncate from "utils/string/truncate";
import isSmall from "utils/isSmall";
// import ToggleBtn from "./ToggleBtn";
// import "./Accordion.scss";

export default function DefinitionCard({ wordData, ind }) {
    const { setGlobalData } = useContext();

    const stopPropagation = (event) => {
        event.stopPropagation();
    };

    const removeItem = (e, ind) => {
        stopPropagation(e);
        setGlobalData((prev) => {
            const newList = prev.wordData.treatedWordData;
            newList.splice(ind, 1);
            return {
                ...prev,
                wordData: { ...prev.wordData, treatedWordData: newList },
            };
        });
    };

    return (
        <Fragment>
            <section className="my-3 root-card position-relative">
                {ind === 0 ? (
                    <p className="main-badge">Best!</p>
                ) : (
                    <p className="main-badge sec">Secondary N.º {ind + 1}</p>
                )}
                {ind !== 0 && (
                    <div className="delete-btn">
                        <ButtonFab
                            variant="round"
                            size="extra-small"
                            backgroundColor="var(--expenseRed)"
                            faIcon={<FontAwesomeIcon icon="trash-alt" />}
                            onClick={(e) => removeItem(e, ind)}
                            onMouseDown={(e) => removeItem(e, ind)}
                            onTouchStart={(e) => removeItem(e, ind)}
                        />
                    </div>
                )}
                <div className="more-btn">
                    <DefinitionMoreBtn data={wordData} />
                </div>
                <div className="position-relative board">
                    <strong>{wordData.partOfSpeech.en}</strong>
                </div>
                <section className="card">
                    <div className="position-relative">
                        <strong>Definition: </strong>
                        {truncate(wordData.definition.en, isSmall() ? 40 : 70)}
                    </div>
                    <div className="position-relative mt-2">
                        <strong>
                            Found:{" "}
                            {!wordData.examples &&
                                !wordData.synonyms &&
                                !wordData.antonyms &&
                                "nothing"}
                        </strong>
                        {wordData.examples && wordData.examples.length
                            ? `♦ ${wordData.examples.length} examples. `
                            : ""}
                        {wordData.synonyms && wordData.synonyms.length
                            ? `♦ ${wordData.synonyms.length} synonyms. `
                            : ""}
                        {wordData.antonyms && wordData.antonyms.length
                            ? `♦ ${wordData.antonyms.length} antonyms.`
                            : ""}
                    </div>
                </section>
            </section>
            <style jsx global>
                {`
                    .root-card {
                        width: 100%;
                        height: 140px !important;
                    }

                    .card {
                        border-radius: 20px;
                        padding: 10px 15px;
                        background-color: var(--mainPurple);
                        color: #fff;
                        height: 100%;
                    }

                    .main-badge {
                        position: absolute;
                        font-weight: bold;
                        top: -20px;
                        right: 10px;
                        color: #000;
                        background: var(--incomeGreen);
                        border-radius: 20px;
                        border: 3px solid var(--themeP);
                        padding: 1px 5px;
                    }

                    .main-badge.sec {
                        background: var(--mainWhite);
                        border-radius: 20px;
                    }

                    .delete-btn {
                        position: absolute;
                        top: -5px;
                        left: 70px;
                        z-index: 1000;
                    }

                    @media screen and (min-width: 768px) {
                        .delete-btn {
                            left: 85px;
                        }
                    }

                    .more-btn {
                        position: absolute;
                        top: 50%;
                        right: -20%;
                        transform: translate(70%, 60%);
                        z-index: 10;
                    }
                `}
            </style>
        </Fragment>
    );
}

/*
const displayStatusBadge = (panel, daysLeft) => {
    const transactionStatus = handleTransactionStatus({ panel, daysLeft });

    const handleBack = () => {
        if(transactionStatus === "PENDENTE") return "grey";
        if(
            transactionStatus === "PAGO" ||
            transactionStatus === "PAGO/RENOVADO"
        )
            return "var(--incomeGreen)";
        if(transactionStatus === "RENOVADO") return "var(--niceUiYellow)";
        if(
            transactionStatus === "CANCELADO" ||
            transactionStatus === "EXPIRADO"
        )
            return "var(--expenseRed)";
        return "var(--mainDark)";
    };

    return (
        <div className="enabledLink">
            <ButtonFab
                position="absolute"
                top={-20}
                right={0}
                disabled={true}
                title={transactionStatus}
                variant="extended"
                fontWeight="bolder"
                fontSize=".6em"
                color="var(--mainWhite)"
                backgroundColor={handleBack()}
            />
        </div>
    );
};

const showPanel = (panel) => {
    return (
        <section>
            <AccordionSummary
                expandIcon={
                    <div className="enabledLink">
                        {needToggleButton && (
                            <ToggleBtn cardId={panel._id} />
                        )}
                    </div>
                }
                aria-controls={`panel${panel._id}bh-content`}
                id={`panel${panel._id}bh-header`}
            >
                {isSmall ? (
                    <section className="position-relative">
                        <div>{panel.mainHeading}</div>
                        {panel.secondaryHeading}
                    </section>
                ) : (
                    <Fragment>
                        <Typography className="ex-pa-main-heading ex-pa--headings">
                            {panel.mainHeading}
                        </Typography>
                        <Typography className="ex-pa--headings">
                            {panel.secondaryHeading}
                        </Typography>
                    </Fragment>
                )}
            </AccordionSummary>
        </section>
    );
};

const showHiddenPanel = (panel) => (
    <AccordionDetails>{panel.hiddenContent}</AccordionDetails>
);

const showAccordion = ({ panel, daysLeft }) => (
    <Accordion
        TransitionProps={{ unmountOnExit: true }}
        className="disabledLink"
        style={styles.accordion}
    >
        {showPanel(panel, daysLeft)}
        {showHiddenPanel(panel)}
    </Accordion>
);

const ActionsMap = actions.map((panel, ind) => {
    const { planDueDate, renewal } = panel.data;
    const daysLeft = !planDueDate ? null : getDatesCountdown(planDueDate);

    const props = {
        key: ind,
        className: "position-relative mx-3 mb-5",
    };

    return checkDetectedElem({ list: actions, ind, indFromLast: 5 }) ? (
        <div {...props} ref={detectedCard}>
            {showAccordion({ panel, daysLeft })}
        </div>
    ) : (
        <div {...props}>{showAccordion({ panel, daysLeft })}</div>
    );
});

return <div className={classes.root}>{ActionsMap}</div>;
 */
