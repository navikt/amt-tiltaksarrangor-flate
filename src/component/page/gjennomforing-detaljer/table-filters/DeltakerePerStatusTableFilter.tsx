import { TiltakDeltaker } from '../../../../api/data/deltaker'
import React, { useEffect, useState } from 'react'
import { useKoordinatorTableFilterStore } from '../store/koordinator-table-filter-store'
import globalStyles from '../../../../globals.module.scss'
import { FilterMeny } from '../../../felles/table-filter/FilterMeny'
import { mapTiltakDeltagerStatusTilTekst } from '../../../../utils/text-mappers'
import { FiltermenyDataEntry } from '../../../felles/table-filter/filtermeny-data-entry'
import { klikkFilterMeny, loggKlikk } from '../../../../utils/amplitude-utils'

interface Props {
	deltakere: TiltakDeltaker[]
}

export const DeltakerePerStatusTableFilter = (props: Props): React.ReactElement => {
	const [ deltakerePerStatus, setDeltakerePerStatus ] = useState<FiltermenyDataEntry[]>([])

	const {
		statusFilter,
		setStatusFilter,
		medveilederFilter,
		veilederFilter,
		filtrerBrukerePaMedHovedveileder,
		filtrerBrukerePaMedveileder
	} = useKoordinatorTableFilterStore()

	const createInitialDataMap = (deltakere: TiltakDeltaker[]): Map<string, FiltermenyDataEntry> => {
		const dataMap = new Map<string, FiltermenyDataEntry>()

		deltakere.forEach((deltaker) => {
			const status = deltaker.status.type
			const statusTekst = mapTiltakDeltagerStatusTilTekst(status)
			dataMap.set(statusTekst, {
				id: status,
				displayName: statusTekst,
				entries: 0
			})
		})

		return dataMap
	}

	const filtrerDeltakere = (deltakere: TiltakDeltaker[]): TiltakDeltaker[] => {
		const filtrertPaHovedveileder = filtrerBrukerePaMedHovedveileder(deltakere)
		return filtrerBrukerePaMedveileder(filtrertPaHovedveileder)
	}

	useEffect(() => {
		const statusMap = createInitialDataMap(props.deltakere)

		filtrerDeltakere(props.deltakere).forEach((deltaker: TiltakDeltaker) => {
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
	}, [ props.deltakere, medveilederFilter, veilederFilter ])

	const leggTil = (status: string) => {
		setStatusFilter((prev) => {
			if (prev.includes(status)) {
				return prev
			}
			return [ ...prev, status ]
		})
		loggKlikk(klikkFilterMeny, status, 'checked')
	}

	const fjern = (status: string) => {
		setStatusFilter((prev) => {
			return prev.filter((v) => v !== status)
		})
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
		/>
	)
}
