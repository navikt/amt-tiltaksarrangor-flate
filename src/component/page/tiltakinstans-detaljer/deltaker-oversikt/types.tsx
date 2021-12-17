import { SorteringType } from '../../../../utils/sortering-utils'

export enum DeltakerKolonneNavn {
	NAVN = 'Etternavn, Fornavn',
	FODSELSNUMMER = 'Fødselsnummer',
	STATUS = 'Status',
	START = 'Start',
	SLUTT = 'Slutt',
	REGDATO = 'Søkt inn'
}

export interface DeltakerSortering {
	kolonne: DeltakerKolonneNavn;
	type: SorteringType;
}
//Disse må svare til TiltakDeltakers props
export type TiltakDeltakerPropNames = 'fornavn' | 'etternavn' | 'fodselsnummer'
	| 'oppstartdato' | 'sluttdato' | 'registrertDato' | 'status'
