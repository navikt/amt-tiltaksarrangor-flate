import faker from 'faker'

import { TiltakDeltakerStatus } from '../../api/data/deltaker'
import { Endringsmelding } from '../../api/data/endringsmelding'
import { Gjennomforing } from '../../api/data/tiltak'
import { VeilederMedType } from '../../api/data/veileder'
import { randBetween, randomBoolean, randomFnr } from '../utils/faker'
import { lagMockEndringsmeldingForDeltaker } from './endringsmelding'
import { deltakerId } from './id'
import { deltakerlisteErKurs, MockGjennomforing } from './tiltak'
import { lagMockVeiledereForDeltaker } from './veileder'

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
	deltakelseProsent: number | null,
	dagerPerUke: number | null,
	status: {
		type: TiltakDeltakerStatus,
		endretDato: Date,
	},
	registrertDato: Date,
	epost: string | null,
	telefonnummer: string | null,
	navEnhet: MockNavEnhet | null,
	navVeileder: MockNavVeileder | null,
	gjennomforing: MockGjennomforing,
	fjernesDato: Date | null,
	innsokBegrunnelse: string | null,
	aktiveEndringsmeldinger: Endringsmelding[]
	veiledere: VeilederMedType[]
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

const getStatus = (erKurs: boolean): TiltakDeltakerStatus => {
	const i = randBetween(0, 10)

	if (erKurs) {
		if (i < 2) return TiltakDeltakerStatus.VURDERES
		if (i < 4) return TiltakDeltakerStatus.DELTAR
		if (i < 7) return TiltakDeltakerStatus.VENTER_PA_OPPSTART
		if (i < 8) return TiltakDeltakerStatus.FULLFORT
		if (i < 10) return TiltakDeltakerStatus.AVBRUTT
	}
	if (i < 5) return TiltakDeltakerStatus.DELTAR
	if (i < 7) return TiltakDeltakerStatus.VENTER_PA_OPPSTART
	if (i < 8) return TiltakDeltakerStatus.HAR_SLUTTET
	if (i < 9) return TiltakDeltakerStatus.IKKE_AKTUELL

	return TiltakDeltakerStatus.DELTAR
}

const finnStartdato = (erGruppeAmoSorvest: boolean, gjennomforing: Gjennomforing, skalHaDatoer: boolean, deltakerstatus: TiltakDeltakerStatus): Date|null => {
	if (erGruppeAmoSorvest && randBetween(0, 10) < 9) {
		return gjennomforing.startDato
	} else {
		return skalHaDatoer
			? (deltakerstatus === TiltakDeltakerStatus.VENTER_PA_OPPSTART ? faker.date.future() : faker.date.past())
			: null
	}
}

const finnSluttdato = (erGruppeAmoSorvest: boolean, gjennomforing: Gjennomforing, startDato: Date|null, deltakerstatus: TiltakDeltakerStatus): Date|null => {
	if (erGruppeAmoSorvest && randBetween(0, 10) < 9) {
		return gjennomforing.sluttDato
	} else {
		return startDato != null
			? (deltakerstatus === TiltakDeltakerStatus.HAR_SLUTTET ? faker.date.between(startDato, Date()) : faker.date.between(startDato, gjennomforing.sluttDato? gjennomforing.sluttDato: Date()))
			: null
	}
}

const lagMockTiltakDeltagerForGjennomforing = (gjennomforing: Gjennomforing): MockTiltakDeltaker => {
	const erKurs = deltakerlisteErKurs(gjennomforing.tiltak.tiltakskode)
	const status = getStatus(erKurs)
	const gender = randBetween(0, 1)
	const brukerFornavn = faker.name.firstName(gender)
	const brukerMellomnavn = randomBoolean(50) ? faker.name.firstName(gender) : null
	const brukerEtternavn = faker.name.lastName()

	const veilederNavn = faker.name.firstName() + ' ' + faker.name.lastName()

	// 80% av deltakere med status VENTER_PA_OPPSTART, IKKE_AKTUELL skal ikke ha datoer
	const skalHaDatoer = [ TiltakDeltakerStatus.VENTER_PA_OPPSTART, TiltakDeltakerStatus.IKKE_AKTUELL ].includes(status)
		? randomBoolean(20)
		: true

	// 90% av deltakerne på Gruppe AMO Sørvest skal ha samme start- og sluttdato som gjennomføringen
	const erGruppeAmoSorvest = gjennomforing.navn === 'Gruppe AMO Sørvest'

	const startDato = finnStartdato(erGruppeAmoSorvest, gjennomforing, skalHaDatoer, status)
	const sluttDato = finnSluttdato(erGruppeAmoSorvest, gjennomforing, startDato, status)

	const fjernesDato = status === TiltakDeltakerStatus.IKKE_AKTUELL || status === TiltakDeltakerStatus.HAR_SLUTTET
		? faker.date.future()
		: null

	const veileder = randomBoolean(90) ? {
		epost: lagMailFraNavn(veilederNavn, 'nav.no'),
		navn: veilederNavn,
		telefon: lagTelefonnummer()
	} : null

	const id = deltakerId()
	return {
		id: id,
		fornavn: brukerFornavn,
		mellomnavn: brukerMellomnavn,
		etternavn: brukerEtternavn,
		fodselsnummer: randomFnr(),
		epost: lagMailFraNavn(`${brukerFornavn} ${brukerEtternavn}`, 'example.com'),
		telefonnummer: lagTelefonnummer(),
		startDato: startDato,
		sluttDato: sluttDato,
		deltakelseProsent: randBetween(0, 10) > 4 ? randBetween(0, 100) : null,
		dagerPerUke: randBetween(0, 10) > 5 ? randBetween(1, 5) : null,
		status: {
			type: status,
			endretDato: faker.date.recent()
		},
		navEnhet: faker.random.arrayElement(navEnheter),
		navVeileder: veileder,
		fjernesDato: fjernesDato,
		gjennomforing: gjennomforing,
		registrertDato: faker.date.past(),
		innsokBegrunnelse: genererBegrunnelse(brukerFornavn),
		aktiveEndringsmeldinger: lagMockEndringsmeldingForDeltaker(status),
		veiledere: lagMockVeiledereForDeltaker(id),
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
