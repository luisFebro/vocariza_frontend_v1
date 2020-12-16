import { useContext } from "global/Context";

export default function DefinitionContent({ data }) {
    const {
        globalData: { vocaEn, vocaBr },
    } = useContext();

    return (
        <section className="mx-3 my-3">
            <h1 className="text-modal">
                {vocaEn} ({vocaBr})
            </h1>
            <h3>Definition:</h3>
            <p>{data.definition}</p>
            <h3>Examples:</h3>
            {data.examples ? (
                <ul>
                    {data.examples.map((e) => (
                        <li>{e}</li>
                    ))}
                </ul>
            ) : (
                <p className="m-0">none found.</p>
            )}
            <h3>Synonyms:</h3>
            {data.synonyms ? (
                <ul>
                    {data.synonyms.map((s) => (
                        <li>{s}</li>
                    ))}
                </ul>
            ) : (
                <p className="m-0">none found.</p>
            )}

            <h3>Antonyms:</h3>
            {data.antonyms ? (
                <ul>
                    {data.antonyms.map((a) => (
                        <li>{a}</li>
                    ))}
                </ul>
            ) : (
                <p className="mt-0">none found.</p>
            )}
        </section>
    );
}
