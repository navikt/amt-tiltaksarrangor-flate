import { VeiledersDeltaker } from '../../../../api/data/deltaker'
import React, { useEffect, useState } from 'react'
import { FiltermenyDataEntry } from '../../../felles/table-filter/filtermeny-data-entry'
import { useVeilederTableFilterStore } from '../store/veileder-table-filter-store'
import { tilVeiledertype } from '../../../../utils/deltakerliste-utils'
import { klikkFilterMeny, loggKlikk } from '../../../../utils/amplitude-utils'
import globalStyles from '../../../../globals.module.scss'
import { FilterMeny } from '../../../felles/table-filter/FilterMeny'
import { Veiledertype } from '../../../../api/data/veileder'

interface Props {
	deltakere: VeiledersDeltaker[]
}

export const FilterMenyVeilederType = (props: Props): React.ReactElement => {
	const [ deltakerePerVeiledertype, setDeltakerePerVeiledertype ] = useState<FiltermenyDataEntry[]>([])
	const {
		veiledertypeFilter,
		addVeilederTypeFilter,
		removeVeilederTypeFilter,
		statusFilter,
		deltakerlisteFilter,
		filtrerDeltakerePaDeltakerliste,
		filtrerDeltakerePaStatus
	} = useVeilederTableFilterStore()

	useEffect(() => {
		const createInitialDataMap = (deltakere: VeiledersDeltaker[]): Map<string, FiltermenyDataEntry> => {
			const dataMap = new Map<string, FiltermenyDataEntry>()
			deltakere.forEach((deltaker) => {
				const veilederType = tilVeiledertype(deltaker.veiledertype === Veiledertype.MEDVEILEDER)
				dataMap.set(veilederType, {
					id: veilederType,
					displayName: displayName(veilederType),
					antallDeltakere: 0
				})
			})

			return dataMap
		}

		const displayName = (veilederType: Veiledertype): string => {
			if (veilederType === Veiledertype.MEDVEILEDER) {
				return 'Medveileder'
			} else {
				return 'Veileder'
			}
		}

		const filtrerDeltakere = (deltakere: VeiledersDeltaker[]): VeiledersDeltaker[] => {
			const filtrertPaStatus = filtrerDeltakerePaStatus(deltakere)
			return filtrerDeltakerePaDeltakerliste(filtrertPaStatus)
		}

		const data = createInitialDataMap(props.deltakere)
		filtrerDeltakere(props.deltakere).forEach((deltaker: VeiledersDeltaker) => {
			const veilederType = tilVeiledertype(deltaker.veiledertype === Veiledertype.MEDVEILEDER)
			const entry = data.get(veilederType)
			data.set(veilederType, {
				id: veilederType,
				displayName: displayName(veilederType),
				antallDeltakere: entry ? entry.antallDeltakere + 1 : 1
			})
		})

		setDeltakerePerVeiledertype([ ...data.values() ])
	}, [ props.deltakere, statusFilter, deltakerlisteFilter, filtrerDeltakerePaDeltakerliste, filtrerDeltakerePaStatus ])

	const leggTil = (veiledertype: string) => {
		addVeilederTypeFilter(veiledertype)
		loggKlikk(klikkFilterMeny, veiledertype, 'checked')
	}

	const fjern = (veiledertype: string) => {
		removeVeilederTypeFilter(veiledertype)
		loggKlikk(klikkFilterMeny, veiledertype, 'unchecked')
	}

	return (
		<FilterMeny
			navn="Type veileder"
			data={deltakerePerVeiledertype}
			className={globalStyles.blokkXs}
			filter={veiledertypeFilter}
			addFilter={leggTil}
			removeFilter={fjern}
		/>
	)
}
