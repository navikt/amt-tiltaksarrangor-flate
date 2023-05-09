import { TiltakDeltaker } from '../../../../api/data/deltaker'
import React, { useEffect, useState } from 'react'
import { useKoordinatorTableFilterStore } from '../store/koordinator-table-filter-store'
import globalStyles from '../../../../globals.module.scss'
import { FilterMeny } from '../../../felles/table-filter/FilterMeny'
import { getMedveiledere, HAR_IKKE_MEDVEILEDER_FILTER_TEKST, veilederNavn } from '../../../../utils/veileder-utils'
import { FiltermenyDataEntry } from '../../../felles/table-filter/filtermeny-data-entry'

interface Props {
	deltakere: TiltakDeltaker[]
}

export const FilterMenyMedveileder = (props: Props): React.ReactElement => {
	const [ deltakerePerMedveileder, setDeltarerePerMedveileder ] = useState<FiltermenyDataEntry[]>([])

	const {
		medveilederFilter,
		setMedveilederFilter,
		statusFilter,
		veilederFilter,
		filtrerBrukerePaMedHovedveileder,
		filtrerDeltakerePaStatus
	} = useKoordinatorTableFilterStore()

	const createInitialDataMap = (deltakere: TiltakDeltaker[]): Map<string, FiltermenyDataEntry> => {
		const medveilederMap = new Map<string, FiltermenyDataEntry>()

		deltakere.forEach((deltaker) => {
			const medveiledere = getMedveiledere(deltaker)
			medveiledere.forEach(medveileder => {
				medveilederMap.set(medveileder.ansattId, {
					id: medveileder.ansattId,
					displayName: veilederNavn(medveileder),
					antallDeltakere: 0
				})
			})

		})

		const sortedMap = new Map([ ...medveilederMap.entries() ]
			.sort((a, b) => a[1].displayName.localeCompare(b[1].displayName)))

		const utenMedveilederMap = new Map<string, FiltermenyDataEntry>()
		utenMedveilederMap.set(HAR_IKKE_MEDVEILEDER_FILTER_TEKST, {
			id: HAR_IKKE_MEDVEILEDER_FILTER_TEKST,
			displayName: HAR_IKKE_MEDVEILEDER_FILTER_TEKST,
			antallDeltakere: 0
		})

		return new Map<string, FiltermenyDataEntry>([ ...utenMedveilederMap, ...sortedMap ])
	}

	useEffect(() => {
		const filtrerDeltakere = (deltakere: TiltakDeltaker[]): TiltakDeltaker[] => {
			const filtrertPaStatus = filtrerDeltakerePaStatus(deltakere)
			return filtrerBrukerePaMedHovedveileder(filtrertPaStatus)
		}

		const map = createInitialDataMap(props.deltakere)

		filtrerDeltakere(props.deltakere).forEach((deltaker) => {
			const medveiledere = getMedveiledere(deltaker)

			if (medveiledere.length === 0) {
				const entry = map.get(HAR_IKKE_MEDVEILEDER_FILTER_TEKST)
				if(entry !== null) {
					map.set(HAR_IKKE_MEDVEILEDER_FILTER_TEKST, {
						id: HAR_IKKE_MEDVEILEDER_FILTER_TEKST,
						displayName: HAR_IKKE_MEDVEILEDER_FILTER_TEKST,
						antallDeltakere: entry ? entry.antallDeltakere + 1 : 1
					})
				}
			} else {
				medveiledere.forEach(medveileder => {
					const entry = map.get(medveileder.ansattId)
					map.set(medveileder.ansattId, {
						id: medveileder.ansattId,
						displayName: veilederNavn(medveileder),
						antallDeltakere: entry ? entry.antallDeltakere + 1 : 1
					})
				})
			}
		})

		setDeltarerePerMedveileder([ ...map.values() ])
	}, [ props.deltakere, statusFilter, veilederFilter, filtrerBrukerePaMedHovedveileder, filtrerDeltakerePaStatus ])

	const leggTil = (veileder: string) => {
		setMedveilederFilter((prev) => {
			if (prev.includes(veileder)) {
				return prev
			}
			return [ ...prev, veileder ]
		})
	}

	const fjern = (veileder: string) => {
		setMedveilederFilter((prev) => {
			return prev.filter((v) => v !== veileder)
		})
	}

	return (
		<FilterMeny
			navn="Medveileder"
			data={deltakerePerMedveileder}
			className={globalStyles.blokkXs}
			filter={medveilederFilter}
			addFilter={leggTil}
			removeFilter={fjern}
		/>
	)
}
