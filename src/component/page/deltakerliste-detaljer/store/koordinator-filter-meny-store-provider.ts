import constate from 'constate'
import { useState } from 'react'
import { TiltakDeltaker } from '../../../../api/data/deltaker'
import {
	getHovedveileder,
	getMedveiledere,
	HAR_IKKE_MEDVEILEDER_FILTER_TEKST,
	HAR_IKKE_VEILEDER_FILTER_TEKST
} from '../../../../utils/veileder-utils'
import { VeilederMedType } from '../../../../api/data/veileder'

export enum FilterType {
	Ingen, Status, Veileder, Medveileder
}
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
	const matcherVeileder = (brukersVeileder: VeilederMedType) => {
		if (veilederFilter.length === 0) return true
		if (brukersVeileder === undefined) return veilederFilter.includes(HAR_IKKE_VEILEDER_FILTER_TEKST)
		return veilederFilter.includes(brukersVeileder?.ansattId)
	}

	const matcherMedveileder = (brukersMedveiledere: VeilederMedType[]) => {
		if (medveilederFilter.length === 0) return true
		if (brukersMedveiledere.length === 0 && medveilederFilter.includes(HAR_IKKE_MEDVEILEDER_FILTER_TEKST)) return true

		let retVal = false
		brukersMedveiledere.forEach(medveileder => {
			if (medveilederFilter.includes(medveileder.ansattId)) retVal = true
		})

		return retVal
	}

	const filtrerDeltakerePaStatus = (deltakere: TiltakDeltaker[]): TiltakDeltaker[] => {
		return deltakere.filter(bruker => matcherStatus(statusFilter, bruker.status.type))
	}

	const filtrerDeltakereMedHovedveileder = (deltakere: TiltakDeltaker[]): TiltakDeltaker[] => {
		return deltakere.filter(bruker => matcherVeileder(getHovedveileder(bruker)))
	}

	const filtrerDeltakereMedMedveileder = (brukere: TiltakDeltaker[]): TiltakDeltaker[] => {
		return brukere.filter(bruker => matcherMedveileder(getMedveiledere(bruker)))
	}

	const filtrerDeltakere = (deltakere: TiltakDeltaker[]): TiltakDeltaker[] => {
		return filtrerDeltakerePaaAltUtenom(FilterType.Ingen, deltakere)
	}

	const filtrerDeltakerePaaAltUtenom = (filterType: FilterType, deltakere: TiltakDeltaker[]) => {
		const filtrertPaStatus = filterType == FilterType.Status? deltakere: filtrerDeltakerePaStatus(deltakere)
		const filtrertPaVeiledere = filterType === FilterType.Veileder? filtrertPaStatus: filtrerDeltakereMedHovedveileder(filtrertPaStatus)
		return filterType == FilterType.Medveileder? filtrertPaVeiledere: filtrerDeltakereMedMedveileder(filtrertPaVeiledere)
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
		filtrerDeltakere,
		filtrerDeltakerePaaAltUtenom
	}

})
