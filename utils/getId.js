import { nanoid } from "nanoid";

/*
If you want to reduce the ID size (and increase collisions probability), you can pass the size as an argument.
nanoid(10) //=> "IRFa-VaY2b"

collision calculator:
https://zelark.github.io/nano-id-cc/

Facts:
Small. 108 bytes (minified and gzipped). No dependencies. Size Limit controls the size.
Fast. It is 60% faster than UUID.
Safe. It uses cryptographically strong random APIs. Can be used in clusters.
Compact. It uses a larger alphabet than UUID (A-Za-z0-9_-). So ID size was reduced from 36 to 21 symbols.
 */

export default function getId(char = 20) {
    return nanoid(char);
}

// parse string with ID: so that the page can be rerendered for a specific trigger. If the value is the same, then it will not rerender.
// str should be => sometextID:nanoId
export const parseId = (str) => {
    if (!str) return;
    if (!str.includes("ID:")) return str;

    const idIndex = str.indexOf("ID:");

    const parsed = str.slice(0, idIndex);
    return parsed;
};
