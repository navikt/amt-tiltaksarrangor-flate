import { TiltakDeltaker } from '../../../../../api/data/deltaker'
import {
	AvsluttDeltakelseEndringsmelding,
	EndreOppstartsdatoEndringsmelding,
	Endringsmelding,
	EndringsmeldingType,
	ForlengDeltakelseEndringsmelding,
	LeggTilOppstartsdatoEndringsmelding
} from '../../../../../api/data/endringsmelding'
import { compareAsc, Sortering } from '../../../../../utils/sortering-utils'

export enum DeltakerKolonne {
	NAVN = 'NAVN',
	FODSELSNUMMER = 'FODSELSNUMMER',
	STATUS = 'STATUS',
	OPPSTART = 'OPPSTART',
	SLUTT = 'SLUTT',
	SOKT_INN = 'SOKT_INN',
	VEILEDER = 'VEILEDER',
}

export const sorterDeltakere = (deltakere: TiltakDeltaker[], sortering: Sortering | undefined): TiltakDeltaker[] => {
	if (!sortering) {
		return sorterStatusEndringDesc(deltakere)
	}

	if (sortering.direction === undefined) {
		return deltakere
	}

	const finnEndringsmeldingMedStartDato = (endringsmeldinger: Endringsmelding[]): LeggTilOppstartsdatoEndringsmelding | EndreOppstartsdatoEndringsmelding | undefined => {
		return endringsmeldinger
			.filter(endringsmelding =>
				endringsmelding.type === EndringsmeldingType.LEGG_TIL_OPPSTARTSDATO ||
				endringsmelding.type === EndringsmeldingType.ENDRE_OPPSTARTSDATO
			)[0] as LeggTilOppstartsdatoEndringsmelding | EndreOppstartsdatoEndringsmelding
	}

	const finnEndringsmeldingMedSluttDato = (endringsmeldinger: Endringsmelding[]): ForlengDeltakelseEndringsmelding | AvsluttDeltakelseEndringsmelding | undefined => {
		return endringsmeldinger
			.filter(endringsmelding =>
				endringsmelding.type === EndringsmeldingType.FORLENG_DELTAKELSE ||
				endringsmelding.type === EndringsmeldingType.AVSLUTT_DELTAKELSE
			)[0] as ForlengDeltakelseEndringsmelding | AvsluttDeltakelseEndringsmelding
	}

	const sorterteDeltakereAsc = [ ...deltakere ].sort((a, b) => {
		switch (sortering.orderBy) {
			case DeltakerKolonne.NAVN: {
				const compareRes = compareAsc(a.etternavn, b.etternavn)
				return compareRes != 0 ? compareRes : compareAsc(a.fornavn, b.fornavn)
			}
			case DeltakerKolonne.VEILEDER: {
				const v1 = a.aktiveVeiledere.filter(v => !v.erMedveileder)[0]
				const v2 = b.aktiveVeiledere.filter(v => !v.erMedveileder)[0]
				const compareRes = compareAsc(v1?.etternavn, v2?.etternavn)
				return compareRes != 0 ? compareRes : compareAsc(v1?.fornavn, v2?.fornavn)
			}
			case DeltakerKolonne.STATUS:
				return compareAsc(a.status.type, b.status.type)
			case DeltakerKolonne.OPPSTART:
				return compareAsc(
					finnEndringsmeldingMedStartDato(a.aktiveEndringsmeldinger)?.innhold.oppstartsdato || a.startDato,
					finnEndringsmeldingMedStartDato(b.aktiveEndringsmeldinger)?.innhold.oppstartsdato || b.startDato
				)
			case DeltakerKolonne.SLUTT:
				return compareAsc(
					finnEndringsmeldingMedSluttDato(a.aktiveEndringsmeldinger)?.innhold.sluttdato || a.sluttDato,
					finnEndringsmeldingMedSluttDato(b.aktiveEndringsmeldinger)?.innhold.sluttdato || b.sluttDato
				)
			case DeltakerKolonne.FODSELSNUMMER:
				return compareAsc(a.fodselsnummer, b.fodselsnummer)
			case DeltakerKolonne.SOKT_INN:
				return compareAsc(a.registrertDato, b.registrertDato)
			default:
				return 0
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
