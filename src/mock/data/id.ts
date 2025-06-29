import { randomUuid } from '../utils/faker'

const genererIder = (antall: number): string[] => {
  const ider = []

  for (let i = 0; i < antall; i++) {
    ider.push(randomUuid())
  }

  return ider
}

const getId = (ider: string[]): string => {
  const id = ider.pop()

  if (!id) {
    throw Error('Prøvde å hente id fra tomt array, generer flere ider')
  }

  return id
}

const gjennomforingIder = genererIder(500)

const deltakerIder = genererIder(2000)

const ansattIder = genererIder(500)

export const gjennomforingId = (): string => {
  return getId(gjennomforingIder)
}

export const deltakerId = (): string => {
  return getId(deltakerIder)
}

export const ansattId = (): string => {
  return getId(ansattIder)
}