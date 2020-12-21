import { useState, Fragment } from "react";
import ButtonFab from "components/buttons/material-ui/ButtonFab";
import Field from "components/fields/Field";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const pushElem = (target, options) => {
    const { currElem, newChunk, treatedWordData } = options;
    const newElem = { en: newChunk, br: "" };

    if (!currElem[target]) {
        return treatedWordData.map((main) => {
            if (main.definition.en === currElem.definition.en) {
                main[target] = [newElem];
            }
            return main;
        });
    }

    return treatedWordData.map((main) => {
        if (JSON.stringify(main[target]) === JSON.stringify(currElem[target])) {
            if (Array.isArray(currElem[target])) {
                currElem[target].push(newElem);
                main = currElem;
            }
        }

        return main;
    });
};

export default function NewField({
    target,
    setGlobalData,
    currElem,
    handleTranslateAll,
}) {
    const [openNewField, setOpenNewField] = useState(false);
    const [data, setData] = useState({
        newChunk: "",
    });
    const { newChunk } = data;

    const targetName = target.slice(0, -1);

    const change = () => {
        setOpenNewField(!openNewField);
    };

    const handleEditDone = async () => {
        await setGlobalData((prev) => ({
            ...prev,
            wordData: {
                ...prev.wordData,
                treatedWordData: pushElem(target, {
                    currElem,
                    newChunk,
                    treatedWordData: prev.wordData.treatedWordData,
                }),
            },
        }));
        await handleTranslateAll();
        change();
        setData({ ...data, newChunk: "" });
    };

    return (
        <Fragment>
            {!openNewField ? (
                <ButtonFab
                    size="nano"
                    title="new"
                    faIcon={<FontAwesomeIcon icon="plus" />}
                    onClick={change}
                />
            ) : (
                <Fragment>
                    <p className="strong m-0">New {targetName}:</p>
                    <Field
                        size="small"
                        name="newChunk"
                        backgroundColor="#fff"
                        value={newChunk}
                        multiline={target === "examples" ? true : false}
                        fullWidth={true}
                        onChangeCallback={setData}
                        enterCallback={handleEditDone}
                    />
                </Fragment>
            )}
        </Fragment>
    );
}
