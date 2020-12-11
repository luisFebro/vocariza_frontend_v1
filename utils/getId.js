import { nanoid } from "nanoid";

export default function getId() {
    return nanoid(10);
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
