import { Fragment, useState } from "react";
import ButtonFab from "components/buttons/material-ui/ButtonFab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Field from "components/fields/Field";

const editElem = (options) => {
    let { currElem, newEdit, treatedWordData, lang = "br" } = options;
    return treatedWordData.map((main) => {
        if (main.definition.en === currElem.definition.en) {
            main[lang] = newEdit && newEdit.toLowerCase();
        }
        return main;
    });
};

export default function TitleEdit({ setGlobalData, currElem, currWord }) {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({
        newEdit: "",
    });
    const { newEdit } = data;

    const change = () => {
        setOpen(!open);
    };

    const handleEditDone = async () => {
        await setGlobalData((prev) => ({
            ...prev,
            wordData: {
                ...prev.wordData,
                treatedWordData: editElem({
                    currElem,
                    newEdit,
                    treatedWordData: prev.wordData.treatedWordData,
                }),
            },
        }));
        change();
        setData({ ...data, newEdit: "" });
    };

    return (
        <Fragment>
            {open ? (
                <Fragment>
                    <p className="m-0">
                        Edit translation <strong>{currWord}</strong>:
                    </p>
                    <Field
                        size="small"
                        name="newEdit"
                        backgroundColor="#fff"
                        value={newEdit}
                        onChangeCallback={setData}
                        enterCallback={handleEditDone}
                    />
                </Fragment>
            ) : (
                <ButtonFab
                    variant="round"
                    faIcon={<FontAwesomeIcon icon="pencil-alt" />}
                    size="nano"
                    onClick={change}
                />
            )}
        </Fragment>
    );
}
