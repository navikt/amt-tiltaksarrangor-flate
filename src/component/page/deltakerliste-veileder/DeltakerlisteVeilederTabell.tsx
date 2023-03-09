import { Table } from '@navikt/ds-react'
import React, { useEffect, useState } from 'react'

import { useTiltaksoversiktSokStore } from '../../../store/tiltaksoversikt-sok-store'
import { finnNesteSortering } from '../../../utils/sortering-utils'
import styles from './DeltakerlisteVeilederTabell.module.scss'
import { sorterVeiledersDeltakere } from './sortering'
import { VeiledersDeltaker } from '../../../api/data/deltaker'
import { IngenDeltakere } from './IngenDeltakere'
import { TabellHeaderVeileder } from './TabellHeaderVeileder'
import { TabellBodyVeileder } from './TabellBodyVeileder'


interface DeltakerlisteVeilederTabellProps {
    deltakerliste: VeiledersDeltaker[]
}

export const DeltakerlisteVeilederTabell = (props: DeltakerlisteVeilederTabellProps): React.ReactElement<DeltakerlisteVeilederTabellProps> => {
	const { deltakerliste } = props
	const { deltakerSortering, setDeltakerSortering } = useTiltaksoversiktSokStore()
	const [ deltakereBearbeidet, setDeltakereBearbeidet ] = useState<VeiledersDeltaker[]>(sorterVeiledersDeltakere(deltakerliste, deltakerSortering))

	useEffect(() => {
		if (!deltakerliste) return
		const sortert = sorterVeiledersDeltakere(deltakerliste, deltakerSortering)
		setDeltakereBearbeidet(sortert)

	}, [ deltakerliste, deltakerSortering ])

	const handleOnSortChange = (sortKey: string | undefined) => {
		setDeltakerSortering(prevSort => finnNesteSortering(sortKey, prevSort))
	}

	return (
		<div className={styles.tableWrapper}>
			{deltakerliste.length === 0
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
