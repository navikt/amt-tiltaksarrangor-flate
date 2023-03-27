import constate from 'constate'
import { useState } from 'react'
import { TiltakDeltaker } from '../../../../api/data/deltaker'
import { filtrerBrukerePaMedHovedveileder, filtrerBrukerePaMedveileder } from '../../../../utils/filtrering-utils'

export const [ KoordinatorTableFilterStore, useKoordinatorTableFilterStore ] = constate(() => {
	const [ veilederFilter, setVeilederFilter ] = useState<string[]>([])
	const [ medveilederFilter, setMedveilederFilter ] = useState<string[]>([])
	const [ statusFilter, setStatusFilter ] = useState<string[]>([])

	const matcherStatus = (statusFilter: string[], brukerStatus: string) => {
		if (statusFilter.length === 0) return true
		return statusFilter.includes(brukerStatus)
	}

	const filtrerDeltakerePaStatus = (brukere: TiltakDeltaker[], statusFilter: string[]): TiltakDeltaker[] => {
		return brukere.filter(bruker => matcherStatus(statusFilter, bruker.status.type))
	}

	const filtrerDeltakere = (deltakere: TiltakDeltaker[]): TiltakDeltaker[] => {
		const filtrertPaStatus = filtrerDeltakerePaStatus(deltakere, statusFilter)
		const filtrertPaVeiledere = filtrerBrukerePaMedHovedveileder(filtrertPaStatus, veilederFilter)
		const filtrertPaMedveileder = filtrerBrukerePaMedveileder(filtrertPaVeiledere, medveilederFilter)

		return filtrertPaMedveileder
	}

	return {
		veilederFilter,
		setVeilederFilter,
		medveilederFilter,
		setMedveilederFilter,
		statusFilter,
		setStatusFilter,
		filtrerDeltakere
	}

})
