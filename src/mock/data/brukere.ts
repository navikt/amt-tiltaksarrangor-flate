import faker from 'faker'

import { TiltakDeltagerDetaljerDTO } from '../../api/data/deltager'
import { TiltakDeltakerStatus } from '../../domeneobjekter/deltaker'
import { tilGjennomforingDTO } from '../dto-mapper'
import { randomFnr, randomUuid } from '../utils/faker'
import { MockGjennomforing } from './tiltak'

const navEnheter: { enhetId: string, navn: string, adresse: string }[] = [
	{
		enhetId: '0219',
		navn: 'NAV Bærum',
		adresse: 'Kontorveien 37, 4021 Sted'
	},
	{
		enhetId: '0425',
		navn: 'NAV Åsnes',
		adresse: 'Kontorveien 37, 4021 Sted'
	},
	{
		enhetId: '1500',
		navn: 'NAV Møre og Romsdal',
		adresse: 'Kontorveien 37, 4021 Sted'
	},
	{
		enhetId: '0104',
		navn: 'NAV Moss',
		adresse: 'Kontorveien 37, 4021 Sted'
	},
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

export const lagMockTiltakDeltagereForGjennomforing = (gjennomforing: MockGjennomforing): TiltakDeltagerDetaljerDTO[] => {
	const deltagere: TiltakDeltagerDetaljerDTO[] = []

	for (let i = 0; i < 10; i++) {
		deltagere.push(lagMockTiltakDeltagerForGjennomforing(gjennomforing))
	}
	return deltagere
}

const lagMockTiltakDeltagerForGjennomforing = (gjennomforing: MockGjennomforing): TiltakDeltagerDetaljerDTO => {
	const status = faker.random.objectElement(TiltakDeltakerStatus) as TiltakDeltakerStatus

	const brukerFornavn = faker.name.firstName()
	const brukerEtternavn = faker.name.lastName()

	const veilederNavn = faker.name.firstName() + ' ' + faker.name.lastName()

	return {
		id: randomUuid(),
		fornavn: brukerFornavn,
		mellomnavn: null,
		etternavn: brukerEtternavn,
		fodselsnummer: randomFnr(),
		epost: lagMailFraNavn(`${brukerFornavn} ${brukerEtternavn}`, 'example.com'),
		telefon: faker.phone.phoneNumber(),
		startDato: faker.date.past().toISOString(),
		sluttDato: faker.date.future().toISOString(),
		status: status,
		navKontor: faker.random.arrayElement(navEnheter),
		navVeileder: {
			epost: lagMailFraNavn(veilederNavn, 'nav.no'),
			navn: veilederNavn,
			telefon: faker.phone.phoneNumber()
		},
		gjennomforing: tilGjennomforingDTO(gjennomforing),
		registrertDato: faker.date.past().toISOString()
	}
}
