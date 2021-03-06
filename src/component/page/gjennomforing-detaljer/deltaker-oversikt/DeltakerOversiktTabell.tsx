import { Table } from '@navikt/ds-react'
import React, { useEffect, useState } from 'react'

import { TiltakDeltaker } from '../../../../api/data/deltaker'
import { useTiltaksoversiktSokStore } from '../../../../store/tiltaksoversikt-sok-store'
import { filtrerBrukere } from '../../../../utils/filtrering-utils'
import { finnNesteSortering } from '../../../../utils/sortering-utils'
import { IngenDeltakereAlertstripe } from './IngenDeltakereAlertstripe'
import { sorterDeltakere } from './sortering'
import { TabellBody } from './TabellBody'
import { TabellHeader } from './TabellHeader'


interface DeltakerOversiktTabellProps {
	deltakere: TiltakDeltaker[]
}

export const DeltakerOversiktTabell = (props: DeltakerOversiktTabellProps): React.ReactElement<DeltakerOversiktTabellProps> => {
	const { deltakere } =  props
	const { deltakerSortering, tiltakStatusFilter, setDeltakerSortering } = useTiltaksoversiktSokStore()
	const [ deltakereBearbeidet, setDeltakereBearbeidet ] = useState<TiltakDeltaker[]>(deltakere)

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
		<section>
			{deltakere.length === 0
				? <IngenDeltakereAlertstripe/>
				: (
					<Table className="tabell" zebraStripes={true} sort={deltakerSortering} onSortChange={handleOnSortChange}>
						<TabellHeader />
						<TabellBody brukere={deltakereBearbeidet} />
					</Table>
				)
			}
		</section>
	)
}
