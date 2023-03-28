import constate from 'constate'
import { useState } from 'react'
import { VeiledersDeltaker } from '../../../../api/data/deltaker'
import { Veiledertype } from '../Veiledertype'
import { tilVeiledertype } from '../../../../utils/deltakerliste-utils'

export const [VeilederTableFilterStore, useVeilederTableFilterStore] = constate(() => {
	const [statusFilter, setStatusFilter] = useState<string[]>([])
	const [deltakerlisteFilter, setDeltakerlisteFilter] = useState<string[]>([])
	const [veiledertypeFilter, setVeiledertypeFilter] = useState<string[]>([Veiledertype.VEILEDER])

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

	const filtrerDeltakerePaStatus = (brukere: VeiledersDeltaker[]): VeiledersDeltaker[] => {
		return brukere.filter(bruker => matcherStatus(statusFilter, bruker.status.type))
	}

	const filtrerDeltakerePaDeltakerliste = (brukere: VeiledersDeltaker[]): VeiledersDeltaker[] => {
		return brukere.filter(bruker => matcherDeltakerliste(bruker.deltakerliste.navn))
	}

	const filtrerDeltakerePaVeiledertype = (brukere: VeiledersDeltaker[]): VeiledersDeltaker[] => {
		return brukere.filter(bruker => matcherVeiledertype(tilVeiledertype(bruker.erMedveilederFor)))
	}

	const filtrerDeltakere = (deltakere: VeiledersDeltaker[]): VeiledersDeltaker[] => {
		const filtrertPaStatus = filtrerDeltakerePaStatus(deltakere)
		const filtrertPaVeiledertype = filtrerDeltakerePaVeiledertype(filtrertPaStatus)
		const filtrertPaDeltakerliste = filtrerDeltakerePaDeltakerliste(filtrertPaVeiledertype)
		return filtrertPaDeltakerliste
	}

	return {
		statusFilter,
		setStatusFilter,
		veiledertypeFilter,
		setVeiledertypeFilter,
		deltakerlisteFilter,
		setDeltakerlisteFilter,
		filtrerDeltakerePaStatus,
		filtrerDeltakerePaVeiledertype,
		filtrerDeltakerePaDeltakerliste,
		filtrerDeltakere
	}

})
