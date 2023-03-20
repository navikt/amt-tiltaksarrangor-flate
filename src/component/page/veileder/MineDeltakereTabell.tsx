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
import { filtrerDeltakerliste, filtrerVeiledersDeltakere, filtrerVeiledertype } from '../../../utils/filtrering-utils'


interface MineDeltakereTabellProps {
    mineDeltakere: VeiledersDeltaker[]
}

export const MineDeltakereTabell = (props: MineDeltakereTabellProps): React.ReactElement<MineDeltakereTabellProps> => {
	const { mineDeltakere } = props
	const { deltakerSortering, tiltakStatusFilter, deltakerlisteFilter, veiledertypeFilter, setDeltakerSortering } = useTiltaksoversiktSokStore()
	const [ deltakereBearbeidet, setDeltakereBearbeidet ] = useState<VeiledersDeltaker[]>(sorterVeiledersDeltakere(mineDeltakere, deltakerSortering))

	useEffect(() => {
		if (!mineDeltakere) return
		const filtrerteBrukere = filtrerVeiledersDeltakere(mineDeltakere, tiltakStatusFilter)
		const filtrerteDeltakerlister = filtrerDeltakerliste(filtrerteBrukere, deltakerlisteFilter)
		const filtrerteDeltakereVeiledertype = filtrerVeiledertype(filtrerteDeltakerlister, veiledertypeFilter)
		const sortert = sorterVeiledersDeltakere(filtrerteDeltakereVeiledertype, deltakerSortering)
		setDeltakereBearbeidet(sortert)

	}, [ mineDeltakere, deltakerSortering, tiltakStatusFilter, deltakerlisteFilter, veiledertypeFilter ])

	const handleOnSortChange = (sortKey: string | undefined) => {
		setDeltakerSortering(prevSort => finnNesteSortering(sortKey, prevSort))
	}

	return (
		<div className={styles.tableWrapper}>
			{mineDeltakere.length === 0
				? <IngenDeltakere />
				: (
					<Table className="tabell" zebraStripes={true} sort={deltakerSortering} onSortChange={handleOnSortChange} aria-label="Deltakere på tiltaksgjennomføring">
						<TabellHeaderVeileder />
						<TabellBodyVeileder brukere={deltakereBearbeidet} />
					</Table>
				)
			}
		</div>
	)
}
