import faker from 'faker'

import { NavEnhet, TiltakDeltakerDetaljer, TiltakDeltakerStatus } from '../../api/data/deltaker'
import { Gjennomforing } from '../../api/data/tiltak'
import { randBetween, randomFnr, randomUuid } from '../utils/faker'

const navEnheter: NavEnhet[] = [
	{ navn: 'NAV Bærum' },
	{ navn: 'NAV Åsnes' },
	{ navn: 'NAV Møre og Romsdal' },
	{ navn: 'NAV Moss' },
]

const lagMailFraNavn = (navn: string, mailDomain: string): string => {
	const mailNavn = navn
		.replaceAll(' ', '.')
		.replaceAll('æ', 'ae')
		.replaceAll('ø', 'o')
		.replaceAll('å', 'a')
		.toLowerCase()

	return `${mailNavn}@${mailDomain}`
}

export const lagMockTiltakDeltagereForGjennomforing = (gjennomforing: Gjennomforing): TiltakDeltakerDetaljer[] => {
	const deltakere: TiltakDeltakerDetaljer[] = []

	for (let i = 0; i < 10; i++) {
		deltakere.push(lagMockTiltakDeltagerForGjennomforing(gjennomforing))
	}
	return deltakere
}

const lagTelefonnummer = (): string => {
	return faker.phone.phoneNumber().replaceAll(' ', '')
}

const lagMockTiltakDeltagerForGjennomforing = (gjennomforing: Gjennomforing): TiltakDeltakerDetaljer => {
	const status = faker.random.objectElement(TiltakDeltakerStatus) as TiltakDeltakerStatus

	const brukerFornavn = faker.name.firstName()
	const brukerMellomnavn = randBetween(0, 10) > 6 ? faker.name.middleName() : null
	const brukerEtternavn = faker.name.lastName()

	const veilederNavn = faker.name.firstName() + ' ' + faker.name.lastName()

	return {
		id: randomUuid(),
		fornavn: brukerFornavn,
		mellomnavn: brukerMellomnavn,
		etternavn: brukerEtternavn,
		fodselsnummer: randomFnr(),
		epost: lagMailFraNavn(`${brukerFornavn} ${brukerEtternavn}`, 'example.com'),
		telefonnummer: lagTelefonnummer(),
		startDato: faker.date.past(),
		sluttDato: faker.date.future(),
		status: {
			type: status,
			endretDato: faker.date.recent()
		},
		navEnhet: faker.random.arrayElement(navEnheter),
		navVeileder: {
			epost: lagMailFraNavn(veilederNavn, 'nav.no'),
			navn: veilederNavn,
			telefon: lagTelefonnummer()
		},
		gjennomforing: gjennomforing,
		registrertDato: faker.date.past()
	}
}
