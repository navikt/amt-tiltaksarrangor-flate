import { nameString } from '../../../../utils/name-utls'
import { TiltakDeltaker } from '../../../../api/data/deltaker'
import globalStyles from '../../../../globals.module.scss'
import { TableFilter } from '../../../felles/table-filter/TableFilter'
import React, { useEffect, useState } from 'react'
import { useKoordinatorTableFilterStore } from '../store/koordinator-table-filter-store'

interface Props {
    deltakere: TiltakDeltaker[]
}

export const DeltakerePerVeilederTableFilter = (props: Props): React.ReactElement => {
	const [ deltakerePerVeileder, setDeltakerePerVeileder ] = useState<Map<string, number>>(new Map())

	const { veilederFilter, leggTilVeileder, fjernVeileder } = useKoordinatorTableFilterStore()

	useEffect(() => {
		const map = new Map<string, number>()
		map.set('Uten Veileder', 0)

		props.deltakere.forEach((deltaker) => {
			const veileder = deltaker.aktiveVeiledere.filter((t) => !t.erMedveileder)[0]
			if (veileder === undefined) {
				const entry = map.get('Uten Veileder')
				map.set('Uten Veileder', entry ? entry + 1 : 1)
			} else {
				const veilederNavn = nameString(veileder.fornavn, veileder.mellomnavn, veileder.etternavn)

				const entry = map.get(veilederNavn)
				map.set(veilederNavn, entry ? entry + 1 : 1)
			}
		})

		setDeltakerePerVeileder(map)
	}, [ props.deltakere ])

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
