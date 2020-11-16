/**
 * randomize a specific array
 * @param  {Array} array [target array,especially composed byobjs]
 * @return {Array | Object | String}       [selected String or Obj, or ramdomized array passed in the parameter]
 */
export default function getRandomArray(array, options = {}) {
    const { selectOne = true } = options;

    if (!Array.isArray(array))
        return console.log("First argument should be an array");

    const sortedArray = array.sort(function (a, b) {
        return 0.5 - Math.random();
    });

    const randomNum = Math.floor(Math.random() * 10); // 0 to 9 index. select one of the first 10 results from the random array.

    if (selectOne) return sortedArray[randomNum];

    return sortedArray;
}
