import { TiltakDeltaker } from '../../../../api/data/deltaker'
import globalStyles from '../../../../globals.module.scss'
import { TableFilter } from '../../../felles/table-filter/TableFilter'
import React, { useEffect, useState } from 'react'
import { useKoordinatorTableFilterStore } from '../store/koordinator-table-filter-store'
import { getHovedveilederNavn, HAR_IKKE_VEILEDER_FILTER_TEKST } from '../../../../utils/veileder-utils'

interface Props {
	deltakere: TiltakDeltaker[]
}

export const DeltakerePerVeilederTableFilter = (props: Props): React.ReactElement => {
	const [ deltakerePerVeileder, setDeltakerePerVeileder ] = useState<Map<string, number>>(new Map())

	const { veilederFilter, setVeilederFilter } = useKoordinatorTableFilterStore()

	useEffect(() => {
		const map = new Map<string, number>()
		map.set(HAR_IKKE_VEILEDER_FILTER_TEKST, 0)

		props.deltakere.forEach((deltaker) => {
			const hovedveilederNavn = getHovedveilederNavn(deltaker)
			const entry = map.get(hovedveilederNavn)
			map.set(hovedveilederNavn, entry ? entry + 1 : 1)
		})

		setDeltakerePerVeileder(map)
	}, [ props.deltakere ])

	const leggTilVeileder = (veileder: string) => {
		setVeilederFilter((prev) => {
			if (prev.includes(veileder)) {
				return prev
			}
			return [ ...prev, veileder ]
		})
	}

	const fjernVeileder = (veileder: string) => {
		setVeilederFilter((prev) => {
			return prev.filter((v) => v !== veileder)
		})
	}

	return (
		<TableFilter
			navn="Veileder"
			dataMap={deltakerePerVeileder}
			className={globalStyles.blokkXs}
			filter={veilederFilter}
			addFilter={leggTilVeileder}
			removeFilter={fjernVeileder}
		/>
	)
}
