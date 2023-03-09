import { TiltakDeltaker, TiltakDeltakerStatus, VeiledersDeltaker } from '../api/data/deltaker'

const matcherStatus = (statusFilter: TiltakDeltakerStatus[], brukerStatus: TiltakDeltakerStatus) => {
	if (statusFilter.length === 0) return true
	return statusFilter.includes(brukerStatus)
}

export const filtrerBrukere = (brukere: TiltakDeltaker[], statusFilter: TiltakDeltakerStatus[]): TiltakDeltaker[] => {
	return brukere.filter(bruker => matcherStatus(statusFilter, bruker.status.type))
}

export const filtrerVeiledersDeltakere = (brukere: VeiledersDeltaker[], statusFilter: TiltakDeltakerStatus[]): VeiledersDeltaker[] => {
	return brukere.filter(bruker => matcherStatus(statusFilter, bruker.status.type))
}