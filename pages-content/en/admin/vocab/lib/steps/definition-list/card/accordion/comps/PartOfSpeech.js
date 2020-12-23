import { useState, Fragment } from "react";
import ButtonFab from "components/buttons/material-ui/ButtonFab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Field from "components/fields/Field";
import { useContext } from "global/Context";
import Snackbar from "components/Snackbar";

const partsOfSpeech_pt = {
    noun: "substantivo",
    pronoun: "pronome",
    verb: "verbo",
    adjective: "adjetivo",
    adverb: "advérbio",
    preposition: "preposição",
    conjunction: "conjunção",
    interjection: "interjeição",
};

const changeElem = (target, options = {}) => {
    const { currElem, newVal, treatedWordData } = options;

    return treatedWordData.map((main) => {
        if (main.definition.en === currElem.definition.en) {
            main[target].en = newVal;
            main[target].br = partsOfSpeech_pt[newVal];
        }
        return main;
    });
};

export default function PartOfSpeech({ wordData }) {
    const [data, setData] = useState({
        newSpeech: "",
        open: false,
        error: false,
    });
    const { newSpeech, error, open } = data;

    const { setGlobalData } = useContext();

    const editSpeech = (e) => {
        e.stopPropagation();
        setData({ open: true, error: false });
    };

    // only works on desktop due to drag and drop;
    const handleEditDone = async () => {
        const validInput = [
            "noun",
            "pronoun",
            "adjective",
            "adverb",
            "verb",
            "preposition",
            "conjuction",
            "interjection",
        ];

        if (!validInput.includes(newSpeech))
            return setData({ ...data, error: "invalid part of speech" });

        await setGlobalData((prev) => ({
            ...prev,
            wordData: {
                ...prev.wordData,
                treatedWordData: changeElem("partOfSpeech", {
                    currElem: wordData,
                    newVal: newSpeech,
                    treatedWordData: prev.wordData.treatedWordData,
                }),
            },
        }));
        setData({ ...data, open: false, newSpeech: "" });
    };

    return (
        <Fragment>
            {open ? (
                <Fragment>
                    <p className="m-0">Edit part of speech:</p>
                    <Field
                        size="small"
                        name="newSpeech"
                        backgroundColor="var(--mainWhite)"
                        value={newSpeech}
                        onChangeCallback={setData}
                        enterCallback={handleEditDone}
                    />
                </Fragment>
            ) : (
                <section className="position-relative">
                    <strong>{wordData.partOfSpeech.en}</strong>{" "}
                    {wordData.isNew && (
                        <ButtonFab
                            variant="round"
                            size="nano"
                            faIcon={<FontAwesomeIcon icon="pencil-alt" />}
                            onClick={editSpeech}
                            onMouseDown={editSpeech}
                            onTouchStart={editSpeech}
                        />
                    )}
                </section>
            )}
            {error && <Snackbar txt={error} type="error" />}
        </Fragment>
    );
}
