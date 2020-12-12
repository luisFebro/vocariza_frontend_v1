import parse from "html-react-parser";

export const handlePronounceDelimiters = (pronounceArray) => {
    if (!pronounceArray) return;
    const syllablesCount = pronounceArray.length;
    const armStrongCss = `<span style="font-size: 20px; color: var(--mainPurple); position: relative; top: -20px; left: 15px; transform: rotate(-10deg) scaleX(-1);" class="d-inline-block">💪</span>`;
    if (syllablesCount === 1) {
        let singleSyllable = pronounceArray[0];
        singleSyllable = singleSyllable.replace("ˈ", armStrongCss);
        return parse(singleSyllable);
    }

    let finalIpa = "";
    pronounceArray.forEach((s, ind) => {
        s = s.replace("ˌ", "");
        s = s.replace("ˈ", armStrongCss);
        const isLast = syllablesCount === ind + 1;
        finalIpa += `${s}${!isLast ? " ▪ " : ""}`;
    });

    return parse(finalIpa);
};
