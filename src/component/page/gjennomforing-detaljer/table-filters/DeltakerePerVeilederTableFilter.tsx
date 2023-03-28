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

export const DeltakerePerVeilederTableFilter = (props: Props): React.ReactElement => {
	const [ deltakerePerVeileder, setDeltakerePerVeileder ] = useState<FiltermenyDataEntry[]>([])

	const {
		veilederFilter,
		setVeilederFilter,
		filtrerDeltakerePaStatus,
		filtrerBrukerePaMedveileder,
		medveilederFilter,
		statusFilter
	} = useKoordinatorTableFilterStore()

	const createInitialDataMap = (deltakere: TiltakDeltaker[]): Map<string, FiltermenyDataEntry> => {
		const dataMap = new Map<string, FiltermenyDataEntry>()

		dataMap.set(HAR_IKKE_VEILEDER_FILTER_TEKST, {
			id: HAR_IKKE_VEILEDER_FILTER_TEKST,
			displayName: HAR_IKKE_VEILEDER_FILTER_TEKST,
			entries: 0
		})

		deltakere.forEach((deltaker) => {
			const hovedveileder = getHovedveileder(deltaker)

			if(hovedveileder !== undefined) {
				dataMap.set(hovedveileder.ansattId, {
					id: hovedveileder.ansattId,
					displayName: veilederNavn(hovedveileder),
					entries: 0
				})
			}
		})

		return dataMap
	}

	const filtrerDeltakere = (deltakere: TiltakDeltaker[]): TiltakDeltaker[] => {
		const filtrertPaStatus = filtrerDeltakerePaStatus(deltakere)
		return filtrerBrukerePaMedveileder(filtrertPaStatus)
	}

	useEffect(() => {
		const map = createInitialDataMap(props.deltakere)

		filtrerDeltakere(props.deltakere)
			.forEach((deltaker) => {
				const hovedveileder = getHovedveileder(deltaker)

				if (hovedveileder === undefined) {
					const entry = map.get(HAR_IKKE_VEILEDER_FILTER_TEKST)!
					map.set(HAR_IKKE_VEILEDER_FILTER_TEKST,
						{
							...entry,
							entries: entry.entries + 1
						})
				} else {
					const entry = map.get(hovedveileder.ansattId)
					map.set(hovedveileder.ansattId, {
						id: hovedveileder.ansattId,
						displayName: veilederNavn(hovedveileder),
						entries: entry ? entry.entries + 1 : 1
					})

				}
			})

		setDeltakerePerVeileder([ ...map.values() ])
	}, [ props.deltakere, statusFilter, medveilederFilter ])

	const leggTil = (veileder: string) => {
		setVeilederFilter((prev) => {
			if (prev.includes(veileder)) {
				return prev
			}
			return [ ...prev, veileder ]
		})
	}

	const fjern = (veileder: string) => {
		setVeilederFilter((prev) => {
			return prev.filter((v) => v !== veileder)
		})
	}

	return (
		<FilterMeny
			navn="Veileder"
			data={deltakerePerVeileder}
			className={globalStyles.blokkXs}
			filter={veilederFilter}
			addFilter={leggTil}
			removeFilter={fjern}
		/>
	)
}
