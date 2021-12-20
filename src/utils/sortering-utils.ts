import {
	DeltakerKolonneNavn,
	DeltakerSortering,
	TiltakDeltakerPropNames
} from '../component/page/tiltakinstans-detaljer/deltaker-oversikt/types'
import { TiltakDeltaker } from '../domeneobjekter/deltaker'

export enum SorteringType {
	ASCENDING = 'ascending',
	DESCENDING = 'descending',
	NONE = 'none',
}

export const mapSortDirectionToText = (sorteringType: SorteringType): string => {
	switch (sorteringType) {
		case SorteringType.ASCENDING:
			return 'stigende'
		case SorteringType.DESCENDING:
			return 'synkende'
		default:
			return ''
	}
}

export const finnNesteSorteringType = (sorteringType: SorteringType): SorteringType => {
	switch (sorteringType) {
		case SorteringType.ASCENDING:
			return SorteringType.DESCENDING
		case SorteringType.DESCENDING:
			return SorteringType.NONE
		default:
			// This will be the default sort direction
			return SorteringType.ASCENDING
	}
}

export const getDeltakerPropName = (kolonne: DeltakerKolonneNavn) : TiltakDeltakerPropNames => {
	switch (kolonne){
		case DeltakerKolonneNavn.NAVN: return 'etternavn'
		case DeltakerKolonneNavn.START: return 'oppstartdato'
		case DeltakerKolonneNavn.SLUTT: return 'sluttdato'
		case DeltakerKolonneNavn.REGDATO: return 'registrertDato'
		case DeltakerKolonneNavn.FODSELSNUMMER: return 'fodselsnummer'
		case DeltakerKolonneNavn.STATUS: return 'status'
	}
}

export const sorterDeltakere = (deltakere: TiltakDeltaker[], sortering: DeltakerSortering): TiltakDeltaker[] => {
	const propName = getDeltakerPropName(sortering.kolonne)

	if(sortering.type === SorteringType.NONE || !deltakere || !sortering.kolonne || !propName ) {
		return deltakere
	}

	if(sortering.type === SorteringType.DESCENDING) {
		return deltakere.sort((a, b) => sort(b[propName], a[propName]))
	}

	return deltakere.sort( (a, b) => sort(a[propName], b[propName]))
}

function sort<Type>(a: Type, b: Type): number {
	if(a === b) return 0
	if(!a || a < b) return -1
	if(a > b) return 1
	return 0
}
