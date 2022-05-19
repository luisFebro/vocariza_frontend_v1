import { useState, Fragment } from "react";
import Translation from "./steps/Translation";
import Definition from "./steps/Definition";
import Success from "./steps/Success";
import useContext from "global/Context";

const stepStore = {
    translation: {
        title: "Which word to add, Febro?",
    },
    definition: {
        title: "Select best definition:",
    },
    success: {
        title: "Success!",
    },
};

export default function NewVocabStepper() {
    const {
        currStep,
        setCurrStep,
        globalData: { vocaEn },
    } = useContext();

    const title = stepStore[currStep] && stepStore[currStep].title;

    return (
        <Fragment>
            <h1 className="mx-3 mt-5 text-center">{title}</h1>
            {currStep === "translation" && <Translation />}
            {currStep === "definition" && <Definition />}
            {currStep === "success" && (
                <Success word={vocaEn} setCurrStep={setCurrStep} />
            )}
        </Fragment>
    );
}
