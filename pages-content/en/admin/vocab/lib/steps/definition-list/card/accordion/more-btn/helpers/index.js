export const setUpdatedEditData = (wordDataArray, config) => {
    const {
        lang,
        currVal,
        currId,
        currRef,
        elemId,
        isArray: isTargetArray,
        currEdit: targetElem,
        isDelete,
    } = config;

    const langs = ["en", "br"];
    if (!langs.includes(lang)) throw new Error("Invalid lang parameter!");

    let modifiedItem = false;
    const res = wordDataArray.map((elem, ind) => {
        if (isTargetArray) {
            const isArray = Array.isArray(elem[targetElem]); // making sure it is really an array.

            const newArray = [];
            isArray &&
                elem[targetElem].forEach((subElem, ind) => {
                    if (elemId === ind) {
                        if (!isDelete) {
                            subElem[lang] = currVal;
                            subElem.ref = currRef;
                            modifiedItem = true;
                            return newArray.push(subElem);
                        }

                        modifiedItem = true;
                        return;
                    }

                    return newArray.push(subElem);
                });

            if (modifiedItem) {
                elem[targetElem] = newArray;
                modifiedItem = false;
            }
            return elem;
        }

        let target = elem[targetElem][lang];
        if (target === currId) {
            elem[targetElem][lang] = currVal;
            return elem;
        }

        return elem;
    });

    return res;
};

/*
{
    currEdit: "",
    currVal: "",
    currId: "", // same as currVal. the diff is it is changing to identify and make the change in the array of data
    isArray: false,
}
 */
