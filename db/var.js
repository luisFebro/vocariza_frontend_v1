import { useEffect, useState } from "react";
import { variablesStore } from "./store";

export * from "./varMethods";
// using indexedDB with forage to store especially temporary variables.
// differently from localstorage which requires reloads to update the newest stored variables,
// indexedDB reads without the need of reloading...
let ignoreGetVar;
export default function useVar(key, options = {}) {
    const { storeName } = options;

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!key) {
            setData(false);
            setLoading(false);
            return;
        }
        variablesStore(storeName)
            .getItem(key)
            .then((fetchedValue) => {
                setData(fetchedValue);
                setLoading(false);
                ignoreGetVar = true;
            })
            .catch((err) => {
                console.log(
                    "Error with localForage white handling data: " + err
                );
                setLoading(false);
            });
        return () => {
            ignoreGetVar = true;
        };
    }, [key]);

    return { data, loading };
}
