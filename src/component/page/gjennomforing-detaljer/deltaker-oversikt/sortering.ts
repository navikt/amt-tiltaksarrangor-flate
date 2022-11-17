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
		return sorterStatusEndringDesc(deltakere)
	}

	if (sortering.direction === undefined) {
		return deltakere
	}

	const sorterteDeltakereAsc = [ ...deltakere ].sort((a, b) => {
		switch (sortering.orderBy) {
			case DeltakerKolonne.NAVN: return compareAsc(a.etternavn, b.etternavn)
			case DeltakerKolonne.STATUS: return compareAsc(a.status.type, b.status.type)
			case DeltakerKolonne.OPPSTART: return 0
				//    compareAsc(
				//		a.aktivEndringsmelding?.startDato || a.startDato,
				//		b.aktivEndringsmelding?.startDato || b.startDato
				//	)
			case DeltakerKolonne.SLUTT: return 0 //compareAsc(
				//				a.aktivEndringsmelding?.sluttDato || a.sluttDato,
				//				b.aktivEndringsmelding?.sluttDato || b.sluttDato
				//			)
			case DeltakerKolonne.FODSELSNUMMER: return compareAsc(a.fodselsnummer, b.fodselsnummer)
			case DeltakerKolonne.SOKT_INN: return compareAsc(a.registrertDato, b.registrertDato)
			default: return 0

		}
	})

	if (sortering.direction === 'descending') {
		return sorterteDeltakereAsc.reverse()
	}

	return sorterteDeltakereAsc
}

const sorterStatusEndringDesc = (deltakere: TiltakDeltaker[]): TiltakDeltaker[] => {
	return [ ...deltakere ].sort((d1, d2) => {
		return compareAsc(d1.status.endretDato, d2.status.endretDato)
	}).reverse()

}
