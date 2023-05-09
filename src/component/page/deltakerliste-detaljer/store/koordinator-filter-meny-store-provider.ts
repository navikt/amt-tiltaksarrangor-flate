import constate from 'constate'
import { useState } from 'react'
import { TiltakDeltaker } from '../../../../api/data/deltaker'
import { getHovedveileder, getMedveiledere, HAR_IKKE_VEILEDER_FILTER_TEKST } from '../../../../utils/veileder-utils'
import { VeilederMedType } from '../../../../api/data/veileder'

export const [ KoordinatorFilterMenyStoreProvider, useKoordinatorFilterMenyStore ] = constate(() => {
	const [ veilederFilter, setVeilederFilter ] = useState<string[]>([])
	const [ medveilederFilter, setMedveilederFilter ] = useState<string[]>([])
	const [ statusFilter, setStatusFilter ] = useState<string[]>([])

	const addStatusFilter = (status: string) => addFilter(status, statusFilter, setStatusFilter)
	const removeStatusFilter = (status: string) => removeFilter(status, statusFilter, setStatusFilter)

	const addVeilederFilter = (status: string) => addFilter(status, veilederFilter, setVeilederFilter)
	const removeVeilederFilter = (status: string) => removeFilter(status, veilederFilter, setVeilederFilter)

	const addMedveilederFilter = (status: string) => addFilter(status, medveilederFilter, setMedveilederFilter)
	const removeMedveilederFilter = (status: string) => removeFilter(status, medveilederFilter, setMedveilederFilter)


	const addFilter = ((value: string, filterValue: string[], setFilter: (value: string[]) => void) => {
		if(!filterValue.includes(value)) {
			setFilter([ ...filterValue, value ])
		}
	})

	const removeFilter = (value: string, filterValue: string[], setFilter: (value: string[]) => void) =>
		setFilter(filterValue.filter((v) => v !== value))

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
		addVeilederFilter,
		removeVeilederFilter,
		medveilederFilter,
		addMedveilederFilter,
		removeMedveilederFilter,
		statusFilter,
		addStatusFilter,
		removeStatusFilter,
		filtrerDeltakerePaStatus,
		filtrerBrukerePaMedHovedveileder,
		filtrerBrukerePaMedveileder,
		filtrerDeltakere
	}

})
