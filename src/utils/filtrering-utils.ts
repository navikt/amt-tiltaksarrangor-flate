import { TiltakDeltaker, TiltakDeltakerStatus, VeiledersDeltaker } from '../api/data/deltaker'
import { tilVeiledertype } from './deltakerliste-utils'
import { Veiledertype } from '../component/page/veileder/Veiledertype'
import {
	getHovedveileder,
	getHovedveilederNavn,
	getMedveiledereNavn,
	HAR_IKKE_VEILEDER_FILTER_TEKST
} from './veileder-utils'
import { Veileder } from '../api/data/veileder';


const matcherStatus = (statusFilter: TiltakDeltakerStatus[], brukerStatus: TiltakDeltakerStatus) => {
	if (statusFilter.length === 0) return true
	return statusFilter.includes(brukerStatus)
}

const matcherVeileder = (veilederFiltre: string[], brukersVeileder: Veileder) => {
	console.log(veilederFiltre, brukersVeileder)
	if (veilederFiltre.length === 0) return true
	if(brukersVeileder === undefined) return veilederFiltre.includes(HAR_IKKE_VEILEDER_FILTER_TEKST)
	return veilederFiltre.includes(brukersVeileder?.ansattId)
}

const matcherMedveileder = (medveilederFiltre: string[], brukersMedveiledere: string[]) => {
	if(medveilederFiltre.length === 0) return true
	let retVal = false
	brukersMedveiledere.forEach(it => {
		if(medveilederFiltre.includes(it)) retVal = true
	})

	return retVal
}

const matcherDeltakerliste = (deltakerlisteFilter: string[], deltakerliste: string) => {
	if (deltakerlisteFilter.length === 0) return true
	return deltakerlisteFilter.includes(deltakerliste)
}

const matcherVeiledertype = (veiledertypeFilter: Veiledertype[], veiledertype: Veiledertype) => {
	if (veiledertypeFilter.length === 0) return true
	return veiledertypeFilter.includes(veiledertype)
}

export const filtrerBrukerePaMedHovedveileder = (brukere: TiltakDeltaker[], veiledere: string[]): TiltakDeltaker[] => {
	return brukere.filter(bruker => matcherVeileder(veiledere, getHovedveileder(bruker)))
}

export const filtrerBrukerePaMedveileder = (brukere: TiltakDeltaker[], medveiledere: string[]): TiltakDeltaker[] => {
	return brukere.filter(bruker => matcherMedveileder(medveiledere, getMedveiledereNavn(bruker)))
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

export const filtrerVeiledertype = (brukere: VeiledersDeltaker[], veiledertypeFilter: Veiledertype[]): VeiledersDeltaker[] => {
	return brukere.filter(bruker => matcherVeiledertype(veiledertypeFilter, tilVeiledertype(bruker.erMedveilederFor)))
}
