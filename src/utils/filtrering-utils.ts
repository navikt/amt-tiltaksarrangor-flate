import { TiltakDeltaker, TiltakDeltakerStatus, VeiledersDeltaker } from '../api/data/deltaker'

const matcherStatus = (statusFilter: TiltakDeltakerStatus[], brukerStatus: TiltakDeltakerStatus) => {
	if (statusFilter.length === 0) return true
	return statusFilter.includes(brukerStatus)
}

const matcherDeltakerliste = (deltakerlisteFilter: string[], deltakerliste: string) => {
	if (deltakerlisteFilter.length === 0) return true
	return deltakerlisteFilter.includes(deltakerliste)
}

const matcherMedveilederFor = (erMedveilederFilter: boolean[], erMedveileder: boolean) => {
	if (erMedveilederFilter.length === 0) return true
	return erMedveilederFilter.includes(erMedveileder)
}

export const filtrerBrukere = (brukere: TiltakDeltaker[], statusFilter: TiltakDeltakerStatus[]): TiltakDeltaker[] => {
	return brukere.filter(bruker => matcherStatus(statusFilter, bruker.status.type))
}

export const filtrerVeiledersDeltakere = (brukere: VeiledersDeltaker[], statusFilter: TiltakDeltakerStatus[]): VeiledersDeltaker[] => {
	return brukere.filter(bruker => matcherStatus(statusFilter, bruker.status.type))
}

export const filtrerDeltakerliste = (brukere: VeiledersDeltaker[], deltakerlisteFilter: string[]): VeiledersDeltaker[] => {
	return brukere.filter(bruker => matcherDeltakerliste(deltakerlisteFilter, bruker.deltakerliste.navn))
}

export const filtrerVeiledertype = (brukere: VeiledersDeltaker[], erMedveilederFilter: boolean[]): VeiledersDeltaker[] => {
	return brukere.filter(bruker => matcherMedveilederFor(erMedveilederFilter, bruker.erMedveilederFor))
}