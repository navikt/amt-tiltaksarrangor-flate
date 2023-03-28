import React, { ReactElement, useEffect, useState } from 'react'
import { VeiledersDeltaker } from '../../../../api/data/deltaker'
import { FiltermenyDataEntry } from '../../../felles/table-filter/filtermeny-data-entry'
import { useVeilederTableFilterStore } from '../store/veileder-table-filter-store'
import { FilterMeny } from '../../../felles/table-filter/FilterMeny'
import globalStyles from '../../../../globals.module.scss'

interface Props {
    deltakere: VeiledersDeltaker[]
}

export const VeilederFiltermenyDeltakerliste = (props: Props): ReactElement => {
	const [ deltakerlister, setDeltakerlister ] = useState<FiltermenyDataEntry[]>([])
	const { deltakerlisteFilter, setDeltakerlisteFilter } = useVeilederTableFilterStore()

	useEffect(() => {
		const data = new Map<string, FiltermenyDataEntry>()
		props.deltakere.forEach((deltaker: VeiledersDeltaker) => {
			const deltakerliste = deltaker.deltakerliste

			const entry = data.get(deltakerliste.navn)

			data.set(deltakerliste.navn, {
				id: deltakerliste.navn,
				displayName: deltakerliste.navn,
				entries: entry ? entry.entries + 1 : 1
			})
		})

		setDeltakerlister([ ...data.values() ])
	}, [ props.deltakere ])


	const leggTil = (deltakerliste: string) => {
		setDeltakerlisteFilter((prev) => {
			if (prev.includes(deltakerliste)) {
				return prev
			}
			return [ ...prev, deltakerliste ]
		})
	}

	const fjern = (deltakerliste: string) => {
		setDeltakerlisteFilter((prev) => {
			return prev.filter((v) => v !== deltakerliste)
		})
	}

	return (
		<FilterMeny
			navn="Deltakerliste"
			data={deltakerlister}
			className={globalStyles.blokkXs}
			filter={deltakerlisteFilter}
			addFilter={leggTil}
			removeFilter={fjern}
		/>
	)
}
