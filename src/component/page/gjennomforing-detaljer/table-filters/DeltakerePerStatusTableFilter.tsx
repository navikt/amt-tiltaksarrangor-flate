import { TiltakDeltaker, TiltakDeltakerStatus } from '../../../../api/data/deltaker'
import React, { useEffect, useState } from 'react'
import { useKoordinatorTableFilterStore } from '../store/koordinator-table-filter-store'
import globalStyles from '../../../../globals.module.scss'
import { FilterMeny } from '../../../felles/table-filter/FilterMeny'
import { mapTiltakDeltagerStatusTilTekst } from '../../../../utils/text-mappers'
import { FiltermenyDataEntry } from '../../../felles/table-filter/filtermeny-data-entry'

interface Props {
    deltakere: TiltakDeltaker[]
}

export const DeltakerePerStatusTableFilter = (props: Props): React.ReactElement => {
	const [ deltakerePerStatus, setDeltakerePerStatus ] = useState<FiltermenyDataEntry[]>([])

	const { statusFilter, setStatusFilter } = useKoordinatorTableFilterStore()

	useEffect(() => {
		const statusMap = new Map<string, FiltermenyDataEntry>()
		props.deltakere.forEach((deltaker: TiltakDeltaker) => {
			const status = deltaker.status.type
			const statusTekst = mapTiltakDeltagerStatusTilTekst(status)
			const entry = statusMap.get(statusTekst)

			statusMap.set(statusTekst, {
				id: status,
				displayName: statusTekst,
				entries: entry ? entry.entries + 1 : 1
			})
		})

		setDeltakerePerStatus([ ...statusMap.values() ])
	}, [ props.deltakere ])

	const leggTilStatus = (status: string) => {
		setStatusFilter((prev) => {
			if (prev.includes(status)) {
				return prev
			}
			return [ ...prev, status ]
		})
	}

	const fjernStatus = (status: string) => {
		setStatusFilter((prev) => {
			return prev.filter((v) => v !== status)
		})
	}

	return (
		<FilterMeny
			navn="Status"
			data={deltakerePerStatus}
			className={globalStyles.blokkXs}
			filter={statusFilter}
			addFilter={leggTilStatus}
			removeFilter={fjernStatus}
		/>
	)
}
