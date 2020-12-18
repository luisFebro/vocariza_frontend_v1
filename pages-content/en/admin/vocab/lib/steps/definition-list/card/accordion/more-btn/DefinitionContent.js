import { Fragment, useState } from "react";
import { useContext } from "global/Context";
import ButtonFab from "components/buttons/material-ui/ButtonFab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Img from "components/Img";
import getAPIBack from "api/getAPIBack";
import { getVocaTranslated } from "api/requestsLib";

export default function DefinitionContent({ data }) {
    const [translationOn, setTranslationOn] = useState(
        data.definition.br || false
    );

    const {
        globalData: { vocaEn, vocaBr, wordData },
        setGlobalData,
    } = useContext();

    const handleTranslateAll = async () => {
        const body = data;

        const { data: translated } = await getAPIBack({
            method: "post",
            url: getVocaTranslated(),
            body: data,
        });
        const sortedTranslated = wordData.treatedWordData.map((item) => {
            if (translated.definition.en === item.definition.en) {
                return translated;
            }

            return item;
        });

        (async () => {
            await setGlobalData((prev) => ({
                ...prev,
                wordData: {
                    ...prev.wordData,
                    treatedWordData: sortedTranslated,
                },
            }));
            setTranslationOn(true);
        })();
    };

    const showCTAs = (options) => {
        const { disableDelete } = options;

        return (
            <section className="content-item-ctas">
                <ButtonFab
                    variant="round"
                    faIcon={<FontAwesomeIcon icon="pencil-alt" />}
                    size="nano"
                    onClick={null}
                />
                {!disableDelete && (
                    <div className="ml-3">
                        <ButtonFab
                            variant="round"
                            faIcon={<FontAwesomeIcon icon="trash-alt" />}
                            size="nano"
                            backgroundColor="var(--expenseRed)"
                            onClick={null}
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
        <div className={`${translationOn ? "invisible" : ""} container-center`}>
            <ButtonFab
                title="Translate all"
                size="medium"
                imgIcon={
                    <Img
                        src="/img/icons/flags/br.svg"
                        className={`${translationOn ? "invisible" : ""}`}
                        width={40}
                        height={20}
                        alt="brazilian flag"
                    />
                }
                onClick={handleTranslateAll}
            />
        </div>
    );

    return (
        <section className="mx-3 my-3">
            <h1 className="text-modal">
                {vocaEn} ({vocaBr})
            </h1>

            {showTranslateAllBtn()}

            <h3>Definition:</h3>
            <p>
                <Img
                    src="/img/icons/flags/us.svg"
                    width={40}
                    height={20}
                    alt="american flag"
                />{" "}
                {data.definition.en}
            </p>
            {translationOn && (
                <Fragment>
                    <p className="animated fadeInUp slow">
                        <Img
                            src="/img/icons/flags/br.svg"
                            width={40}
                            height={20}
                            alt="brazilian flag"
                        />{" "}
                        {data.definition.br}
                    </p>
                    <span className="ml-3 d-inline-block">
                        {showCTAs({ disableDelete: true })}
                    </span>
                </Fragment>
            )}

            <h3>Examples:</h3>
            {data.examples ? (
                <ul>
                    {data.examples.map((e) => (
                        <Fragment key={e.en}>
                            <li>
                                <Img
                                    src="/img/icons/flags/us.svg"
                                    width={40}
                                    height={20}
                                    alt="american flag"
                                />{" "}
                                {e.en}
                            </li>
                            {translationOn && (
                                <li className="animated fadeInUp slow">
                                    <Img
                                        src="/img/icons/flags/br.svg"
                                        width={40}
                                        height={20}
                                        alt="brazilian flag"
                                    />{" "}
                                    {e.br}
                                </li>
                            )}
                            <span className="ml-3 d-inline-block">
                                {showCTAs({})}
                            </span>
                            <hr className="lazer-purple" />
                        </Fragment>
                    ))}
                </ul>
            ) : (
                <p className="m-0">none found.</p>
            )}

            <h3>Synonyms:</h3>
            {data.synonyms ? (
                <ul>
                    {data.synonyms.map((s) => (
                        <Fragment key={s.en}>
                            <li>
                                <Img
                                    src="/img/icons/flags/us.svg"
                                    width={40}
                                    height={20}
                                    alt="american flag"
                                />{" "}
                                {s.en}
                            </li>
                            {translationOn && (
                                <li className="animated fadeInUp slow">
                                    <Img
                                        src="/img/icons/flags/br.svg"
                                        width={40}
                                        height={20}
                                        alt="brazilian flag"
                                    />{" "}
                                    {s.br}
                                </li>
                            )}
                            <span className="ml-3 d-inline-block">
                                {showCTAs({ disableDelete: true })}
                            </span>
                            <hr className="lazer-purple" />
                        </Fragment>
                    ))}
                </ul>
            ) : (
                <p className="m-0">none found.</p>
            )}

            <h3>Antonyms:</h3>
            {data.antonyms ? (
                <ul>
                    {data.antonyms.map((a) => (
                        <Fragment key={a.en}>
                            <li>
                                <Img
                                    src="/img/icons/flags/us.svg"
                                    width={40}
                                    height={20}
                                    alt="american flag"
                                />{" "}
                                {a.en}
                            </li>
                            {translationOn && (
                                <li className="animated fadeInUp slow">
                                    <Img
                                        src="/img/icons/flags/br.svg"
                                        width={40}
                                        height={20}
                                        alt="brazilian flag"
                                    />{" "}
                                    {a.br}
                                </li>
                            )}
                            <span className="ml-3 d-inline-block">
                                {showCTAs({ disableDelete: true })}
                            </span>
                            <hr className="lazer-purple" />
                        </Fragment>
                    ))}
                </ul>
            ) : (
                <p className="mt-0">none found.</p>
            )}
        </section>
    );
}
