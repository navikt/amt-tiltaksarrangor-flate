import { SorteringType } from '../../../../utils/sortering-utils';

export enum Kolonnenavn {
	NAVN = 'NAVN',
	FODSELSDATO = 'FODSELSDATO',
	TILTAKSTYPE = 'TILTAKSTYPE',
	TILTAK = 'TILTAK',
	STATUS = 'STATUS',
	START = 'START',
	SLUTT = 'SLUTT'
}

export interface BrukerSortering {
	kolonnenavn: Kolonnenavn;
	sorteringType: SorteringType;
}