import { VeiledersDeltaker } from '../../../../api/data/deltaker'
import React, { useEffect, useState } from 'react'
import { FiltermenyDataEntry } from '../../../felles/table-filter/filtermeny-data-entry'
import { mapTiltakDeltakerStatusTilTekst } from '../../../../utils/text-mappers'
import { klikkFilterMeny, loggKlikk } from '../../../../utils/amplitude-utils'
import { FilterMeny } from '../../../felles/table-filter/FilterMeny'
import globalStyles from '../../../../globals.module.scss'
import { useVeilederTableFilterStore } from '../store/veileder-table-filter-store'

interface Props {
	deltakere: VeiledersDeltaker[]
}

export const VeilederFiltermenyStatus = (props: Props): React.ReactElement => {
	const [ deltakerePerStatus, setDeltakerePerStatus ] = useState<FiltermenyDataEntry[]>([])

	const {
		statusFilter,
		veiledertypeFilter,
		deltakerlisteFilter,
		setStatusFilter,
		filtrerDeltakerePaDeltakerliste,
		filtrerDeltakerePaVeiledertype
	} = useVeilederTableFilterStore()

	const createInitialDataMap = (deltakere: VeiledersDeltaker[]): Map<string, FiltermenyDataEntry> => {
		const dataMap = new Map<string, FiltermenyDataEntry>()
		deltakere.forEach((deltaker) => {
			const status = deltaker.status.type
			const statusTekst = mapTiltakDeltakerStatusTilTekst(status)
			dataMap.set(statusTekst, {
				id: status,
				displayName: statusTekst,
				antallDeltakere: 0
			})
		})

		return dataMap
	}

	useEffect(() => {
		const statusMap = createInitialDataMap(props.deltakere)

		const filtrerDeltakere = (deltakere: VeiledersDeltaker[]): VeiledersDeltaker[] => {
			const filtrertPaDeltakerliste = filtrerDeltakerePaDeltakerliste(deltakere)
			return filtrerDeltakerePaVeiledertype(filtrertPaDeltakerliste)
		}

		filtrerDeltakere(props.deltakere).forEach((deltaker: VeiledersDeltaker) => {
			const status = deltaker.status.type
			const statusTekst = mapTiltakDeltakerStatusTilTekst(status)
			const entry = statusMap.get(statusTekst)

			statusMap.set(statusTekst, {
				id: status,
				displayName: statusTekst,
				antallDeltakere: entry ? entry.antallDeltakere + 1 : 1
			})
		})

		setDeltakerePerStatus([ ...statusMap.values() ])
	}, [ props.deltakere, veiledertypeFilter, deltakerlisteFilter, filtrerDeltakerePaDeltakerliste, filtrerDeltakerePaVeiledertype ])

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