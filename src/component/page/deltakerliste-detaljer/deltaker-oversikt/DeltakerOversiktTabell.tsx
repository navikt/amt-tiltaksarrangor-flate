import React, { useEffect, useState } from 'react'

import { TiltakDeltaker } from '../../../../api/data/deltaker'
import { useTiltaksoversiktSokStore } from '../../../../store/tiltaksoversikt-sok-store'
import { finnNesteSortering } from '../../../../utils/sortering-utils'
import { DeltakerTabell } from './deltaker-tabell/DeltakerTabell'
import { sorterDeltakere } from './deltaker-tabell/sortering'
import styles from './DeltakerOversiktTabell.module.scss'
import { IngenDeltakereAlertstripe } from './IngenDeltakereAlertstripe'
import { useKoordinatorTableFilterStore } from '../../gjennomforing-detaljer/store/koordinator-table-filter-store'


interface DeltakerOversiktTabellProps {
	deltakere: TiltakDeltaker[]
}

export const DeltakerOversiktTabell = (props: DeltakerOversiktTabellProps): React.ReactElement<DeltakerOversiktTabellProps> => {
	const { deltakere } = props
	const { filtrerDeltakere, veilederFilter, medveilederFilter, statusFilter } = useKoordinatorTableFilterStore()
	const { deltakerSortering, tiltakStatusFilter, setDeltakerSortering } = useTiltaksoversiktSokStore()
	const [ deltakereBearbeidet, setDeltakereBearbeidet ] = useState<TiltakDeltaker[]>(sorterDeltakere(deltakere, deltakerSortering))

	useEffect(() => {
		if (!deltakere) return
		const filtrerteDeltakere = filtrerDeltakere(deltakere)
		const sortert = sorterDeltakere(filtrerteDeltakere, deltakerSortering)
		setDeltakereBearbeidet(sortert)

	}, [ deltakere, filtrerDeltakere, deltakerSortering, tiltakStatusFilter, veilederFilter, medveilederFilter, statusFilter ])

	const handleOnSortChange = (sortKey: string | undefined) => {
		setDeltakerSortering(prevSort => finnNesteSortering(sortKey, prevSort))
	}


	return (
		<div className={styles.tableWrapper}>
			{deltakere.length === 0
				? <IngenDeltakereAlertstripe/>
				: (
					<DeltakerTabell
						deltakere={deltakereBearbeidet}
						sortering={deltakerSortering}
						onSortChange={handleOnSortChange}
					/>
				)
			}
		</div>
	)
}
