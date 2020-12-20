import { default as useFetcher } from "swr";
import { useState } from "react";
import axios from "axios";
import getId from "../utils/getId";
export * from "./requestsLib";
// import { chooseHeader } from "../utils/server/getHeaders";

export default function useSWR({
    url,
    method = "get",
    body, // obj
    params, // obj
    needAuth = true,
    timeout = 3000,
    trigger = true,
    updateOnFocus = false,
    needNanoId = false, // for renrendering
}) {
    if (!url) throw new Error("url is required!");
    const [error, setError] = useState(false);

    const getConfig = (url) => ({
        url,
        method,
        data: body,
        params,
        // headers: chooseHeader({ token, needAuth }),
    });

    const fetcher = (url, trigger) => {
        if (!trigger) return;
        return axios(getConfig(url))
            .then((res) => {
                setError(false);
                return res.data;
            })
            .catch((e) => {
                const id = getId();
                setError(
                    `${e.response.data.error}${needNanoId ? `ID:${id}` : ""}`
                );
            });
    };

    const swrOptions = {
        loadingTimeout: timeout, // timeout to trigger the onLoadingSlow event
        errorRetryInterval: 5000, // error retry interval n1
        suspense: false, // enable React Suspense mode (details)
        initialData: undefined, //initial data to be returned (note: This is per-hook) (details)
        revalidateOnFocus: updateOnFocus, //(true) only for dynamic and real time data - auto revalidate when window gets focused (details)
        revalidateOnReconnect: true, // automatically revalidate when the browser regains a network connection (via navigator.onLine) (details)
        refreshInterval: 0, //polling interval (disabled by default) (details)
        refreshWhenHidden: false, // (false) polling when the window is invisible (if refreshInterval is enabled)
        refreshWhenOffline: false, // (false) polling when the browser is offline (determined by navigator.onLine)
        shouldRetryOnError: true, //retry when fetcher has an error
        dedupingInterval: 2000, // dedupe requests with the same key in this time span
        focusThrottleInterval: 5000, // only revalidate once during a time span
        // n2 more flags
    };

    const thisUrl = trigger ? url : null;

    const res = useFetcher([thisUrl, trigger], fetcher, swrOptions);

    const isLoading = !error && !res.data && res.data !== 0;
    return { ...res, isLoading, error }; // { data, error, isValidating, mutate }
}

/* COMMENTS
n1: When under a slow network (2G, <= 70Kbps), errorRetryInterval will be 10s, and loadingTimeout will be 5s by default.
n2: flags
errorRetryCount: max error retry count
onLoadingSlow(key, config): callback function when a request takes too long to load (see loadingTimeout)
onSuccess(data, key, config): callback function when a request finishes successfully
onError(err, key, config): callback function when a request returns an error
onErrorRetry(err, key, config, revalidate, revalidateOps): handler for error retry
compare(a, b): comparison function used to detect when returned data has changed, to avoid spurious rerenders. By default, dequal is used.
revalidateOnMount: enable or disable automatic revalidation when component is mounted (by default revalidation occurs on mount when initialData is not set, use this flag to force behavior)
*/

/* SWR DOC - https://swr.vercel.app/
API
const { data, error, isValidating, mutate } = useSWR(key, fetcher, options)

Definition of SWR
The name “SWR” is derived from stale-while-revalidate, a HTTP cache invalidation strategy popularized by HTTP RFC 5861. SWR is a strategy to first return the data from cache (stale), then send the fetch request (revalidate), and finally come with the up-to-date data.

With SWR, components will get a stream of data updates constantly and automatically.
And the UI will be always fast and reactive.

If you need to use one request in several comps:
The most beautiful thing is that there will be only 1 request sent to the API, because they use the same SWR key and the request is deduped, cached and shared automatically.
 */

/* ARCHIVES
const [thisUrl, setThisUrl] = useState(null);
useEffect(() => {
    if(trigger) setThisUrl(url)
}, [trigger, url])

*/
