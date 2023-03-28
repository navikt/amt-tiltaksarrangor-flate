import { TiltakDeltaker } from '../../../../api/data/deltaker'
import React, { useEffect, useState } from 'react'
import { useKoordinatorTableFilterStore } from '../store/koordinator-table-filter-store'
import globalStyles from '../../../../globals.module.scss'
import { FilterMeny } from '../../../felles/table-filter/FilterMeny'
import { getMedveiledere, HAR_IKKE_MEDVEILEDER_VILER_TEKST, veilederNavn } from '../../../../utils/veileder-utils'
import { FiltermenyDataEntry } from '../../../felles/table-filter/filtermeny-data-entry'

interface Props {
	deltakere: TiltakDeltaker[]
}

export const KoordinatorFiltermenyMedveileder = (props: Props): React.ReactElement => {
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
		const dataMap = new Map<string, FiltermenyDataEntry>()
		dataMap.set(HAR_IKKE_MEDVEILEDER_VILER_TEKST, {
			id: HAR_IKKE_MEDVEILEDER_VILER_TEKST,
			displayName: HAR_IKKE_MEDVEILEDER_VILER_TEKST,
			entries: 0
		})

		deltakere.forEach((deltaker) => {
			const medveiledere = getMedveiledere(deltaker)
			medveiledere.forEach(medveileder => {
				dataMap.set(medveileder.ansattId, {
					id: medveileder.ansattId,
					displayName: veilederNavn(medveileder),
					entries: 0
				})
			})

		})

		return dataMap
	}

	const filtrerDeltakere = (deltakere: TiltakDeltaker[]): TiltakDeltaker[] => {
		const filtrertPaStatus = filtrerDeltakerePaStatus(deltakere)
		return filtrerBrukerePaMedHovedveileder(filtrertPaStatus)
	}

	useEffect(() => {
		const map = createInitialDataMap(props.deltakere)

		filtrerDeltakere(props.deltakere).forEach((deltaker) => {
			const medveiledere = getMedveiledere(deltaker)

			if (medveiledere.length === 0) {
				const entry = map.get(HAR_IKKE_MEDVEILEDER_VILER_TEKST)!
				map.set(HAR_IKKE_MEDVEILEDER_VILER_TEKST, {
					...entry,
					entries: entry.entries + 1
				})
			} else {
				medveiledere.forEach(medveileder => {
					const entry = map.get(medveileder.ansattId)
					map.set(medveileder.ansattId, {
						id: medveileder.ansattId,
						displayName: veilederNavn(medveileder),
						entries: entry ? entry.entries + 1 : 1
					})
				})
			}
		})

		setDeltarerePerMedveileder([ ...map.values() ])
	}, [ props.deltakere, statusFilter, veilederFilter ])

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
