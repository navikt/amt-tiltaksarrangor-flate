import React, { ReactElement, useEffect, useState } from 'react'
import { VeiledersDeltaker } from '../../../../api/data/deltaker'
import { FiltermenyDataEntry } from '../../../felles/table-filter/filtermeny-data-entry'
import { useVeilederFilterMenyStore } from '../store/veileder-filter-meny-store-provider'
import { FilterMeny } from '../../../felles/table-filter/FilterMeny'
import globalStyles from '../../../../globals.module.scss'

interface Props {
    deltakere: VeiledersDeltaker[]
}

export const FilterMenyDeltakerliste = (props: Props): ReactElement => {
	const [ deltakerlister, setDeltakerlister ] = useState<FiltermenyDataEntry[]>([])
	const { deltakerlisteFilter, addDeltakerlisteFilter, removeDeltakerlisteFilter, statusFilter, veiledertypeFilter, filtrerDeltakere } = useVeilederFilterMenyStore()

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
		filtrerDeltakere(props.deltakere).forEach((deltaker: VeiledersDeltaker) => {
			const deltakerliste = deltaker.deltakerliste

			const entry = data.get(deltakerliste.navn)

			data.set(deltakerliste.navn, {
				id: deltakerliste.navn,
				displayName: deltakerliste.navn,
				antallDeltakere: entry ? entry.antallDeltakere + 1 : 1
			})
		})

		setDeltakerlister([ ...data.values() ])
	}, [ props.deltakere, statusFilter, veiledertypeFilter, filtrerDeltakere ])

	return (
		<FilterMeny
			navn="Deltakerliste"
			data={deltakerlister}
			className={globalStyles.blokkXs}
			filter={deltakerlisteFilter}
			addFilter={addDeltakerlisteFilter}
			removeFilter={removeDeltakerlisteFilter}
			isExpandedDefaultValue={true}
		/>
	)
}
