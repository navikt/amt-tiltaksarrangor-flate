import { TiltakDeltaker, TiltakDeltakerStatus } from '../domeneobjekter/deltaker'

const matcherNavn = (bruker: {fornavn: string, etternavn: string}, navnFilter: string | undefined) => {
	if(!navnFilter || navnFilter.trim().length === 0) return true

	const matcherFornavn = bruker.fornavn.toLowerCase().includes(navnFilter.toLowerCase())
	const matcherEtternavn = bruker.etternavn.toLowerCase().includes(navnFilter.toLowerCase())

	return matcherFornavn || matcherEtternavn
}

const matcherStatus = (statusFilter: TiltakDeltakerStatus[], brukerStatus: TiltakDeltakerStatus) => {
	if (statusFilter.length === 0) return true
	return statusFilter.includes(brukerStatus)
}

export const filtrerBrukere = (brukere: TiltakDeltaker[], statusFilter: TiltakDeltakerStatus[], navnFilter: string): TiltakDeltaker[] => {
	return brukere
		.filter(bruker => matcherNavn(bruker, navnFilter))
		.filter(bruker => matcherStatus(statusFilter, bruker.status))
}