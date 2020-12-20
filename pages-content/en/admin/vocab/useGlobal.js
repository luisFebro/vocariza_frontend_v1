// GLOBAL STATES FOR THE CURRENT MAIN ROOT COMPONENT.
import { useState } from "react";
import { useContext } from "global/Context";

export default function useGlobal() {
    const [currStep, setCurrStep] = useState("translation");
    const [globalData, setGlobalData] = useState({
        vocaEn: "",
        vocaBr: "",
        allSpeeches: "",
        mainDefinition: "",
        frequencyLevel: "",
        frequencyGrade: "",
        dirtyLevel: "",
        wordData: null,
    });

    const store = {
        currStep,
        setCurrStep,
        globalData,
        setGlobalData,
    };

    return store;
}
