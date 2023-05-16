import { TiltakDeltaker } from '../../../../api/data/deltaker'
import React, { useEffect, useState } from 'react'
import { FiltermenyDataEntry } from '../../../felles/table-filter/filtermeny-data-entry'
import { useKoordinatorFilterMenyStore } from '../store/koordinator-filter-meny-store-provider'
import { FilterMeny } from '../../../felles/table-filter/FilterMeny'
import globalStyles from '../../../../globals.module.scss'
import { HAR_IKKE_NAVKONTOR_FILTER_TEKST } from '../../../../utils/koordinator-utils'

interface Props {
    deltakere: TiltakDeltaker[]
}

export const FilterMenyNavKontor = (props: Props): React.ReactElement => {
	const [ deltakerePerNavKontor, setDeltakerePerNavKontor ] = useState<FiltermenyDataEntry[]>([])

	const {
		veilederFilter,
		medveilederFilter,
		statusFilter,
		navKontorFilter,
		addNavKontorFilter,
		removeNavKontorFilter,
		filtrerDeltakere
	} = useKoordinatorFilterMenyStore()
	
	const createInitialDataMap = (deltakere: TiltakDeltaker[]): Map<string, FiltermenyDataEntry> => {
		const navKontorMap = new Map<string, FiltermenyDataEntry>()

		deltakere.forEach((deltaker) => {
			const navkontor = deltaker.navKontor

			if(navkontor !== null) {
				navKontorMap.set(navkontor, {
					id: navkontor,
					displayName: navkontor,
					antallDeltakere: 0
				})
			}
		})

		const utenNavKontorMap = new Map<string, FiltermenyDataEntry>()

		utenNavKontorMap.set(HAR_IKKE_NAVKONTOR_FILTER_TEKST, {
			id: HAR_IKKE_NAVKONTOR_FILTER_TEKST,
			displayName: HAR_IKKE_NAVKONTOR_FILTER_TEKST,
			antallDeltakere: 0
		})

		return new Map<string, FiltermenyDataEntry>([ ...utenNavKontorMap, ...navKontorMap ])
	}

	useEffect(() => {
		const map = createInitialDataMap(props.deltakere)

		filtrerDeltakere(props.deltakere)
			.forEach((deltaker) => {
				const navkontor = deltaker.navKontor

				if (navkontor === null) {
					const entry = map.get(HAR_IKKE_NAVKONTOR_FILTER_TEKST)
					if(entry !== undefined) {
						map.set(HAR_IKKE_NAVKONTOR_FILTER_TEKST,
							{
								...entry,
								antallDeltakere: entry.antallDeltakere + 1
							})
					}
				} else {
					const entry = map.get(navkontor)
					map.set(navkontor, {
						id: navkontor,
						displayName: navkontor,
						antallDeltakere: entry ? entry.antallDeltakere + 1 : 1
					})

				}
			})

		setDeltakerePerNavKontor([ ...map.values() ])
	}, [ props.deltakere, statusFilter, medveilederFilter, veilederFilter, filtrerDeltakere ])

	return (
		<FilterMeny
			navn="NAV-kontor"
			data={deltakerePerNavKontor}
			className={globalStyles.blokkXs}
			filter={navKontorFilter}
			addFilter={addNavKontorFilter}
			removeFilter={removeNavKontorFilter}
			isExpandedDefaultValue={false}
		/>
	)
}