import WatsonSpeech from "watson-speech";
import getAPI, { getTTSData } from "../../api-front/getAPI";

export default function Watson() {
    const runTTS = async () => {
        const { data } = await getAPI({ url: getTTSData() });
        const text = document.querySelector("#text").value;

        const audio = WatsonSpeech.TextToSpeech.synthesize(
            Object.assign(data, {
                text,
            })
        );

        audio.onerror = function (err) {
            console.log("audio error: ", err);
        };
    };

    return (
        <section>
            <textarea
                id="text"
                rows="6"
                cols="80"
                value="Hi there! I am your assistent!"
            ></textarea>
            <p>
                <button id="button" onClick={runTTS}>
                    Synthesize Text
                </button>
            </p>
        </section>
    );
}
