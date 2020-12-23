import { useState } from "react";
import Select from "components/selects/Select";
// same as language register - Language register is the level of formality with which you speak.

const changeElem = (target, options = {}) => {
    const { currElem, newVal, treatedWordData } = options;

    return treatedWordData.map((main) => {
        if (main.definition.en === currElem.definition.en) {
            main[target] = newVal;
        }
        return main;
    });
};

export function LinguisticStyle({ setGlobalData, currElem }) {
    const [data, setData] = useState({
        vulgar: "none",
        style: "neutral",
    });
    const { vulgar, style } = data;

    const handleSelect = async (val, target) => {
        if (target === "vulgarLevel") {
            setData({ ...data, vulgar: val });
        } else {
            setData({ ...data, style: val });
        }
        await setGlobalData((prev) => ({
            ...prev,
            wordData: {
                ...prev.wordData,
                treatedWordData: changeElem(target, {
                    currElem,
                    newVal: val,
                    treatedWordData: prev.wordData.treatedWordData,
                }),
            },
        }));
    };

    const valueList = ["formal", "casual", "neutral", "vulgar"];
    const vulgarList = ["none", "moderate", "derogatory", "obscene"];

    return (
        <section className="container-center-col my-3">
            <Select
                label="Select style:"
                currValue={style}
                defaultValue="neutral"
                valueList={valueList}
                onSelectCallback={(val) => handleSelect(val, "langRegister")}
            />
            {style === "vulgar" && (
                <div className="mt-3 animated fadeInUp">
                    <Select
                        label="vulgarity's level:"
                        currValue={vulgar}
                        defaultValue="none"
                        valueList={vulgarList}
                        onSelectCallback={(val) =>
                            handleSelect(val, "vulgarLevel")
                        }
                    />
                </div>
            )}
        </section>
    );
}

export function Dialect({ setGlobalData, currElem }) {
    const [dialect, setDialect] = useState("american");

    const handleSelect = async (val) => {
        setDialect(val);
        await setGlobalData((prev) => ({
            ...prev,
            wordData: {
                ...prev.wordData,
                treatedWordData: changeElem("dialect", {
                    currElem,
                    newVal: val,
                    treatedWordData: prev.wordData.treatedWordData,
                }),
            },
        }));
    };

    const valueList = ["american", "british"];

    return (
        <section className="container-center-col my-3">
            <Select
                label="Select dialect:"
                currValue={dialect}
                defaultValue="american"
                valueList={valueList}
                onSelectCallback={handleSelect}
            />
        </section>
    );
}
