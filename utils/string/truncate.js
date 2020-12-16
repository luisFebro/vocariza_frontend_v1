export default function truncate(input, maxWidth = 70) {
    if (!input) return;
    return input.length > maxWidth
        ? input.substring(0, maxWidth) + "..."
        : input;
}
