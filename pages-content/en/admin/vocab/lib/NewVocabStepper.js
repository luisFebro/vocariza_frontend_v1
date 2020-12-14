import { useState, Fragment } from "react";
import Translation from "./steps/Translation";
import Definition from "./steps/Definition";
import { useContext } from "global/Context";

const stepStore = {
    translation: {
        title: "Which word to add, Febro?",
    },
    definition: {
        title: "Select best definition:",
    },
};

export default function NewVocabStepper() {
    const { currStep } = useContext();

    return (
        <Fragment>
            <h1 className="mt-3 text-center">{stepStore[currStep].title}</h1>
            {currStep === "translation" && <Translation />}
            {currStep === "definition" && <Definition />}
        </Fragment>
    );
}
