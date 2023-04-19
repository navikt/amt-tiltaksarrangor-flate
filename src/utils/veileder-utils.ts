import { TiltakDeltaker } from '../api/data/deltaker'
import { Veileder, VeilederMedType, Veiledertype } from '../api/data/veileder'

export const HAR_IKKE_VEILEDER_FILTER_TEKST = 'Uten veileder'
export const HAR_IKKE_MEDVEILEDER_FILTER_TEKST = 'Uten medveileder'


export const getHovedveileder = (deltaker: TiltakDeltaker): VeilederMedType => {
	return deltaker.veiledere.filter((t) => t.veiledertype=== Veiledertype.VEILEDER)[0]
}

export const getMedveiledere = (deltaker: TiltakDeltaker): VeilederMedType[] => {
	return deltaker.veiledere.filter((t) => t.veiledertype === Veiledertype.MEDVEILEDER)
}

export const veilederNavn = (veileder: VeilederMedType): string => {
	if (veileder.mellomnavn === null) {
		return veileder.fornavn + ' ' + veileder.etternavn
	} else {
		return veileder.fornavn + ' ' + veileder.mellomnavn + ' ' + veileder.etternavn
	}
}
