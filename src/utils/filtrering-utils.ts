import { TiltakDeltakerStatus, VeiledersDeltaker } from '../api/data/deltaker'
import { Oppstartstype } from '../api/data/historikk'
import { Pameldingstype } from '../api/data/tiltak'

const matcherDeltakerliste = (
	deltakerlisteFilter: string[],
	deltakerliste: string
) => {
	if (deltakerlisteFilter.length === 0) return true
	return deltakerlisteFilter.includes(deltakerliste)
}

export const filtrerDeltakerliste = (
	brukere: VeiledersDeltaker[],
	deltakerlisteFilter: string[]
): VeiledersDeltaker[] => {
	return brukere.filter((bruker) =>
		matcherDeltakerliste(deltakerlisteFilter, bruker.deltakerliste.navn)
	)
}

export const getFilterStatuser = (oppstartstype: Oppstartstype | null, pameldingstype: Pameldingstype | null) => {
	const statuser = [ TiltakDeltakerStatus.VURDERES ] // TODO skal avvikles
	if (pameldingstype === Pameldingstype.TRENGER_GODKJENNING) {
		statuser.push(TiltakDeltakerStatus.SOKT_INN)
	}
	statuser.push(TiltakDeltakerStatus.VENTER_PA_OPPSTART)
	statuser.push(TiltakDeltakerStatus.DELTAR)
	if (oppstartstype === Oppstartstype.FELLES) {
		statuser.push(TiltakDeltakerStatus.FULLFORT)
		statuser.push(TiltakDeltakerStatus.AVBRUTT)
	} else {
		statuser.push(TiltakDeltakerStatus.HAR_SLUTTET)
	}
	statuser.push(TiltakDeltakerStatus.IKKE_AKTUELL)
	return statuser
}
