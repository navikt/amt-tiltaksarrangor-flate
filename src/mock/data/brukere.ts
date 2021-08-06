import faker from 'faker';
import { Bruker } from '../../api/data/bruker';
import { randBetween } from '../../utils';

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

export const lagBrukere = (antallBrukere: number): Bruker[] => {
	const brukere: Bruker[] = [];

	for (let i = 0; i < antallBrukere; i++) {
		const bruker: Bruker = {
			fornavn: faker.name.firstName(),
			etternavn: faker.name.lastName(),
			fodselsdato: randomFnr().substring(0, 6),
			tiltakStatus: 'Ny bruker',
			tiltakType: 'Avklaring',
			tiltak: 'Noe tekst'
		};

		brukere.push(bruker);
	}

	return brukere;
};

export const mockBrukere = lagBrukere(25);
