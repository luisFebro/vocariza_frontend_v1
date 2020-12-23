import { Fragment, useState } from "react";
import { useContext } from "global/Context";
import ButtonFab from "components/buttons/material-ui/ButtonFab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Field from "components/fields/Field";
import Img from "components/Img";
import getAPIBack from "api/getAPIBack";
import { getVocaTranslated } from "api/requestsLib";
import { setUpdatedEditData } from "./helpers";
import NewField from "./comps/NewField";
import TitleEdit from "./comps/TitleEdit";
import getSiteName from "utils/string/getSiteName";
import { LinguisticStyle, Dialect } from "./comps/Selectors";

const updateGlobalData = async ({ setGlobalData, config }) => {
    return await setGlobalData((prev) => ({
        ...prev,
        wordData: {
            ...prev.wordData,
            treatedWordData: setUpdatedEditData(
                prev.wordData.treatedWordData,
                config
            ),
        },
    }));
};

export default function DefinitionContent({ data }) {
    const [translationOn, setTranslationOn] = useState(
        data.definition.br || false
    );

    const {
        globalData: { vocaEn, vocaBr, wordData },
        setGlobalData,
    } = useContext();

    const [edit, setEdit] = useState({
        currEdit: "",
        currVal: "",
        currId: "", // same as currVal. the diff is it is changing to identify and make the change in the array of data
        currRef: "",
        isArray: false,
        isDelete: false,
        elemId: "",
        lang: "en",
    });
    const { currVal, currId, currEdit, lang, currRef, isDelete } = edit;

    const restart = () => {
        setEdit({
            currEdit: "",
            currVal: "",
            currId: "", // same as currVal. the diff is it is changing to identify and make the change in the array of data
            currRef: "",
            isArray: false,
            isDelete: false,
            elemId: "",
            lang: "en",
        });
    };

    const handleTranslateAll = async () => {
        const body = data;

        const { data: translated } = await getAPIBack({
            method: "post",
            url: getVocaTranslated(),
            body,
        });
        const sortedTranslated = wordData.treatedWordData.map((item) => {
            if (translated.definition.en === item.definition.en) {
                return { ...item, ...translated }; // avoid overdrive values which does not require translation such as dialect and style.
            }

            return item;
        });

        await setGlobalData((prev) => ({
            ...prev,
            wordData: {
                ...prev.wordData,
                treatedWordData: sortedTranslated,
            },
        }));

        setTranslationOn(true);
    };

    const handleEditDone = async () => {
        await updateGlobalData({ setGlobalData, config: edit });
        if (translationOn && lang === "en") {
            await handleTranslateAll();
        }
        restart();
    };

    const showCTAs = (options) => {
        const {
            disableDelete,
            disableEdit,
            currEdit,
            currId,
            elemId,
            currRef,
            currVal,
            lang = "br",
            isArray,
        } = options;

        return (
            <section className="content-item-ctas">
                {!disableEdit && (
                    <ButtonFab
                        variant="round"
                        faIcon={<FontAwesomeIcon icon="pencil-alt" />}
                        size="nano"
                        onClick={() =>
                            setEdit({
                                ...edit,
                                currEdit,
                                currId,
                                currRef,
                                elemId,
                                currVal,
                                lang,
                                isArray,
                            })
                        }
                    />
                )}
                {!disableDelete && (
                    <div className="ml-3">
                        <ButtonFab
                            variant="round"
                            faIcon={<FontAwesomeIcon icon="trash-alt" />}
                            size="nano"
                            backgroundColor="var(--expenseRed)"
                            onClick={async () => {
                                await setEdit({
                                    ...edit,
                                    currEdit,
                                    currId,
                                    isDelete: true,
                                    currVal,
                                    lang,
                                    isArray,
                                });
                                await updateGlobalData({
                                    setGlobalData,
                                    config: {
                                        ...options,
                                        isDelete: true,
                                        currId,
                                        elemId,
                                    },
                                });
                                restart();
                            }}
                        />
                    </div>
                )}
                <style jsx>
                    {`
                        .content-item-ctas {
                            display: flex;
                            align-items: center;
                        }
                    `}
                </style>
            </section>
        );
    };

    const showTranslateAllBtn = () => (
        <div className={`${translationOn ? "d-none" : ""} container-center`}>
            <ButtonFab
                title="Translate All"
                size="medium"
                imgIcon={
                    <Img
                        src="/img/icons/flags/br.svg"
                        width={40}
                        height={20}
                        alt="brazilian flag"
                    />
                }
                onClick={handleTranslateAll}
            />
        </div>
    );

    const defaultProps = {
        currVal,
        currEdit,
        currId,
        currRef,
        handleEditDone,
        showCTAs,
        data,
        setEdit,
        lang: "en",
        currLang: lang,
        isDelete,
        translationOn,
    };

    return (
        <section className="mx-3 my-3">
            <h1 className="text-modal">
                {data.en}{" "}
                {data.br && (
                    <div className="d-inline-block">
                        ({data.br}){" "}
                        <TitleEdit
                            setGlobalData={setGlobalData}
                            currElem={data}
                            currWord={data.br}
                        />
                    </div>
                )}
            </h1>

            {showTranslateAllBtn()}

            <h3>Definition:</h3>
            <DefinitionComp {...defaultProps} />
            <br />
            {translationOn && <DefinitionComp {...defaultProps} lang="br" />}

            <h3>Style:</h3>
            <LinguisticStyle setGlobalData={setGlobalData} currElem={data} />

            <h3>Dialect:</h3>
            <Dialect setGlobalData={setGlobalData} currElem={data} />

            <h3>Examples:</h3>
            {data.examples && data.examples.length ? (
                <ul>
                    {data.examples.map((ex, ind) => (
                        <Fragment key={ind}>
                            <ListComps
                                {...defaultProps}
                                data={ex}
                                elemId={ind}
                                currEdit="examples"
                            />
                            <br />
                            {translationOn && (
                                <ListComps
                                    {...defaultProps}
                                    data={ex}
                                    elemId={ind}
                                    currEdit="examples"
                                    disableDelete={true}
                                    lang="br"
                                />
                            )}
                            <hr className="lazer-purple" />
                        </Fragment>
                    ))}
                </ul>
            ) : (
                <p className="m-0">none found.</p>
            )}
            <NewField
                target="examples"
                setGlobalData={setGlobalData}
                currElem={data}
                currVoca={vocaEn}
                handleTranslateAll={handleTranslateAll}
            />

            <h3>Synonyms:</h3>
            {data.synonyms && data.synonyms.length ? (
                <ul>
                    {data.synonyms.map((s, ind) => (
                        <Fragment key={s.en}>
                            <ListComps
                                {...defaultProps}
                                elemId={ind}
                                data={s}
                                currEdit="synonyms"
                            />
                            <br />
                            {translationOn && (
                                <ListComps
                                    {...defaultProps}
                                    elemId={ind}
                                    data={s}
                                    currEdit="synonyms"
                                    lang="br"
                                    disableDelete={true}
                                />
                            )}
                            <hr className="lazer-purple" />
                        </Fragment>
                    ))}
                </ul>
            ) : (
                <p className="m-0">none found.</p>
            )}
            <NewField
                target="synonyms"
                setGlobalData={setGlobalData}
                currElem={data}
                handleTranslateAll={handleTranslateAll}
            />

            <h3>Antonyms:</h3>
            {data.antonyms && data.antonyms.length ? (
                <ul>
                    {data.antonyms.map((an, ind) => (
                        <Fragment key={ind}>
                            <ListComps
                                {...defaultProps}
                                data={an}
                                elemId={ind}
                                currEdit="antonyms"
                            />
                            <br />
                            {translationOn && (
                                <ListComps
                                    {...defaultProps}
                                    data={an}
                                    elemId={ind}
                                    currEdit="antonyms"
                                    lang="br"
                                    disableDelete={true}
                                />
                            )}
                            <hr className="lazer-purple" />
                        </Fragment>
                    ))}
                </ul>
            ) : (
                <p className="mt-0">none found.</p>
            )}
            <NewField
                target="antonyms"
                setGlobalData={setGlobalData}
                currElem={data}
                handleTranslateAll={handleTranslateAll}
            />
        </section>
    );
}

function DefinitionComp({
    currVal,
    currEdit,
    handleEditDone,
    showCTAs,
    data,
    setEdit,
    lang,
    currLang,
}) {
    const handleDefinDisplay = () => {
        if (currEdit !== "definition") return data.definition[lang];
        return currLang !== lang && data.definition[lang];
    };

    return (
        <Fragment>
            <span className="d-inline-block">
                <Img
                    src={`/img/icons/flags/${lang === "en" ? "us" : lang}.svg`}
                    width={40}
                    className="d-inline-block animated fadeInUp slow"
                    height={20}
                    alt="flag"
                />
                {handleDefinDisplay()}{" "}
            </span>
            {currEdit === "definition" && currLang === lang && (
                <section className="mb-2">
                    <Field
                        size="small"
                        name="currVal"
                        backgroundColor="#fff"
                        value={currVal}
                        multiline={true}
                        fullWidth={true}
                        onChangeCallback={setEdit}
                        enterCallback={handleEditDone}
                    />
                </section>
            )}
            {(currEdit !== "definition" || !currVal) && (
                <span className="ml-3">
                    {showCTAs({
                        disableDelete: true,
                        currEdit: "definition",
                        currId: data.definition[lang],
                        currVal: data.definition[lang],
                        lang,
                    })}
                </span>
            )}
        </Fragment>
    );
}

function ListComps({
    currId,
    elemId,
    currVal,
    currEdit,
    currRef,
    handleEditDone,
    showCTAs,
    data,
    setEdit,
    lang,
    currLang,
    disableDelete = false,
    disableEdit = false,
    isDelete,
    translationOn,
}) {
    data[lang] = data[lang] ? data[lang] : "...";
    const needField = currLang === lang && currId === data[lang] && !isDelete;

    const handleSiteName = () => {
        const siteName = getSiteName(data.ref);
        if (siteName === "lexico") return "lexico, oxford";
        return data.ref ? siteName : "wordsApi";
    };

    return (
        <Fragment>
            {!needField ? (
                <Fragment>
                    <li className="d-inline-block">
                        <Img
                            src={`/img/icons/flags/${
                                lang === "en" ? "us" : lang
                            }.svg`}
                            width={40}
                            height={20}
                            alt="flag"
                        />{" "}
                        {data[lang]}
                        <br />
                        {currEdit === "examples" && lang === "en" && (
                            <a
                                className="no-text-decoration"
                                href={
                                    data.ref ? data.ref : "https://wordsapi.com"
                                }
                                target="_blank"
                                rel="noopener"
                            >
                                <em className="text-gray text-small">
                                    - {handleSiteName()}
                                </em>
                            </a>
                        )}{" "}
                    </li>
                    <span className="ml-3 d-inline-block">
                        {showCTAs({
                            isArray: true,
                            disableDelete,
                            disableEdit,
                            currEdit,
                            currId: data[lang],
                            elemId,
                            currVal: data[lang],
                            currRef: data.ref,
                            lang,
                        })}
                    </span>
                    <br />
                </Fragment>
            ) : (
                <section className="mb-2">
                    <Field
                        size="small"
                        name="currVal"
                        backgroundColor="#fff"
                        value={currVal}
                        multiline={true}
                        fullWidth={true}
                        onChangeCallback={setEdit}
                        enterCallback={handleEditDone}
                    />
                    {currEdit === "examples" && lang === "en" && (
                        <section className="mt-3">
                            <p className="strong m-0">Site reference:</p>
                            <Field
                                size="small"
                                name="currRef"
                                backgroundColor="#fff"
                                value={currRef}
                                fullWidth={true}
                                onChangeCallback={setEdit}
                                enterCallback={handleEditDone}
                            />
                        </section>
                    )}
                </section>
            )}
        </Fragment>
    );
}
/*

<p className="animated fadeInUp slow">
    <Img
        src="/img/icons/flags/br.svg"
        width={40}
        height={20}
        alt="brazilian flag"
    />{" "}

</p>
 */
