import { useState, Fragment, useEffect } from "react";
import ButtonFab from "components/buttons/material-ui/ButtonFab";
import Field from "components/fields/Field";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const pushElem = (target, options) => {
    const { currElem, newChunk, newUrl, treatedWordData } = options;
    const newElem = { en: newChunk, br: "", ref: newUrl };

    if (!newUrl) {
        delete newElem.ref;
    }

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
    currVoca,
    handleTranslateAll,
}) {
    const [openNewField, setOpenNewField] = useState(false);
    const [data, setData] = useState({
        newChunk: "",
        newUrl: "",
    });
    const { newChunk, newUrl } = data;

    useEffect(() => {
        setData({
            ...data,
            newUrl: `https://www.lexico.com/en/definition/${
                currVoca && currVoca.toLowerCase()
            }`,
        });
    }, []);

    const targetName = target.slice(0, -1);

    const open = () => {
        setOpenNewField(true);
    };

    const close = () => {
        setOpenNewField(false);
    };

    const handleEditDone = async () => {
        await setGlobalData((prev) => ({
            ...prev,
            wordData: {
                ...prev.wordData,
                treatedWordData: pushElem(target, {
                    currElem,
                    newUrl:
                        target === "examples"
                            ? newUrl && newUrl.toLowerCase()
                            : undefined,
                    newChunk: newChunk && newChunk.toLowerCase(),
                    treatedWordData: prev.wordData.treatedWordData,
                }),
            },
        }));
        close();
        await handleTranslateAll();
        setData({
            ...data,
            newChunk: "",
            newUrl: `https://www.lexico.com/en/definition/${
                currVoca && currVoca.toLowerCase()
            }`,
        });
    };

    return (
        <Fragment>
            {!openNewField ? (
                <ButtonFab
                    size="nano"
                    title="new"
                    faIcon={<FontAwesomeIcon icon="plus" />}
                    onClick={open}
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
                    {target === "examples" && (
                        <section className="mt-3">
                            <p className="strong m-0">Site reference:</p>
                            <Field
                                size="small"
                                name="newUrl"
                                backgroundColor="#fff"
                                value={newUrl}
                                fullWidth={true}
                                onChangeCallback={setData}
                                enterCallback={handleEditDone}
                            />
                        </section>
                    )}
                </Fragment>
            )}
        </Fragment>
    );
}
