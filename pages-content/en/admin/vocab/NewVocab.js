import Layout from "components/_layout";
import NewVocabStepper from "./lib/NewVocabStepper";
import { Provider } from "global/Context";
import useGlobal from "./useGlobal";
// LESSON: page's name should be in camelcase format otherwise fast refresh won't work.
// LESSON2: If you’re working on a large project, some of your import statements might suffer from the ../../../ spaghetti; NOT ANYMORE with jsconfig.json
// https://nextjs.org/blog/next-9-4#absolute-imports-and-aliases

export default function NewVocab() {
    const store = useGlobal();

    return (
        <Layout>
            <Provider store={store}>
                <NewVocabStepper />
            </Provider>
        </Layout>
    );
}
