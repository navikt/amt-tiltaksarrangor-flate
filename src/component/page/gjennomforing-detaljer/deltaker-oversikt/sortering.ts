import { TiltakDeltaker } from '../../../../api/data/deltaker'
import { compareAsc, Sortering } from '../../../../utils/sortering-utils'

export enum DeltakerKolonne {
	NAVN = 'NAVN',
	FODSELSNUMMER = 'FODSELSNUMMER',
	STATUS = 'STATUS',
	OPPSTART = 'OPPSTART',
	SLUTT = 'SLUTT',
	SOKT_INN = 'SOKT_INN'
}

export const sorterDeltakere = (deltakere: TiltakDeltaker[], sortering: Sortering | undefined): TiltakDeltaker[] => {
	if (!sortering) {
		return deltakere
	}

	const propName = getDeltakerPropName(sortering.orderBy)

	if (sortering.direction === undefined || !deltakere || !propName) {
		return deltakere
	}

	const sorterteDeltakereAsc = [ ...deltakere ].sort((a, b) => {
		if (propName === 'status') {
			return compareAsc(a.status.type, b.status.type)
		} else {
			return compareAsc(a[propName], b[propName])
		}
	})

	if (sortering.direction === 'descending') {
		return sorterteDeltakereAsc.reverse()
	}

	return sorterteDeltakereAsc
}

const getDeltakerPropName = (kolonne: string): keyof TiltakDeltaker => {
	switch (kolonne){
		case DeltakerKolonne.NAVN: return 'etternavn'
		case DeltakerKolonne.OPPSTART: return 'startDato'
		case DeltakerKolonne.SLUTT: return 'sluttDato'
		case DeltakerKolonne.SOKT_INN: return 'registrertDato'
		case DeltakerKolonne.FODSELSNUMMER: return 'fodselsnummer'
		case DeltakerKolonne.STATUS: return 'status'
		default:
			throw Error('Ukjent kolonne ' + kolonne)
	}
}