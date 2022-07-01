import faker from 'faker'

import { TiltakDeltakerStatus } from '../../api/data/deltaker'
import { Gjennomforing } from '../../api/data/tiltak'
import { randBetween, randomFnr } from '../utils/faker'
import { deltakerId } from './id'
import { MockGjennomforing } from './tiltak'

export interface MockNavEnhet {
	navn: string
}

export interface MockNavVeileder {
	navn: string,
	telefon: string | null,
	epost: string | null,
}

export interface MockTiltakDeltaker {
	id: string,
	fornavn: string,
	mellomnavn: string | null,
	etternavn: string,
	fodselsnummer: string,
	startDato: Date | null,
	sluttDato: Date | null,
	status: {
		type: TiltakDeltakerStatus,
		endretDato: Date,
	},
	registrertDato: Date,
	erSkjermetPerson: boolean,
	epost: string | null,
	telefonnummer: string | null,
	navEnhet: MockNavEnhet| null,
	navVeileder: MockNavVeileder | null,
	gjennomforing: MockGjennomforing,
	fjernesDato: Date | null,
	innsokBegrunnelse: string | null,
	aktivEndringsmelding: { startDato: Date } | null
}

const navEnheter: MockNavEnhet[] = [
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

export const lagMockTiltakDeltagereForGjennomforing = (gjennomforing: Gjennomforing, antallDeltakere = 10): MockTiltakDeltaker[] => {
	const deltakere: MockTiltakDeltaker[] = []

	for (let i = 0; i < antallDeltakere; i++) {
		deltakere.push(lagMockTiltakDeltagerForGjennomforing(gjennomforing))
	}

	return deltakere
}

const lagTelefonnummer = (): string => {
	return faker.phone.phoneNumber().replaceAll(' ', '')
}

const generateSluttDato = (status: TiltakDeltakerStatus, startDato: Date | null) =>  {
	if(startDato && status === TiltakDeltakerStatus.HAR_SLUTTET) faker.date.between(startDato, Date())
	if(startDato) return faker.date.future(1, startDato) //dato etter startdato, innen 1 år
	return null
}

const getStatus = (): TiltakDeltakerStatus => {
	const i = randBetween(0, 10)

	if(i < 5) return TiltakDeltakerStatus.DELTAR
	if(i < 7) return TiltakDeltakerStatus.VENTER_PA_OPPSTART
	if(i < 8) return TiltakDeltakerStatus.HAR_SLUTTET
	if(i < 9) return TiltakDeltakerStatus.IKKE_AKTUELL

	return TiltakDeltakerStatus.DELTAR
}

const lagMockTiltakDeltagerForGjennomforing = (gjennomforing: Gjennomforing): MockTiltakDeltaker => {
	const status = getStatus()

	const gender = randBetween(0, 1)

	const brukerFornavn = faker.name.firstName(gender)
	const brukerMellomnavn = randBetween(0, 10) > 6 ? faker.name.firstName(gender) : null
	const brukerEtternavn = faker.name.lastName()

	const veilederNavn = faker.name.firstName() + ' ' + faker.name.lastName()

	const startDato = status !== TiltakDeltakerStatus.VENTER_PA_OPPSTART ? faker.date.past() : null
	const fjernesDato = status === TiltakDeltakerStatus.IKKE_AKTUELL || status === TiltakDeltakerStatus.HAR_SLUTTET? faker.date.future() : null

	return {
		id: deltakerId(),
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
		erSkjermetPerson: randBetween(0, 10) > 7,
		navEnhet: faker.random.arrayElement(navEnheter),
		navVeileder: {
			epost: lagMailFraNavn(veilederNavn, 'nav.no'),
			navn: veilederNavn,
			telefon: lagTelefonnummer()
		},
		fjernesDato: fjernesDato,
		gjennomforing: gjennomforing,
		registrertDato: faker.date.past(),
		innsokBegrunnelse: genererBegrunnelse(brukerFornavn),
		aktivEndringsmelding: randBetween(0, 10) > 7 ? {
			startDato: faker.date.soon()
		} : null
	}
}

const genererBegrunnelse = (fornavn: string) => {
	return `\
${fornavn} har stått uten arbeid en lengre periode på grunn av helseutfordringer. Hen har mye arbeidserfaring og har spisskompetanse innen ledelse i salg og service. Hen har fått god hjelp fra helsevesenet og er nå klar for å starte prosessen med å finne nytt arbeid. ${fornavn} har et ønske om å bytte bransje, men er usikker på hvilke typer jobber som kan være aktuelle. Hen har trolig også behov for å kartlegge om hen har behov for tilrettelegging på arbeidsplassen.

${fornavn} ønsker:
- Yrkes- og karriereveiledning
- Hjelp/sparring på å skrive søknader og intervjutrening
- Hjelp, veiledning og vurdering av nødvendig tilrettelegging på arbeidsplassen

${fornavn} håper at hen raskt kommer i kontakt med mulige arbeidsgivere for å starte å jobbe. Hen tror selv at hen har behov for hjelp i inntil 4 måneder, inklusiv oppfølging på arbeidsplassen.

NAV kan vurdere tilskudd for å kompensere for utgifter arbeidsgiver skulle ha med tilrettelegging.`
}