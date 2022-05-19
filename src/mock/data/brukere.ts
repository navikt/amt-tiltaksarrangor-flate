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

export const lagMockTiltakDeltagereForGjennomforing = (gjennomforing: Gjennomforing, antallDeltakere = 10): TiltakDeltakerDetaljer[] => {
	const deltakere: TiltakDeltakerDetaljer[] = []

	for (let i = 0; i < antallDeltakere; i++) {
		deltakere.push(lagMockTiltakDeltagerForGjennomforing(gjennomforing))
	}
	return deltakere
}

const lagTelefonnummer = (): string => {
	return faker.phone.phoneNumber().replaceAll(' ', '')
}

const generateSluttDato = (status: TiltakDeltakerStatus, startDato: Date | null) =>  {
	if(status === 'VENTER_PA_OPPSTART') {
		return  null
	} else if(status === 'HAR_SLUTTET' && startDato !== null) {
		return  faker.date.between(startDato, Date())
	} else {
		return  faker.date.future()
	}
}

const getStatus = (): TiltakDeltakerStatus => {
	const i = randBetween(0, 10)

	if(i < 5) return TiltakDeltakerStatus.DELTAR
	if(i < 7) return TiltakDeltakerStatus.VENTER_PA_OPPSTART
	if(i < 8) return TiltakDeltakerStatus.HAR_SLUTTET
	if(i < 9) return TiltakDeltakerStatus.IKKE_AKTUELL

	return TiltakDeltakerStatus.DELTAR

}

const lagMockTiltakDeltagerForGjennomforing = (gjennomforing: Gjennomforing): TiltakDeltakerDetaljer => {
	const status = getStatus()

	const gender = randBetween(0, 1)

	const brukerFornavn = faker.name.firstName(gender)
	const brukerMellomnavn = randBetween(0, 10) > 6 ? faker.name.firstName(gender) : null
	const brukerEtternavn = faker.name.lastName()

	const veilederNavn = faker.name.firstName() + ' ' + faker.name.lastName()

	const startDato = status !== 'VENTER_PA_OPPSTART' ? faker.date.past() : null

	return {
		id: randomUuid(),
		fornavn: brukerFornavn,
		mellomnavn: brukerMellomnavn,
		etternavn: brukerEtternavn,
		fodselsnummer: randomFnr(),
		epost: lagMailFraNavn(`${brukerFornavn} ${brukerEtternavn}`, 'example.com'),
		telefonnummer: lagTelefonnummer(),
		startDato: startDato,
		sluttDato: generateSluttDato(status, startDato),
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
