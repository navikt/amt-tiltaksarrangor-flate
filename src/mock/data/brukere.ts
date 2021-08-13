import faker from 'faker';
import { Bruker, DetaljertBruker, NavEnhet, TiltakStatus, TiltakType } from '../../api/data/bruker';
import { OrNothing } from '../../utils/types/or-nothing';

faker.locale = "nb_NO";
faker.seed(486756783);

const navEnheter: NavEnhet[] = [
	{
		enhetId: '0219',
		enhetNavn: 'NAV Bærum'
	},
	{
		enhetId: '0425',
		enhetNavn: 'NAV Åsnes'
	},
	{
		enhetId: '1500',
		enhetNavn: 'NAV Møre og Romsdal'
	},
	{
		enhetId: '0104',
		enhetNavn: 'NAV Moss'
	}
];

const randBetween = (min: number, max: number): number => {
	return faker.datatype.number({ min, max })
};

const randomFnr = (): string => {
	const dag = randBetween(1, 31);
	const mnd = randBetween(1, 12);
	const ar = randBetween(0, 99);
	const arhundre = randBetween(0, 99).toString().padStart(2, '0');
	const kjonnsiffer = faker.datatype.boolean() ? 4 : 1;
	const individsifre = `${arhundre}${kjonnsiffer}`;
	const kontrollsifre = `${randBetween(0, 9)}${randBetween(0, 9)}`;

	return `${dag.toString().padStart(2, '0')}${mnd.toString().padStart(2, '0')}${ar.toString().padStart(2, '0')}${individsifre}${kontrollsifre}`;
}

const startDatoForTiltakStatus = (status: TiltakStatus): OrNothing<string> => {
	if (status === TiltakStatus.PAMELDT || status === TiltakStatus.GJENNOMFORES) {
		return faker.date.recent().toISOString();
	}

	return undefined;
};

const sluttDatoForTiltakStatus = (status: TiltakStatus): OrNothing<string> => {
	// TODO: Implement
	return undefined;
};

const lagMailFraNavn = (navn: string, mailDomain: string): string => {
	const mailNavn = navn.replaceAll(' ', '.')
		.replaceAll('æ', 'ae')
		.replaceAll('ø', 'o')
		.replaceAll('å', 'a')
		.toLowerCase();

	return `${mailNavn}@${mailDomain}`
};

export const lagDetaljerteBrukere = (antallBrukere: number): DetaljertBruker[] => {
	const brukere: DetaljertBruker[] = [];

	for (let i = 0; i < antallBrukere; i++) {

		const status = faker.random.objectElement(TiltakStatus) as TiltakStatus;

		const brukerFornavn = faker.name.firstName();
		const brukerEtternavn = faker.name.lastName();

		const veilederNavn = faker.name.firstName() + " " + faker.name.lastName();

		const bruker: DetaljertBruker = {
			id: randBetween(1000, 1000000).toString(),
			fornavn: brukerFornavn,
			etternavn: brukerEtternavn,
			fodselsdato: randomFnr().substring(0, 6),
			tiltak: {
				status: faker.random.objectElement(TiltakStatus) as TiltakStatus,
				type: faker.random.objectElement(TiltakType) as TiltakType,
				startDato: startDatoForTiltakStatus(status),
				sluttDato: sluttDatoForTiltakStatus(status),
				navn: 'Noe tekst'
			},
			kontaktinfo: {
				email: lagMailFraNavn(`${brukerFornavn} ${brukerEtternavn}`, 'example.com'),
				telefonnummer: faker.phone.phoneNumber()
			},
			navEnhet: faker.random.arrayElement(navEnheter),
			navVeileder: {
				navn: veilederNavn,
				email: lagMailFraNavn(veilederNavn, 'nav.no'),
				telefonnummer: faker.phone.phoneNumber()
			},
		};

		brukere.push(bruker);
	}

	return brukere;
};

export const tilBruker = (detaljertBruker: DetaljertBruker): Bruker => {
	return {
		id: detaljertBruker.id,
		fornavn: detaljertBruker.fornavn,
		etternavn: detaljertBruker.etternavn,
		fodselsdato: detaljertBruker.fodselsdato,
		tiltak: detaljertBruker.tiltak
	};
};

export const mockBrukere = lagDetaljerteBrukere(55);
