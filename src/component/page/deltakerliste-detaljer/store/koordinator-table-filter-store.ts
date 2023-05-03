import constate from 'constate'
import { useState } from 'react'
import { TiltakDeltaker } from '../../../../api/data/deltaker'
import { getHovedveileder, getMedveiledere, HAR_IKKE_VEILEDER_FILTER_TEKST } from '../../../../utils/veileder-utils'
import { VeilederMedType } from '../../../../api/data/veileder'

export const [ KoordinatorTableFilterStore, useKoordinatorTableFilterStore ] = constate(() => {
	const [ veilederFilter, setVeilederFilter ] = useState<string[]>([])
	const [ medveilederFilter, setMedveilederFilter ] = useState<string[]>([])
	const [ statusFilter, setStatusFilter ] = useState<string[]>([])

	const matcherStatus = (statusFilter: string[], brukerStatus: string) => {
		if (statusFilter.length === 0) return true
		return statusFilter.includes(brukerStatus)
	}

	const matcherVeileder = (veilederFiltre: string[], brukersVeileder: VeilederMedType) => {
		if (veilederFiltre.length === 0) return true
		if (brukersVeileder === undefined) return veilederFiltre.includes(HAR_IKKE_VEILEDER_FILTER_TEKST)
		return veilederFiltre.includes(brukersVeileder?.ansattId)
	}

	const matcherMedveileder = (medveilederFiltre: string[], brukersMedveiledere: VeilederMedType[]) => {

		if (medveilederFiltre.length === 0) return true
		let retVal = false
		brukersMedveiledere.forEach(it => {
			if (medveilederFiltre.includes(it.ansattId)) retVal = true
		})

		return retVal
	}

	const filtrerDeltakerePaStatus = (brukere: TiltakDeltaker[]): TiltakDeltaker[] => {
		return brukere.filter(bruker => matcherStatus(statusFilter, bruker.status.type))
	}

	const filtrerBrukerePaMedHovedveileder = (brukere: TiltakDeltaker[]): TiltakDeltaker[] => {
		return brukere.filter(bruker => matcherVeileder(veilederFilter, getHovedveileder(bruker)))
	}


	const filtrerBrukerePaMedveileder = (brukere: TiltakDeltaker[]): TiltakDeltaker[] => {
		return brukere.filter(bruker => matcherMedveileder(medveilederFilter, getMedveiledere(bruker)))
	}


	const filtrerDeltakere = (deltakere: TiltakDeltaker[]): TiltakDeltaker[] => {
		const filtrertPaStatus = filtrerDeltakerePaStatus(deltakere)
		const filtrertPaVeiledere = filtrerBrukerePaMedHovedveileder(filtrertPaStatus)
		const filtrertPaMedveileder = filtrerBrukerePaMedveileder(filtrertPaVeiledere)

		return filtrertPaMedveileder
	}

	return {
		veilederFilter,
		setVeilederFilter,
		medveilederFilter,
		setMedveilederFilter,
		statusFilter,
		setStatusFilter,
		filtrerDeltakerePaStatus,
		filtrerBrukerePaMedHovedveileder,
		filtrerBrukerePaMedveileder,
		filtrerDeltakere
	}

})
