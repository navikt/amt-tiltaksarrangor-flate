import React, { ReactElement, useEffect, useState } from 'react'
import { VeiledersDeltaker } from '../../../../api/data/deltaker'
import { FiltermenyDataEntry } from '../../../felles/table-filter/filtermeny-data-entry'
import { FilterType, useVeilederFilterMenyStore } from '../store/veileder-filter-meny-store-provider'
import { FilterMeny } from '../../../felles/table-filter/FilterMeny'
import globalStyles from '../../../../globals.module.scss'
import useLocalStorage from '../../../../hooks/useLocalStorage'

interface Props {
    deltakere: VeiledersDeltaker[]
}

export const FilterMenyDeltakerliste = (props: Props): ReactElement => {
	const [ deltakerlister, setDeltakerlister ] = useState<FiltermenyDataEntry[]>([])
	const [ filterOpen, setFilterOpen ] = useLocalStorage('filter-veileder-deltakerliste', true)

	const {
		deltakerlisteFilter,
		updateDeltakerlisteFilter,
		statusFilter,
		veiledertypeFilter,
		filtrerDeltakere,
		filtrerDeltakerePaaAltUtenom
	} = useVeilederFilterMenyStore()

	const createInitialDataMap = (deltakere: VeiledersDeltaker[]): Map<string, FiltermenyDataEntry> => {
		const dataMap = new Map<string, FiltermenyDataEntry>()

		deltakere.forEach((deltaker) => {
			const deltakerliste = deltaker.deltakerliste
			dataMap.set(deltakerliste.navn, {
				id: deltakerliste.navn,
				displayName: deltakerliste.navn,
				antallDeltakere: 0
			})
		})

		return dataMap
	}

	useEffect(() => {
		const data = createInitialDataMap(props.deltakere)

		filtrerDeltakerePaaAltUtenom(FilterType.Deltakerliste, props.deltakere).forEach((deltaker: VeiledersDeltaker) => {
			const deltakerliste = deltaker.deltakerliste

			const entry = data.get(deltakerliste.navn)

			data.set(deltakerliste.navn, {
				id: deltakerliste.navn,
				displayName: deltakerliste.navn,
				antallDeltakere: entry ? entry.antallDeltakere + 1 : 1
			})
		})

		setDeltakerlister([ ...data.values() ])
	}, [ props.deltakere, statusFilter, veiledertypeFilter, filtrerDeltakere, filtrerDeltakerePaaAltUtenom ])

	return (
		<FilterMeny
			navn="Deltakerliste"
			data={deltakerlister}
			className={globalStyles.blokkXs}
			filter={deltakerlisteFilter}
			open={filterOpen}
			onToggle={() => {setFilterOpen( !filterOpen )}}
			updateFilter={updateDeltakerlisteFilter}
		/>
	)
}
