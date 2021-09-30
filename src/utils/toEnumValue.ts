const toEnumValue = <T extends { [k: string]: string }>(enumType: T, maybeEnumValue: string | undefined): T[keyof T] => {
    if (!maybeEnumValue || !Object.values(enumType).includes(maybeEnumValue)) {
        throw new Error("Invalid enum value: " + maybeEnumValue)
    }

    return maybeEnumValue as T[keyof T];
}

export default toEnumValue;