import faker from 'faker'

import { Arrangor } from '../../api/data/tiltak'
import { randBetween } from '../utils/faker'

const ANTALL_ARRANGORER = 30

const orgNr = (): string => {
	return `${randBetween(800_000_000, 999_999_999)}`
}

const overordnetEneheter: string[] = new Array(Math.floor(ANTALL_ARRANGORER / 6))
	.fill(null)
	.map(() => faker.company.companyName())

const overordnetEnhet = (): string | null => {
	if (randBetween(0, ANTALL_ARRANGORER) <= ANTALL_ARRANGORER / 10) {
		return null
	}
	return overordnetEneheter[randBetween(0, overordnetEneheter.length - 1)]
}

const arrangorer: Arrangor[] = new Array(ANTALL_ARRANGORER).fill(null).map(() => {
	const organisasjonNavn = overordnetEnhet()

	const virksomhetNavn = organisasjonNavn ? `${organisasjonNavn} Avd. ${faker.address.city()}` : faker.company.companyName()
	return {
		virksomhetNavn: virksomhetNavn,
		virksomhetOrgnr: orgNr(),
		organisasjonNavn: organisasjonNavn,
	}
})

export const arrangorForGjennomforing = (): Arrangor => {
	return arrangorer[randBetween(0, ANTALL_ARRANGORER - 1)]
}
