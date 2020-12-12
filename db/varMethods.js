import { variablesStore } from "./store";

export const getVar = (key, options = {}) => {
    const { storeName } = options;
    return variablesStore(storeName).getItem(key);
};

export const getMultiVar = async (arrayKeys, options = {}) => {
    const { storeName } = options;

    const promises = arrayKeys.map((key) => {
        return variablesStore(storeName).getItem(key);
    });

    return await Promise.all(promises);
};

export const setVar = (obj, options = {}) => {
    const { storeName } = options;

    if (!obj) return;

    const [key] = Object.keys(obj);
    const [value] = Object.values(obj);

    return variablesStore(storeName)
        .setItem(key, value)
        .then((res) => null) // console.log(`key ${key} was set in local DB`)
        .catch((err) =>
            console.log(`the was an error setting key ${key}. Details: ${err}`)
        );
};

// objArray like [{ key1: value1 }, { key2: value2}]
export const setMultiVar = async (objArray, options = {}) => {
    const { storeName } = options;
    if (objArray && !objArray.length) return;

    const promises = objArray.map((obj) => {
        const [key] = Object.keys(obj);
        const [value] = Object.values(obj);

        return variablesStore(storeName)
            .setItem(key, value)
            .then((res) => null)
            .catch((err) =>
                console.log(
                    `the was an error setting key ${key}. Details: ${err}`
                )
            );
    });

    return await Promise.all(promises);
};

export const removeVar = async (key, options = {}) => {
    const { storeName } = options;
    return variablesStore(storeName)
        .removeItem(key)
        .then((res) => console.log(`key ${key} removed from local DB`))
        .catch((err) =>
            console.log(`the was an error removing key ${key}. Details: ${err}`)
        );
};

// e.g ["elem1", "elem2"]
export const removeMultiVar = async (strArray, options = {}) => {
    const { storeName } = options;
    if (strArray && !strArray.length) return;

    const promises = strArray.map((strElem) => {
        return variablesStore(storeName)
            .removeItem(strElem)
            .then((res) => null)
            .catch((err) =>
                console.log(
                    `the was an error removing key ${strElem}. Details: ${err}`
                )
            );
    });

    return await Promise.all(promises);
};
