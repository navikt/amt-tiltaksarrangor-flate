import { SorteringType } from '../../../../utils/sortering-utils';

export enum Kolonnenavn {
	NAVN = 'NAVN',
	FODSELSNUMMER = 'FODSELSNUMMER',
	STATUS = 'STATUS',
	START = 'START',
	SLUTT = 'SLUTT',
}

export interface BrukerSortering {
	kolonnenavn: Kolonnenavn;
	sorteringType: SorteringType;
}
