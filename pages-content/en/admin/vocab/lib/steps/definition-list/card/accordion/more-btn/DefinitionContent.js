import { useContext } from "global/Context";
import ButtonFab from "components/buttons/material-ui/ButtonFab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DefinitionContent({ data }) {
    const {
        globalData: { vocaEn, vocaBr },
    } = useContext();

    const showCTAs = (options) => {
        const { disableDelete } = options;

        return (
            <section
                className={`${!disableDelete && "d-flex"} content-item-ctas`}
            >
                {!disableDelete && (
                    <ButtonFab
                        variant="round"
                        faIcon={<FontAwesomeIcon icon="pencil-alt" />}
                        size="extra-small"
                        onClick={null}
                    />
                )}
                <div className="ml-3">
                    <ButtonFab
                        variant="round"
                        faIcon={<FontAwesomeIcon icon="trash-alt" />}
                        size={disableDelete ? "nano" : "extra-small"}
                        backgroundColor="var(--expenseRed)"
                        onClick={null}
                    />
                </div>
                <style jsx>
                    {`
                        .content-item-ctas {
                            position: ${disableDelete
                                ? "relative"
                                : "absolute"};
                            top: ${disableDelete ? "" : "-25px"};
                            ${disableDelete ? "left: -10px" : "right: 0px;"}
                        }
                    `}
                </style>
            </section>
        );
    };

    const handleTranslateAll = () => {
        //
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
                    onClick={handleTranslateAll}
                />
            </div>

            <h3>Definition:</h3>
            <p>{data.definition}</p>

            <h3>Examples:</h3>
            {data.examples ? (
                <ul>
                    {data.examples.map((e) => (
                        <li className="d-inline-block position-relative">
                            {e}
                            {showCTAs({})}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="m-0">none found.</p>
            )}

            <h3>Synonyms:</h3>
            {data.synonyms ? (
                <ul>
                    {data.synonyms.map((s) => (
                        <li className="position-relative">
                            <span className="d-inline-block">
                                {showCTAs({ disableDelete: true })}
                            </span>
                            {s} (inteligência)
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="m-0">none found.</p>
            )}

            <h3>Antonyms:</h3>
            {data.antonyms ? (
                <ul>
                    {data.antonyms.map((a) => (
                        <li className="position-relative">
                            <span className="d-inline-block">
                                {showCTAs({ disableDelete: true })}
                            </span>
                            {a} (inteligência)
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="mt-0">none found.</p>
            )}
        </section>
    );
}
