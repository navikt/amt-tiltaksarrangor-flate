import { TiltakDeltager, TiltakDeltagerStatus } from '../domeneobjekter/deltager'

const matcherNavn = (bruker: {fornavn: string, etternavn: string}, navnFilter: string | undefined) => {
	if(!navnFilter || navnFilter.trim().length === 0) return true

	const matcherFornavn = bruker.fornavn.toLowerCase().includes(navnFilter.toLowerCase())
	const matcherEtternavn = bruker.etternavn.toLowerCase().includes(navnFilter.toLowerCase())

	return matcherFornavn || matcherEtternavn
}

const matcherStatus = (statusFilter: TiltakDeltagerStatus[], brukerStatus: TiltakDeltagerStatus) => {
	if (statusFilter.length === 0) return true
	return statusFilter.includes(brukerStatus)
}

export const filtrerBrukere = (brukere: TiltakDeltager[], statusFilter: TiltakDeltagerStatus[], navnFilter: string): TiltakDeltager[] => {
	return brukere
		.filter(bruker => matcherNavn(bruker, navnFilter))
		.filter(bruker => matcherStatus(statusFilter, bruker.status))
}