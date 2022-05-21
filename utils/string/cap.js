const brPreps = [
    "a",
    "e",
    "seu",
    "sua",
    "pela",
    "via",
    "por",
    "com",
    "no",
    "na",
    "em",
    "da",
    "do",
    "das",
    "dos",
    "à",
    "de",
];

export default function cap(string) {
    if (!string) return null;

    const turnInLowercase = string.toLowerCase().replace(/(\s|\W|_)/gi, " ");

    const capitalized = turnInLowercase.replace(/(?:^|\s)\S/g, (a) =>
        a.toUpperCase()
    );
    const splittedWords = capitalized.split(" ");
    const readyString = splittedWords
        .map((word) => {
            if (brPreps.includes(word.toLowerCase())) {
                return word.toLowerCase();
            }
            return word;
        })
        .join(" ");

    return readyString;
}
