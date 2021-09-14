import faker from 'faker';

import { Deltaker, DetaljertBruker, NavEnhet, TiltakStatus, TiltakType } from '../../api/data/bruker';
import { OrNothing } from '../../utils/types/or-nothing';
import { randBetween, randomFnr } from '../utils/faker';

const navEnheter: NavEnhet[] = [
	{
		enhetId: '0219',
		enhetNavn: 'NAV Bærum',
	},
	{
		enhetId: '0425',
		enhetNavn: 'NAV Åsnes',
	},
	{
		enhetId: '1500',
		enhetNavn: 'NAV Møre og Romsdal',
	},
	{
		enhetId: '0104',
		enhetNavn: 'NAV Moss',
	},
];

const startDatoForTiltakStatus = (status: TiltakStatus): OrNothing<string> => {
	if (status === TiltakStatus.PAMELDT || status === TiltakStatus.GJENNOMFORES) {
		return ;
	}

	return undefined;
};

const sluttDatoForTiltakStatus = (status: TiltakStatus): OrNothing<string> => {
	// TODO: Implement
	return undefined;
};

const lagMailFraNavn = (navn: string, mailDomain: string): string => {
	const mailNavn = navn
		.replaceAll(' ', '.')
		.replaceAll('æ', 'ae')
		.replaceAll('ø', 'o')
		.replaceAll('å', 'a')
		.toLowerCase();

	return `${mailNavn}@${mailDomain}`;
};

export const lagDetaljerteBrukere = (antallBrukere: number): DetaljertBruker[] => {
	const brukere: DetaljertBruker[] = [];

	for (let i = 0; i < antallBrukere; i++) {
		const status = faker.random.objectElement(TiltakStatus) as TiltakStatus;

		const brukerFornavn = faker.name.firstName();
		const brukerEtternavn = faker.name.lastName();

		const veilederNavn = faker.name.firstName() + ' ' + faker.name.lastName();

		const bruker: DetaljertBruker = {
			id: randBetween(1000, 1000000).toString(),
			fornavn: brukerFornavn,
			etternavn: brukerEtternavn,
			fodselsdato: randomFnr().substring(0, 6),
			tiltak: {
				id: randBetween(1000, 1000000).toString(),
				status: status,
				type: faker.random.objectElement(TiltakType) as TiltakType,
				startdato: startDatoForTiltakStatus(status),
				sluttdato: sluttDatoForTiltakStatus(status),
				navn: 'Noe tekst',
			},
			kontaktinfo: {
				email: lagMailFraNavn(`${brukerFornavn} ${brukerEtternavn}`, 'example.com'),
				telefonnummer: faker.phone.phoneNumber(),
			},
			navEnhet: faker.random.arrayElement(navEnheter),
			navVeileder: {
				navn: veilederNavn,
				email: lagMailFraNavn(veilederNavn, 'nav.no'),
				telefonnummer: faker.phone.phoneNumber(),
			},
		};

		brukere.push(bruker);
	}

	return brukere;
};

export const tilBruker = (detaljertBruker: DetaljertBruker): Deltaker => {
	return {
		id: detaljertBruker.id,
		fornavn: detaljertBruker.fornavn,
		etternavn: detaljertBruker.etternavn,
		fodselsdato: detaljertBruker.fodselsdato,
		stardato: faker.date.recent(5).toISOString(),
		sluttdato: faker.date.soon(5).toISOString(),
		tiltak: detaljertBruker.tiltak,
	};
};

export const mockBrukere = lagDetaljerteBrukere(55);
