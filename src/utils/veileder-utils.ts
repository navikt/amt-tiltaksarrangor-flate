import { TiltakDeltaker } from '../api/data/deltaker'
import { Veileder } from '../api/data/veileder'

export const HAR_IKKE_VEILEDER_FILTER_TEKST = 'Uten Veileder'
export const HAR_IKKE_MEDVEILEDER_VILER_TEKST = 'Uten Medveileder'

export const getHovedveilederNavn = (deltaker: TiltakDeltaker): string => {
	const hovedveileder = deltaker.aktiveVeiledere.filter((t) => !t.erMedveileder)[0]
	return hovedveileder
		? veilederNavn(hovedveileder)
		: HAR_IKKE_VEILEDER_FILTER_TEKST
}

export const getMedveiledereNavn = (deltaker: TiltakDeltaker): string[] => {
	const medveiledere = deltaker.aktiveVeiledere.filter((t) => t.erMedveileder)
	return medveiledere.length > 0
		? medveiledere.map(it => veilederNavn(it))
		: [ HAR_IKKE_MEDVEILEDER_VILER_TEKST ]
}

const veilederNavn = (veileder: Veileder): string => {
	if (veileder.mellomnavn === null) {
		return veileder.fornavn + ' ' + veileder.etternavn
	} else {
		return veileder.fornavn + ' ' + veileder.mellomnavn + ' ' + veileder.etternavn
	}
}
