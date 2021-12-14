import faker from 'faker'

import { TiltakDeltagerDetaljerDTO } from '../../api/data/deltager'
import { TiltakDeltagerStatus } from '../../domeneobjekter/deltager'
import { tilTiltakInstansDto } from '../dto-mapper'
import { randomFnr, randomUuid } from '../utils/faker'
import { MockTiltakInstans } from './tiltak'

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

export const lagMockTiltakDeltagereForTiltakInstans = (tiltakInstans: MockTiltakInstans): TiltakDeltagerDetaljerDTO[] => {
	const deltagere: TiltakDeltagerDetaljerDTO[] = []

	for (let i = 0; i < 10; i++) {
		deltagere.push(lagMockTiltakDeltagerForTiltakInstans(tiltakInstans))
	}
	return deltagere
}

const lagMockTiltakDeltagerForTiltakInstans = (tiltakInstans: MockTiltakInstans): TiltakDeltagerDetaljerDTO => {
	const status = faker.random.objectElement(TiltakDeltagerStatus) as TiltakDeltagerStatus

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
		oppstartdato: faker.date.past().toISOString(),
		sluttdato: faker.date.future().toISOString(),
		status: status,
		navKontor: faker.random.arrayElement(navEnheter),
		navVeileder: {
			epost: lagMailFraNavn(veilederNavn, 'nav.no'),
			navn: veilederNavn,
			telefon: faker.phone.phoneNumber()
		},
		tiltakInstans: tilTiltakInstansDto(tiltakInstans),
		registrertDato: faker.date.past().toISOString()
	}
}
