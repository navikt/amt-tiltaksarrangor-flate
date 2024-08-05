import { faker } from '@faker-js/faker/locale/nb_NO'

faker.seed(486756783)

export const randBetween = (min: number, max: number): number => {
  return faker.number.int({ min, max })
}

// Returns a random boolean, percentTrue = 0 - 100
export const randomBoolean = (percentTrue: number): boolean => {
  return randBetween(0, 100) <= percentTrue
}

export const randomUuid = (): string => {
  return faker.string.uuid()
}

export const randomFnr = (): string => {
  const dag = randBetween(1, 31)
  const mnd = randBetween(1, 12)
  const ar = randBetween(0, 99)
  const arhundre = randBetween(0, 99).toString().padStart(2, '0')
  const kjonnsiffer = faker.datatype.boolean() ? 4 : 1
  const individsifre = `${arhundre}${kjonnsiffer}`
  const kontrollsifre = `${randBetween(0, 9)}${randBetween(0, 9)}`

  return `${dag.toString().padStart(2, '0')}${mnd.toString().padStart(2, '0')}${ar
    .toString()
    .padStart(2, '0')}${individsifre}${kontrollsifre}`
}
