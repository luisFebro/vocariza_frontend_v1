import { Fragment, useState } from "react";
import { useContext } from "global/Context";
import ButtonFab from "components/buttons/material-ui/ButtonFab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Img from "components/Img";

export default function DefinitionContent({ data }) {
    const [translationOn, setTranslationOn] = useState(false);

    const {
        globalData: { vocaEn, vocaBr },
    } = useContext();

    const handleTranslateAll = () => {
        // request to translate this definitio chunk
        setTranslationOn(true);
    };

    const showCTAs = (options) => {
        const { disableDelete } = options;

        return (
            <section className="content-item-ctas">
                {!disableDelete && (
                    <ButtonFab
                        variant="round"
                        faIcon={<FontAwesomeIcon icon="pencil-alt" />}
                        size="nano"
                        onClick={null}
                    />
                )}
                <div className="ml-3">
                    <ButtonFab
                        variant="round"
                        faIcon={<FontAwesomeIcon icon="trash-alt" />}
                        size="nano"
                        backgroundColor="var(--expenseRed)"
                        onClick={null}
                    />
                </div>
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

    return (
        <section className="mx-3 my-3">
            <h1 className="text-modal">
                {vocaEn} ({vocaBr})
            </h1>

            <div className="container-center">
                <ButtonFab
                    title="Translate all"
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

            <h3>Definition:</h3>
            <p>
                <Img
                    src="/img/icons/flags/us.svg"
                    width={40}
                    height={20}
                    alt="american flag"
                />{" "}
                {data.definition}
            </p>
            {translationOn && (
                <p className="animated fadeInUp slow">
                    <Img
                        src="/img/icons/flags/br.svg"
                        width={40}
                        height={20}
                        alt="brazilian flag"
                    />{" "}
                    {data.definition}
                </p>
            )}

            <h3>Examples:</h3>
            {data.examples ? (
                <ul>
                    {data.examples.map((e) => (
                        <Fragment>
                            <li>
                                <Img
                                    src="/img/icons/flags/us.svg"
                                    width={40}
                                    height={20}
                                    alt="american flag"
                                />{" "}
                                {e}
                            </li>
                            {translationOn && (
                                <li className="animated fadeInUp slow">
                                    <Img
                                        src="/img/icons/flags/br.svg"
                                        width={40}
                                        height={20}
                                        alt="brazilian flag"
                                    />{" "}
                                    {e}
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
                        <Fragment>
                            <li>
                                <Img
                                    src="/img/icons/flags/us.svg"
                                    width={40}
                                    height={20}
                                    alt="american flag"
                                />{" "}
                                {s}
                            </li>
                            {translationOn && (
                                <li className="animated fadeInUp slow">
                                    <Img
                                        src="/img/icons/flags/br.svg"
                                        width={40}
                                        height={20}
                                        alt="brazilian flag"
                                    />{" "}
                                    {s}
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
                        <Fragment>
                            <li>
                                <Img
                                    src="/img/icons/flags/us.svg"
                                    width={40}
                                    height={20}
                                    alt="american flag"
                                />{" "}
                                {a}
                            </li>
                            {translationOn && (
                                <li className="animated fadeInUp slow">
                                    <Img
                                        src="/img/icons/flags/br.svg"
                                        width={40}
                                        height={20}
                                        alt="brazilian flag"
                                    />{" "}
                                    {a}
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
