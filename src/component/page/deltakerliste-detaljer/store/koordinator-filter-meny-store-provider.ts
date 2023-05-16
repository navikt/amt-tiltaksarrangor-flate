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

export const [ KoordinatorFilterMenyStoreProvider, useKoordinatorFilterMenyStore ] = constate(() => {
	const [ veilederFilter, setVeilederFilter ] = useState<string[]>([])
	const [ medveilederFilter, setMedveilederFilter ] = useState<string[]>([])
	const [ statusFilter, setStatusFilter ] = useState<string[]>([])
	const [ navKontorFilter, setNavKontorFilter ] = useState<string[]>([])

	const addStatusFilter = (status: string) => addFilter(status, statusFilter, setStatusFilter)
	const removeStatusFilter = (status: string) => removeFilter(status, statusFilter, setStatusFilter)

	const addVeilederFilter = (status: string) => addFilter(status, veilederFilter, setVeilederFilter)
	const removeVeilederFilter = (status: string) => removeFilter(status, veilederFilter, setVeilederFilter)

	const addMedveilederFilter = (status: string) => addFilter(status, medveilederFilter, setMedveilederFilter)
	const removeMedveilederFilter = (status: string) => removeFilter(status, medveilederFilter, setMedveilederFilter)

	const addNavKontorFilter = (status: string) => addFilter(status, navKontorFilter, setNavKontorFilter)
	const removeNavKontorFilter = (status: string) => removeFilter(status, navKontorFilter, setNavKontorFilter)


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

	const matcherNavKontor = (brukersNavKontor: string|null) => {
		if (navKontorFilter.length === 0) return true
		if (brukersNavKontor === null) return false
		return navKontorFilter.includes(brukersNavKontor)
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

	const filtrerDeltakerePaNavKontor = (deltakere: TiltakDeltaker[]): TiltakDeltaker[] => {
		return deltakere.filter(bruker => matcherNavKontor(bruker.navKontor))
	}

	const filtrerDeltakere = (deltakere: TiltakDeltaker[]): TiltakDeltaker[] => {
		const filtrertPaStatus = filtrerDeltakerePaStatus(deltakere)
		const filtrertPaVeiledere = filtrerDeltakereMedHovedveileder(filtrertPaStatus)
		const filtrertPaMedveileder = filtrerDeltakereMedMedveileder(filtrertPaVeiledere)
		const filtrertPaNavKontor = filtrerDeltakerePaNavKontor(filtrertPaMedveileder)

		return filtrertPaNavKontor
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
		navKontorFilter,
		addNavKontorFilter,
		removeNavKontorFilter,
		filtrerDeltakere
	}

})
