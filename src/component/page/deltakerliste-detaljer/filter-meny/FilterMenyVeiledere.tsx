import { TiltakDeltaker } from '../../../../api/data/deltaker'
import globalStyles from '../../../../globals.module.scss'
import { FilterMeny } from '../../../felles/table-filter/FilterMeny'
import React, { useEffect, useState } from 'react'
import { useKoordinatorTableFilterStore } from '../store/koordinator-table-filter-store'
import { getHovedveileder, HAR_IKKE_VEILEDER_FILTER_TEKST, veilederNavn } from '../../../../utils/veileder-utils'
import { FiltermenyDataEntry } from '../../../felles/table-filter/filtermeny-data-entry'

interface Props {
	deltakere: TiltakDeltaker[]
}

export const FilterMenyVeiledere = (props: Props): React.ReactElement => {
	const [ deltakerePerVeileder, setDeltakerePerVeileder ] = useState<FiltermenyDataEntry[]>([])

	const {
		veilederFilter,
		addVeilederFilter,
		removeVeilederFilter,
		filtrerDeltakerePaStatus,
		filtrerBrukerePaMedveileder,
		medveilederFilter,
		statusFilter
	} = useKoordinatorTableFilterStore()

	const createInitialDataMap = (deltakere: TiltakDeltaker[]): Map<string, FiltermenyDataEntry> => {
		const veilederMap = new Map<string, FiltermenyDataEntry>()

		deltakere.forEach((deltaker) => {
			const hovedveileder = getHovedveileder(deltaker)

			if(hovedveileder !== undefined) {
				veilederMap.set(hovedveileder.ansattId, {
					id: hovedveileder.ansattId,
					displayName: veilederNavn(hovedveileder),
					antallDeltakere: 0
				})
			}
		})

		const sortedMap = new Map([ ...veilederMap.entries() ]
			.sort((a, b) => a[1].displayName.localeCompare(b[1].displayName)))

		const utenVeilederMap = new Map<string, FiltermenyDataEntry>()

		utenVeilederMap.set(HAR_IKKE_VEILEDER_FILTER_TEKST, {
			id: HAR_IKKE_VEILEDER_FILTER_TEKST,
			displayName: HAR_IKKE_VEILEDER_FILTER_TEKST,
			antallDeltakere: 0
		})

		return new Map<string, FiltermenyDataEntry>([ ...utenVeilederMap, ...sortedMap ])
	}

	useEffect(() => {
		const filtrerDeltakere = (deltakere: TiltakDeltaker[]): TiltakDeltaker[] => {
			const filtrertPaStatus = filtrerDeltakerePaStatus(deltakere)
			return filtrerBrukerePaMedveileder(filtrertPaStatus)
		}

		const map = createInitialDataMap(props.deltakere)

		filtrerDeltakere(props.deltakere)
			.forEach((deltaker) => {
				const hovedveileder = getHovedveileder(deltaker)

				if (hovedveileder === undefined) {
					const entry = map.get(HAR_IKKE_VEILEDER_FILTER_TEKST)
					if(entry !== undefined) {
						map.set(HAR_IKKE_VEILEDER_FILTER_TEKST,
							{
								...entry,
								antallDeltakere: entry.antallDeltakere + 1
							})
					}
				} else {
					const entry = map.get(hovedveileder.ansattId)
					map.set(hovedveileder.ansattId, {
						id: hovedveileder.ansattId,
						displayName: veilederNavn(hovedveileder),
						antallDeltakere: entry ? entry.antallDeltakere + 1 : 1
					})

				}
			})

		setDeltakerePerVeileder([ ...map.values() ])
	}, [ props.deltakere, statusFilter, medveilederFilter, filtrerBrukerePaMedveileder, filtrerDeltakerePaStatus ])

	return (
		<FilterMeny
			navn="Veileder"
			data={deltakerePerVeileder}
			className={globalStyles.blokkXs}
			filter={veilederFilter}
			addFilter={addVeilederFilter}
			removeFilter={removeVeilederFilter}
		/>
	)
}
