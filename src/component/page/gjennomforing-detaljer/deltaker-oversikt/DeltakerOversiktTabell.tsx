import React, { useEffect, useState } from 'react'

import { TiltakDeltaker } from '../../../../api/data/deltaker'
import { useTiltaksoversiktSokStore } from '../../../../store/tiltaksoversikt-sok-store'
import { filtrerBrukere } from '../../../../utils/filtrering-utils'
import { finnNesteSortering } from '../../../../utils/sortering-utils'
import toggle from '../../../../utils/toggle'
import { DeltakerTabell, TabellType } from '../../../felles/deltaker-tabell/DeltakerTabell'
import { sorterDeltakere } from '../../../felles/deltaker-tabell/sortering'
import styles from './DeltakerOversiktTabell.module.scss'
import { IngenDeltakereAlertstripe } from './IngenDeltakereAlertstripe'


interface DeltakerOversiktTabellProps {
	deltakere: TiltakDeltaker[]
}

export const DeltakerOversiktTabell = (props: DeltakerOversiktTabellProps): React.ReactElement<DeltakerOversiktTabellProps> => {
	const { deltakere } = props
	const { deltakerSortering, tiltakStatusFilter, setDeltakerSortering } = useTiltaksoversiktSokStore()
	const [ deltakereBearbeidet, setDeltakereBearbeidet ] = useState<TiltakDeltaker[]>(sorterDeltakere(deltakere, deltakerSortering))

	useEffect(() => {
		if (!deltakere) return
		const filtrerteBrukere = filtrerBrukere(deltakere, tiltakStatusFilter)
		const sortert = sorterDeltakere(filtrerteBrukere, deltakerSortering)
		setDeltakereBearbeidet(sortert)

	}, [ deltakere, deltakerSortering, tiltakStatusFilter ])

	const handleOnSortChange = (sortKey: string | undefined) => {
		setDeltakerSortering(prevSort => finnNesteSortering(sortKey, prevSort))
	}


	return (
		<div className={styles.tableWrapper}>
			{deltakere.length === 0
				? <IngenDeltakereAlertstripe />
				: (
					<DeltakerTabell
						deltakere={deltakereBearbeidet}
						sortering={deltakerSortering}
						onSortChange={handleOnSortChange}
						visning={TabellType.KOORDINATOR}
						visCheckBox={toggle.veiledereEnabled}
					/>
				)
			}
		</div>
	)
}
