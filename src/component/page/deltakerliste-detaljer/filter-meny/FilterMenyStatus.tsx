import {
	IndividuellDeltakerStatus, KursDeltakerStatuser,
	TiltakDeltaker,
} from '../../../../api/data/deltaker'
import React, { useCallback, useEffect, useState } from 'react'
import { useKoordinatorFilterMenyStore } from '../store/koordinator-filter-meny-store-provider'
import globalStyles from '../../../../globals.module.scss'
import { FilterMeny } from '../../../felles/table-filter/FilterMeny'
import { mapTiltakDeltakerStatusTilTekst } from '../../../../utils/text-mappers'
import { FiltermenyDataEntry } from '../../../felles/table-filter/filtermeny-data-entry'
import { klikkFilterMeny, loggKlikk } from '../../../../utils/amplitude-utils'

interface Props {
	deltakere: TiltakDeltaker[]
	erKurs: boolean
}

export const FilterMenyStatus = (props: Props): React.ReactElement => {
	const [ deltakerePerStatus, setDeltakerePerStatus ] = useState<FiltermenyDataEntry[]>([])

	const {
		statusFilter,
		addStatusFilter,
		removeStatusFilter,
		medveilederFilter,
		veilederFilter,
		filtrerDeltakere
	} = useKoordinatorFilterMenyStore()

	const createInitialDataMap = useCallback((): Map<string, FiltermenyDataEntry> => {
		const dataMap = new Map<string, FiltermenyDataEntry>()
		const statuser = props.erKurs? KursDeltakerStatuser : IndividuellDeltakerStatus

		Object.keys(statuser).forEach(status => {
			const tekst = mapTiltakDeltakerStatusTilTekst(status)

			dataMap.set(status, {
				id: status,
				displayName: tekst,
				antallDeltakere: 0
			})
		})
		return dataMap
	}, [ props.erKurs ])

	useEffect(() => {
		const statusMap = createInitialDataMap()

		filtrerDeltakere(props.deltakere).forEach((deltaker: TiltakDeltaker) => {
			const status = deltaker.status.type
			const entry = statusMap.get(status)

			statusMap.set(status, {
				id: status,
				displayName: entry ? entry.displayName: '',
				antallDeltakere: entry ? entry.antallDeltakere + 1 : 1
			})
		})

		setDeltakerePerStatus([ ...statusMap.values() ])
	}, [ props.deltakere, medveilederFilter, veilederFilter, filtrerDeltakere, createInitialDataMap ])

	const leggTil = (status: string) => {
		addStatusFilter(status)
		loggKlikk(klikkFilterMeny, status, 'checked')
	}

	const fjern = (status: string) => {
		removeStatusFilter(status)
		loggKlikk(klikkFilterMeny, status, 'unchecked')
	}

	return (
		<FilterMeny
			navn="Status"
			data={deltakerePerStatus}
			className={globalStyles.blokkXs}
			filter={statusFilter}
			addFilter={leggTil}
			removeFilter={fjern}
			isExpandedDefaultValue={true}
		/>
	)
}
