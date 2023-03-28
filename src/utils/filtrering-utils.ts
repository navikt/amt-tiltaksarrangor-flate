import { TiltakDeltaker, VeiledersDeltaker } from '../api/data/deltaker'
import { getMedveiledere } from './veileder-utils'
import { Veileder } from '../api/data/veileder'

const matcherMedveileder = (medveilederFiltre: string[], brukersMedveiledere: Veileder[]) => {

	if (medveilederFiltre.length === 0) return true
	let retVal = false
	brukersMedveiledere.forEach(it => {
		if (medveilederFiltre.includes(it.ansattId)) retVal = true
	})

	return retVal
}

const matcherDeltakerliste = (deltakerlisteFilter: string[], deltakerliste: string) => {
	if (deltakerlisteFilter.length === 0) return true
	return deltakerlisteFilter.includes(deltakerliste)
}
export const filtrerBrukerePaMedveileder = (brukere: TiltakDeltaker[], medveiledere: string[]): TiltakDeltaker[] => {
	return brukere.filter(bruker => matcherMedveileder(medveiledere, getMedveiledere(bruker)))
}

export const filtrerDeltakerliste = (brukere: VeiledersDeltaker[], deltakerlisteFilter: string[]): VeiledersDeltaker[] => {
	return brukere.filter(bruker => matcherDeltakerliste(deltakerlisteFilter, bruker.deltakerliste.navn))
}
