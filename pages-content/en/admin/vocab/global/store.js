import { useState } from "react";

export const getSteps = () => {
    const [currStep, setCurrStep] = useState("definition");
    const [globalData, setGlobalData] = useState({
        vocaEn: "",
        vocaBR: "",
        wordData: [],
    });

    const store = {
        currStep,
        setCurrStep,
        globalData,
        setGlobalData,
    };

    return store;
};
