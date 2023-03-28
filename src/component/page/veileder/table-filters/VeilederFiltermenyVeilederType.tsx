import { VeiledersDeltaker } from '../../../../api/data/deltaker'
import React, { useEffect, useState } from 'react'
import { FiltermenyDataEntry } from '../../../felles/table-filter/filtermeny-data-entry'
import { useVeilederTableFilterStore } from '../store/veileder-table-filter-store'
import { Veiledertype } from '../Veiledertype'
import { tilVeiledertype } from '../../../../utils/deltakerliste-utils'
import { klikkFilterMeny, loggKlikk } from '../../../../utils/amplitude-utils'
import globalStyles from '../../../../globals.module.scss'
import { FilterMeny } from '../../../felles/table-filter/FilterMeny'

interface Props {
    deltakere: VeiledersDeltaker[]
}

export const VeilederFiltermenyVeilederType = (props: Props): React.ReactElement => {
	const [ deltakerePerVeiledertype, setDeltakerePerVeiledertype ] = useState<FiltermenyDataEntry[]>([])
	const { veiledertypeFilter, setVeiledertypeFilter } = useVeilederTableFilterStore()
	const displayName = (veilederType: Veiledertype): string => {
		if(veilederType === Veiledertype.MEDVEILEDER) {
			return 'Medveileder'
		} else {
			return 'Veileder'
		}
	}

	useEffect(() => {
		const data = new Map<string, FiltermenyDataEntry>()
		props.deltakere.forEach((deltaker: VeiledersDeltaker) => {
			const veilederType = tilVeiledertype(deltaker.erMedveilederFor)
			const entry = data.get(veilederType)
			data.set(veilederType, {
				id: veilederType,
				displayName: displayName(veilederType),
				entries: entry ? entry.entries + 1 : 1
			})
		})

		setDeltakerePerVeiledertype([ ...data.values() ])
	}, [ props.deltakere ])

	const leggTil = (veiledertype: string) => {
		setVeiledertypeFilter((prev) => {
			if(prev.includes(veiledertype)) {
				return prev
			}
			return [ ...prev, veiledertype ]
		})
		loggKlikk(klikkFilterMeny, veiledertype, 'checked')
	}

	const fjern = (veiledertype: string) => {
		setVeiledertypeFilter((prev) => {
			return prev.filter((v) => v !== veiledertype)
		})
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
