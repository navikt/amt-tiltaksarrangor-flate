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
	Ingen,
	Status,
	Veileder,
	Medveileder,
	NavKontor
}
export const [ KoordinatorFilterMenyStoreProvider, useKoordinatorFilterMenyStore ] = constate(() => {
	const [ veilederFilter, setVeilederFilter ] = useState<string[]>([])
	const [ medveilederFilter, setMedveilederFilter ] = useState<string[]>([])
	const [ statusFilter, setStatusFilter ] = useState<string[]>([])
	const [ navKontorFilter, setNavKontorFilter ] = useState<string[]>([])

	const updateStatusFilter = (newFilter: string[]) => setStatusFilter(newFilter)
	const removeStatusFilter = (status: string) => removeFilter(status, statusFilter, setStatusFilter)

	const updateVeilederFilter = (newFilter: string[]) => setVeilederFilter(newFilter)
	const removeVeilederFilter = (status: string) => removeFilter(status, veilederFilter, setVeilederFilter)

	const updateMedveilederFilter = (newFilter: string[]) => setMedveilederFilter(newFilter)
	const removeMedveilederFilter = (status: string) => removeFilter(status, medveilederFilter, setMedveilederFilter)

	const updateNavKontorFilter = (newFilter: string[]) => setNavKontorFilter(newFilter)
	const removeNavKontorFilter = (status: string) => removeFilter(status, navKontorFilter, setNavKontorFilter)

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
		if (brukersMedveiledere.length === 0 && medveilederFilter.includes(HAR_IKKE_MEDVEILEDER_FILTER_TEKST))
			return true

		let retVal = false
		brukersMedveiledere.forEach((medveileder) => {
			if (medveilederFilter.includes(medveileder.ansattId)) retVal = true
		})

		return retVal
	}

	const matcherNavKontor = (brukersNavKontor: string | null) => {
		if (navKontorFilter.length === 0) return true
		if (brukersNavKontor === null) return false
		return navKontorFilter.includes(brukersNavKontor)
	}

	const filtrerDeltakerePaStatus = (deltakere: TiltakDeltaker[]): TiltakDeltaker[] => {
		return deltakere.filter((bruker) => matcherStatus(statusFilter, bruker.status.type))
	}

	const filtrerDeltakereMedHovedveileder = (deltakere: TiltakDeltaker[]): TiltakDeltaker[] => {
		return deltakere.filter((bruker) => matcherVeileder(getHovedveileder(bruker)))
	}

	const filtrerDeltakereMedMedveileder = (brukere: TiltakDeltaker[]): TiltakDeltaker[] => {
		return brukere.filter((bruker) => matcherMedveileder(getMedveiledere(bruker)))
	}

	const filtrerDeltakerePaNavKontor = (deltakere: TiltakDeltaker[]): TiltakDeltaker[] => {
		return deltakere.filter((bruker) => matcherNavKontor(bruker.navKontor))
	}

	const filtrerDeltakere = (deltakere: TiltakDeltaker[]): TiltakDeltaker[] => {
		return filtrerDeltakerePaaAltUtenom(FilterType.Ingen, deltakere)
	}

	const filtrerDeltakerePaaAltUtenom = (filterType: FilterType, deltakere: TiltakDeltaker[]) => {
		const filtrertPaStatus = filterType == FilterType.Status ? deltakere : filtrerDeltakerePaStatus(deltakere)
		const filtrertPaVeiledere =
			filterType === FilterType.Veileder ? filtrertPaStatus : filtrerDeltakereMedHovedveileder(filtrertPaStatus)
		const filtrertPaMedveileder =
			filterType == FilterType.Medveileder
				? filtrertPaVeiledere
				: filtrerDeltakereMedMedveileder(filtrertPaVeiledere)
		return filterType == FilterType.NavKontor
			? filtrertPaMedveileder
			: filtrerDeltakerePaNavKontor(filtrertPaMedveileder)
	}

	const fjernUgyldigeFilter = (deltakere: TiltakDeltaker[]) => {
		const gyldigVeilederFIlter = veilederFilter.filter((veileder) => {
			if (veileder === HAR_IKKE_VEILEDER_FILTER_TEKST) {
				return true
			}
			return deltakere.find((deltaker) => {
				const hovedveileder = getHovedveileder(deltaker)
				return hovedveileder?.ansattId === veileder
			})
		})
		setVeilederFilter(gyldigVeilederFIlter)

		const gyldigMedveilederFIlter = medveilederFilter.filter((medveileder) => {
			if (medveileder === HAR_IKKE_MEDVEILEDER_FILTER_TEKST) {
				return true
			}

			return deltakere.find((deltaker) => {
				const deltakersMedveiledere = getMedveiledere(deltaker)
				return deltakersMedveiledere.find(
					(deltakersMedveileder) => deltakersMedveileder.ansattId === medveileder
				)
			})
		})
		setMedveilederFilter(gyldigMedveilederFIlter)

		const gyldigNavKontorFIlter = navKontorFilter.filter((navKontor) =>
			deltakere.find((deltaker) => deltaker.navKontor === navKontor)
		)
		setNavKontorFilter(gyldigNavKontorFIlter)

		const gyldigStatusFIlter = statusFilter.filter((status) =>
			deltakere.find((deltaker) => deltaker.status.type === status)
		)
		setStatusFilter(gyldigStatusFIlter)
	}

	return {
		veilederFilter,
		updateVeilederFilter,
		removeVeilederFilter,
		medveilederFilter,
		updateMedveilederFilter,
		removeMedveilederFilter,
		statusFilter,
		updateStatusFilter,
		removeStatusFilter,
		navKontorFilter,
		updateNavKontorFilter,
		removeNavKontorFilter,
		filtrerDeltakere,
		filtrerDeltakerePaaAltUtenom,
		fjernUgyldigeFilter
	}
})
