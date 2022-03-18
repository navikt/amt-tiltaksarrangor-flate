import { TiltakDeltakerDto, TiltakDeltakerStatus } from '../api/data/deltaker'

const matcherStatus = (statusFilter: TiltakDeltakerStatus[], brukerStatus: TiltakDeltakerStatus) => {
	if (statusFilter.length === 0) return true
	return statusFilter.includes(brukerStatus)
}

export const filtrerBrukere = (brukere: TiltakDeltakerDto[], statusFilter: TiltakDeltakerStatus[]): TiltakDeltakerDto[] => {
	return brukere.filter(bruker => matcherStatus(statusFilter, bruker.status.type))
}