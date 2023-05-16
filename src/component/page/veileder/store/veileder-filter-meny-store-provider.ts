import constate from 'constate'
import { useState } from 'react'
import { VeiledersDeltaker } from '../../../../api/data/deltaker'
import { tilVeiledertype } from '../../../../utils/deltakerliste-utils'
import { Veiledertype } from '../../../../api/data/veileder'

export enum FilterType {
	Ingen, Status, VeilederType, Deltakerliste
}
export const [ VeilederFilterMenyStoreProvider, useVeilederFilterMenyStore ] = constate(() => {
	const [ statusFilter, setStatusFilter ] = useState<string[]>([])
	const [ deltakerlisteFilter, setDeltakerlisteFilter ] = useState<string[]>([])
	const [ veiledertypeFilter, setVeiledertypeFilter ] = useState<string[]>([ Veiledertype.VEILEDER ])

	const addStatusFilter = (status: string) => addFilter(status, statusFilter, setStatusFilter)

	const removeStatusFilter = (status: string) => removeFilter(status, statusFilter, setStatusFilter)

	const addVeilederTypeFilter = (status: string) => addFilter(status, veiledertypeFilter, setVeiledertypeFilter)

	const removeVeilederTypeFilter = (status: string) => removeFilter(status, veiledertypeFilter, setVeiledertypeFilter)

	const addDeltakerlisteFilter = (status: string) => addFilter(status, deltakerlisteFilter, setDeltakerlisteFilter)

	const removeDeltakerlisteFilter = (status: string) => removeFilter(status, deltakerlisteFilter, setDeltakerlisteFilter)

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

	const matcherVeiledertype = (veiledertype: Veiledertype) => {
		if (veiledertypeFilter.length === 0) return true
		return veiledertypeFilter.includes(veiledertype)
	}

	const matcherDeltakerliste = (deltakerliste: string) => {
		if (deltakerlisteFilter.length === 0) return true
		return deltakerlisteFilter.includes(deltakerliste)
	}

	const filtrerDeltakerePaStatus = (deltakere: VeiledersDeltaker[]): VeiledersDeltaker[] => {
		return deltakere.filter(bruker => matcherStatus(statusFilter, bruker.status.type))
	}

	const filtrerDeltakerePaDeltakerliste = (deltakere: VeiledersDeltaker[]): VeiledersDeltaker[] => {
		return deltakere.filter(bruker => matcherDeltakerliste(bruker.deltakerliste.navn))
	}

	const filtrerDeltakerePaVeiledertype = (deltakere: VeiledersDeltaker[]): VeiledersDeltaker[] => {
		return deltakere.filter(bruker => matcherVeiledertype(tilVeiledertype(bruker.veiledertype === Veiledertype.MEDVEILEDER)))
	}

	const filtrerDeltakere = (deltakere: VeiledersDeltaker[]): VeiledersDeltaker[] => {
		return filtrerDeltakerePaaAltUtenom(FilterType.Ingen, deltakere)
	}

	const filtrerDeltakerePaaAltUtenom = (filterType: FilterType, deltakere: VeiledersDeltaker[]) => {
		const filtrertPaStatus = filterType == FilterType.Status? deltakere: filtrerDeltakerePaStatus(deltakere)
		const filtrertPaVeiledertype = filterType == FilterType.VeilederType? filtrertPaStatus: filtrerDeltakerePaVeiledertype(filtrertPaStatus)
		return filterType == FilterType.Deltakerliste? filtrertPaVeiledertype: filtrerDeltakerePaDeltakerliste(filtrertPaVeiledertype)
	}

	return {
		statusFilter,
		addStatusFilter,
		removeStatusFilter,
		veiledertypeFilter,
		addVeilederTypeFilter,
		removeVeilederTypeFilter,
		deltakerlisteFilter,
		addDeltakerlisteFilter,
		removeDeltakerlisteFilter,
		filtrerDeltakere,
		filtrerDeltakerePaaAltUtenom
	}

})
