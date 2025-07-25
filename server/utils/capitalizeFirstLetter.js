
export const capitalizeFirstLetter = (name) => {

    let userNameLowerCase = name.trim().toLowerCase()

    let splitUsername = userNameLowerCase.split("");

    const firstLetterToUppercase = splitUsername[0].toUpperCase()

    splitUsername[0] = firstLetterToUppercase

    return splitUsername.join("")
}