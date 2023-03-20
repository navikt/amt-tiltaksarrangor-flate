import { TiltakDeltaker } from '../../../../api/data/deltaker'
import React, { useEffect, useState } from 'react'
import { useKoordinatorTableFilterStore } from '../store/koordinator-table-filter-store'
import globalStyles from '../../../../globals.module.scss'
import { TableFilter } from '../../../felles/table-filter/TableFilter'
import { getMedveiledereNavn, HAR_IKKE_MEDVEILEDER_VILER_TEKST } from '../../../../utils/veileder-utils'

interface Props {
    deltakere: TiltakDeltaker[]
}

export const DeltakerePerMedveilederTableFilter = (props: Props): React.ReactElement => {
	const [ deltakerePerMedveileder, setDeltarerePerMedveileder ] = useState<Map<string, number>>(new Map())

	const { medveilederFilter, setMedveilederFilter } = useKoordinatorTableFilterStore()

	useEffect(() => {
		const map = new Map<string, number>()
		map.set(HAR_IKKE_MEDVEILEDER_VILER_TEKST, 0)

		props.deltakere.forEach((deltaker) => {
			getMedveiledereNavn(deltaker).forEach(it => {
				const entry = map.get(it)
				map.set(it, entry ? entry + 1 : 1)
			})

		})

		setDeltarerePerMedveileder(map)
	}, [ props.deltakere ])

	const leggTilMedveileder = (veileder: string) => {
		setMedveilederFilter((prev) => {
			if (prev.includes(veileder)) {
				return prev
			}
			return [ ...prev, veileder ]
		})
	}

	const fjernMedveileder = (veileder: string) => {
		setMedveilederFilter((prev) => {
			return prev.filter((v) => v !== veileder)
		})
	}

	return (
		<TableFilter
			navn="Medveileder"
			dataMap={deltakerePerMedveileder}
			className={globalStyles.blokkXs}
			filter={medveilederFilter}
			addFilter={leggTilMedveileder}
			removeFilter={fjernMedveileder}
		/>
	)
}
