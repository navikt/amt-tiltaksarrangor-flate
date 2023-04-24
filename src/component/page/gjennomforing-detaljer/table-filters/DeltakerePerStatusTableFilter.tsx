import {
	IndividuellDeltakerStatus, KursDeltakerStatuser,
	TiltakDeltaker,
} from '../../../../api/data/deltaker'
import React, { useEffect, useState } from 'react'
import { useKoordinatorTableFilterStore } from '../store/koordinator-table-filter-store'
import globalStyles from '../../../../globals.module.scss'
import { FilterMeny } from '../../../felles/table-filter/FilterMeny'
import { mapTiltakDeltakerStatusTilTekst } from '../../../../utils/text-mappers'
import { FiltermenyDataEntry } from '../../../felles/table-filter/filtermeny-data-entry'
import { klikkFilterMeny, loggKlikk } from '../../../../utils/amplitude-utils'

interface Props {
	deltakere: TiltakDeltaker[]
	erKurs: boolean
}

export const DeltakerePerStatusTableFilter = (props: Props): React.ReactElement => {
	const [ deltakerePerStatus, setDeltakerePerStatus ] = useState<FiltermenyDataEntry[]>([])

	const {
		statusFilter,
		setStatusFilter,
		medveilederFilter,
		veilederFilter,
		filtrerBrukerePaMedHovedveileder: filtrerBrukerePaHovedveileder,
		filtrerBrukerePaMedveileder
	} = useKoordinatorTableFilterStore()

	const createInitialDataMap = (): Map<string, FiltermenyDataEntry> => {
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
	}

	useEffect(() => {
		const filtrerDeltakere = (deltakere: TiltakDeltaker[]): TiltakDeltaker[] => {
			const filtrertPaHovedveileder = filtrerBrukerePaHovedveileder(deltakere)
			return filtrerBrukerePaMedveileder(filtrertPaHovedveileder)
		}

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
	}, [ props.deltakere, medveilederFilter, veilederFilter, filtrerBrukerePaHovedveileder, filtrerBrukerePaMedveileder ])

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
