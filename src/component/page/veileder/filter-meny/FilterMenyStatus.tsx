import { IndividuellDeltakerStatus, KursDeltakerStatuser, VeiledersDeltaker } from '../../../../api/data/deltaker'
import React, { useEffect, useState } from 'react'
import { FiltermenyDataEntry } from '../../../felles/table-filter/filtermeny-data-entry'
import { mapTiltakDeltakerStatusTilTekst } from '../../../../utils/text-mappers'
import { klikkFilterMeny, loggKlikk } from '../../../../utils/amplitude-utils'
import { FilterMeny } from '../../../felles/table-filter/FilterMeny'
import globalStyles from '../../../../globals.module.scss'
import { useVeilederFilterMenyStore } from '../store/veileder-filter-meny-store-provider'

interface Props {
	deltakere: VeiledersDeltaker[]
}

export const FilterMenyStatus = (props: Props): React.ReactElement => {
	const [ deltakerePerStatus, setDeltakerePerStatus ] = useState<FiltermenyDataEntry[]>([])

	const {
		statusFilter,
		addStatusFilter,
		removeStatusFilter,
		filtrerDeltakere
	} = useVeilederFilterMenyStore()

	useEffect(() => {
		const statuser = { ...KursDeltakerStatuser, ...IndividuellDeltakerStatus }
		const deltakereFiltrert = filtrerDeltakere(props.deltakere)

		const statusMap =  Object.keys(statuser).reduce((list: Map<string, FiltermenyDataEntry>, status: string) => {
			const antallDeltakereTotalt = props.deltakere.filter(deltaker => deltaker.status.type === status).length
			const antallDeltakereFiltrert = deltakereFiltrert.filter(deltaker => deltaker.status.type === status).length
			return antallDeltakereTotalt == 0? list: list.set(status, {
				id: status,
				displayName: mapTiltakDeltakerStatusTilTekst(status),
				antallDeltakere: antallDeltakereFiltrert
			})}, new Map<string, FiltermenyDataEntry>())

		setDeltakerePerStatus([ ...statusMap.values() ])
	}, [ props.deltakere, filtrerDeltakere ])

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
		/>
	)
}