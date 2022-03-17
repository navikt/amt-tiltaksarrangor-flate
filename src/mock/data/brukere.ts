import faker from 'faker'

import { NavKontorDTO, TiltakDeltagerDetaljerDTO } from '../../api/data/deltaker'
import { GjennomforingDTO } from '../../api/data/tiltak'
import { TiltakDeltakerStatus } from '../../domeneobjekter/deltaker'
import { randBetween, randomFnr, randomUuid } from '../utils/faker'

const navEnheter: NavKontorDTO[] = [
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

export const lagMockTiltakDeltagereForGjennomforing = (gjennomforing: GjennomforingDTO): TiltakDeltagerDetaljerDTO[] => {
	const deltakere: TiltakDeltagerDetaljerDTO[] = []

	for (let i = 0; i < 10; i++) {
		deltakere.push(lagMockTiltakDeltagerForGjennomforing(gjennomforing))
	}
	return deltakere
}

const lagMockTiltakDeltagerForGjennomforing = (gjennomforing: GjennomforingDTO): TiltakDeltagerDetaljerDTO => {
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
		telefonnummer: faker.phone.phoneNumber(),
		startDato: faker.date.past().toISOString(),
		sluttDato: faker.date.future().toISOString(),
		status: {
			type: status,
			endretDato: faker.date.recent().toISOString()
		},
		navKontor: faker.random.arrayElement(navEnheter),
		navVeileder: {
			epost: lagMailFraNavn(veilederNavn, 'nav.no'),
			navn: veilederNavn,
			telefon: faker.phone.phoneNumber()
		},
		gjennomforing: gjennomforing,
		registrertDato: faker.date.past().toISOString()
	}
}
