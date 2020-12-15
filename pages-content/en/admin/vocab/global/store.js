import { useState } from "react";

export const getSteps = () => {
    const [currStep, setCurrStep] = useState("definition");
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
};
