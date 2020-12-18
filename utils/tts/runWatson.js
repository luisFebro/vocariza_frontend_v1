import WatsonSpeech from "watson-speech";
import getAPIBack from "api/getAPIBack";
import { getTTSData } from "api/requestsLib";

export default async function runWatson({ text = "hello febro" }) {
    const { data } = await getAPIBack({ url: getTTSData() });

    const audio = WatsonSpeech.TextToSpeech.synthesize(
        Object.assign(data, {
            text,
        })
    );

    audio.onerror = function (err) {
        console.log("audio error: ", err);
    };
}
