export default function urlizer(query, options = {}) {
    const { symb = "_" } = options;
    if (!query) {
        return null;
    }
    if (typeof query !== "string") {
        query = query.toString();
    }

    let res;
    if (query) {
        res = query.split(" ").join(symb).toLowerCase();
    }

    return res;
}
