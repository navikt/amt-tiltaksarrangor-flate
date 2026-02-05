import { TiltakDeltakerStatus, VeiledersDeltaker } from '../api/data/deltaker'
import { Oppstartstype } from '../api/data/historikk'
import { Pameldingstype, Tiltakskode } from '../api/data/tiltak'
import { harKursAvslutning } from './deltakerliste-utils'

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

export const getFilterStatuser = (
	oppstartstype: Oppstartstype,
	pameldingstype: Pameldingstype,
	tiltakskode: Tiltakskode
) => {
	const statuser = [ TiltakDeltakerStatus.VURDERES ] // TODO skal avvikles
	if (pameldingstype === Pameldingstype.TRENGER_GODKJENNING) {
		statuser.push(TiltakDeltakerStatus.SOKT_INN)
	}
	statuser.push(TiltakDeltakerStatus.VENTER_PA_OPPSTART)
	statuser.push(TiltakDeltakerStatus.DELTAR)

	if (harKursAvslutning(oppstartstype, tiltakskode)) {
		statuser.push(TiltakDeltakerStatus.FULLFORT)
		statuser.push(TiltakDeltakerStatus.AVBRUTT)
	} else {
		statuser.push(TiltakDeltakerStatus.HAR_SLUTTET)
	}

	// I en overgang vil gamle gruppetiltak med løpende oppstart ha avsluttende status HAR_SLUTTET
	if (tiltakskode === Tiltakskode.GRUPPE_FAG_OG_YRKESOPPLAERING || tiltakskode === Tiltakskode.GRUPPE_ARBEIDSMARKEDSOPPLAERING) {
		statuser.push(TiltakDeltakerStatus.HAR_SLUTTET)
	}

	statuser.push(TiltakDeltakerStatus.IKKE_AKTUELL)
	return statuser
}
