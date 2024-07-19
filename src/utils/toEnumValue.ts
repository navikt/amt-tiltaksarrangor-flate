export const toEnumValue = <T extends { [k: string]: string }>(
  enumType: T,
  maybeEnumValue: string | undefined
): T[keyof T] => {
  const nullableEnumValue = toNullableEnumValue(enumType, maybeEnumValue)

  if (!nullableEnumValue) {
    throw new Error('Expected enum to not be null')
  }

  return nullableEnumValue
}

export const toNullableEnumValue = <T extends { [k: string]: string }>(
  enumType: T,
  maybeEnumValue: string | undefined
): T[keyof T] | undefined => {
  if (!maybeEnumValue) {
    return undefined
  }

  if (!Object.values(enumType).includes(maybeEnumValue)) {
    throw new Error('Invalid enum value: ' + maybeEnumValue)
  }

  return maybeEnumValue as T[keyof T]
}
