import { useState } from "react";
import Layout from "../../../../components/_layout";
import useSWR, { getVocabData } from "../../../../api/useSWR";
import Field from "../../../../components/fields/Field";
import Snackbar from "../../../../components/Snackbar";
import getId from "../../../../utils/getId";
// LESSON: page's name should be in camelcase format otherwise fast refresh won't work.

export default function Newvocab() {
    const [trigger, setTrigger] = useState(false);
    const [data, setData] = useState({
        newVocab: "",
    });
    const { newVocab } = data;

    const body = { vocabEn: newVocab };
    const { data: vocabData, isLoading, error } = useSWR({
        url: getVocabData(),
        method: "post",
        body,
        trigger,
        needNanoId: true,
    });

    const handleEnter = () => {
        const id = getId();
        setTrigger(id);
    };

    return (
        <Layout>
            <h1 className="mt-5 text-center text-purple">
                Which word to add, Febro?
            </h1>
            <div className="container-center">
                <Field
                    size="large"
                    name="newVocab"
                    value={newVocab}
                    onChangeCallback={setData}
                    textAlign="text-center"
                    enterCallback={handleEnter}
                />
            </div>
            {isLoading && trigger && <h1>Loading...</h1>}
            {error && <Snackbar txt={error} type="error" />}
            {JSON.stringify(vocabData)}
        </Layout>
    );
}
