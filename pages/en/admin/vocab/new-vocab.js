import Layout from "../../../../components/_layout";
import useSWR from "swr";
import axios from "axios";
// doc - https://swr.vercel.app/
// API options
// const { data, error, isValidating, mutate } = useSWR(key, fetcher, options)
// https://swr.vercel.app/docs/options
/* Definition of SWR
The name “SWR” is derived from stale-while-revalidate, a HTTP cache invalidation strategy popularized by HTTP RFC 5861. SWR is a strategy to first return the data from cache (stale), then send the fetch request (revalidate), and finally come with the up-to-date data.

With SWR, components will get a stream of data updates constantly and automatically.
And the UI will be always fast and reactive.
 */
// function useUser (id) {
//   const { data, error } = useSWR(`/api/user/${id}`, fetcher)
//   return {
//     user: data,
//     isLoading: !error && !data,
//     isError: error
//   }
// }
// The most beautiful thing is that there will be only 1 request sent to the API, because they use the same SWR key and the request is deduped, cached and shared automatically.
// import axios from 'axios'
// function App () {
//   const { data, error } = useSWR('/api/data', fetcher)
//   // ...
// }

export default function newvocab() {
    const getConfig = (url) => ({
        url,
        method: "post",
        data: { vocabEn: "shit", search: "all" },
    });

    const fetcher = (url) => axios(getConfig(url)).then((res) => res.data);
    const options = {
        loadingTimeout: 3000,
        errorRetryInterval: 5000,
    };
    /*
    When under a slow network (2G, <= 70Kbps), errorRetryInterval will be 10s, and loadingTimeout will be 5s by default.
     */

    const { data, error } = useSWR(
        `http://localhost:5002/api/voca/create`,
        fetcher,
        options
    );

    if (!data && !error) return <h1>Loading...</h1>;
    if (error) return <h1>An error occured: {JSON.stringify(error)}</h1>;

    return (
        <Layout>
            <h1 className="mt-5 text-center text-purple">
                Which word to add, Febro?
            </h1>
            {JSON.stringify(data)}
        </Layout>
    );
}
