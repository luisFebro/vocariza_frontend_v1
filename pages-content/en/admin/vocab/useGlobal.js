// GLOBAL STATES FOR THE CURRENT MAIN ROOT COMPONENT.
import { useState } from "react";

export default function useGlobal() {
    const [currStep, setCurrStep] = useState("translation");
    const [globalData, setGlobalData] = useState({
        vocaEn: "",
        vocaBr: "",
        wordData: null,
        sortedDataList: [],
    });

    const store = {
        currStep,
        setCurrStep,
        globalData,
        setGlobalData,
    };

    return store;
}
