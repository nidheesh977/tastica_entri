
export const capitalizeFirstLetter = (words) => {

    const wordLettersCaps = words.replace(/\b\w/g, (char) => char.toUpperCase())

    return wordLettersCaps
}

