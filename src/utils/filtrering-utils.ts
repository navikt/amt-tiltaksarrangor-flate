import { TiltakDeltakerStatus, VeiledersDeltaker } from '../api/data/deltaker'

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

export const getKursStatuser = () => {
	return [TiltakDeltakerStatus.VURDERES,
	TiltakDeltakerStatus.SOKT_INN,
	TiltakDeltakerStatus.VURDERES,
	TiltakDeltakerStatus.VENTER_PA_OPPSTART,
	TiltakDeltakerStatus.DELTAR,
	TiltakDeltakerStatus.FULLFORT,
	TiltakDeltakerStatus.AVBRUTT,
	TiltakDeltakerStatus.IKKE_AKTUELL,
	]
}

export const getIndividuellStatuser = () => {
	return [
		TiltakDeltakerStatus.VURDERES,
		TiltakDeltakerStatus.VENTER_PA_OPPSTART,
		TiltakDeltakerStatus.DELTAR,
		TiltakDeltakerStatus.HAR_SLUTTET,
		TiltakDeltakerStatus.IKKE_AKTUELL
	]
}
