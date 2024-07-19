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

const deltakerIder = genererIder(1000)

const endringsmeldingIder = genererIder(5000)

const ansattIder = genererIder(500)

const veilederIder = genererIder(4000)

export const gjennomforingId = (): string => {
  return getId(gjennomforingIder)
}

export const deltakerId = (): string => {
  return getId(deltakerIder)
}

export const endringsmeldingId = (): string => {
  return getId(endringsmeldingIder)
}

export const ansattId = (): string => {
  return getId(ansattIder)
}

export const veilederId = (): string => {
  return getId(veilederIder)
}
