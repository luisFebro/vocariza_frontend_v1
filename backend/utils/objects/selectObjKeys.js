// return the values from obj keys...
function selectObjKeys(obj, arrayKeys) {
    const newObject = {};
    arrayKeys.forEach((key) => {
        newObject[key] = obj[key];
    });

    return newObject;
}

module.exports = selectObjKeys;
// const obj = {hello: "olá", hey: "oi", goodbye: "tchau"};
// console.log(selectObjKeys(obj, ["hey", "hello"]))
// #
// { hey: 'oi', hello: 'olá' }
