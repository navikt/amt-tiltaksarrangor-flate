import { Table } from '@navikt/ds-react'
import React, { useEffect, useState } from 'react'

import { useTiltaksoversiktSokStore } from '../../../store/tiltaksoversikt-sok-store'
import { finnNesteSortering } from '../../../utils/sortering-utils'
import styles from './MineDeltakereTabell.module.scss'
import { sorterVeiledersDeltakere } from './sortering'
import { VeiledersDeltaker } from '../../../api/data/deltaker'
import { IngenDeltakere } from './ingen-deltakere/IngenDeltakere'
import { TabellHeaderVeileder } from './TabellHeaderVeileder'
import { TabellBodyVeileder } from './TabellBodyVeileder'
import { filtrerDeltakerliste } from '../../../utils/filtrering-utils'
import { useVeilederTableFilterStore } from './store/veileder-table-filter-store'


interface MineDeltakereTabellProps {
	mineDeltakere: VeiledersDeltaker[]
}

export const MineDeltakereTabell = (props: MineDeltakereTabellProps): React.ReactElement<MineDeltakereTabellProps> => {
	const { mineDeltakere } = props
	const {
		deltakerSortering,
		tiltakStatusFilter,
		deltakerlisteFilter,
		veiledertypeFilter,
		setDeltakerSortering
	} = useTiltaksoversiktSokStore()
	const { filtrerDeltakere, statusFilter } = useVeilederTableFilterStore()
	const [ deltakereBearbeidet, setDeltakereBearbeidet ] = useState<VeiledersDeltaker[]>(sorterVeiledersDeltakere(mineDeltakere, deltakerSortering))

	useEffect(() => {
		if (!mineDeltakere) return
		const filtrerteBrukere = filtrerDeltakere(mineDeltakere)
		const filtrerteDeltakerlister = filtrerDeltakerliste(filtrerteBrukere, deltakerlisteFilter)
		const sortert = sorterVeiledersDeltakere(filtrerteDeltakerlister, deltakerSortering)
		setDeltakereBearbeidet(sortert)

	}, [ filtrerDeltakere, statusFilter, mineDeltakere, deltakerSortering, tiltakStatusFilter, deltakerlisteFilter, veiledertypeFilter ])

	const handleOnSortChange = (sortKey: string | undefined) => {
		setDeltakerSortering(prevSort => finnNesteSortering(sortKey, prevSort))
	}

	return (
		<div className={styles.tableWrapper}>
			{mineDeltakere.length === 0
				? <IngenDeltakere/>
				: (
					<Table className="tabell" zebraStripes={true} sort={deltakerSortering} onSortChange={handleOnSortChange} aria-label="Deltakere på tiltaksgjennomføring">
						<TabellHeaderVeileder/>
						<TabellBodyVeileder brukere={deltakereBearbeidet}/>
					</Table>
				)
			}
		</div>
	)
}
