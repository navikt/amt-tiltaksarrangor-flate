import './DeltakerOversiktTabell.scss'

import { Table } from '@navikt/ds-react'
import React, { useEffect, useState } from 'react'

import { TiltakDeltakerDto } from '../../../../api/data/deltaker'
import { useTiltaksoversiktSokStore } from '../../../../store/tiltaksoversikt-sok-store'
import { filtrerBrukere } from '../../../../utils/filtrering-utils'
import { sorterDeltakere } from '../../../../utils/sortering-utils'
import { IngenDeltakereAlertstripe } from './IngenDeltakereAlertstripe'
import { TabellBody } from './TabellBody'
import { TabellHeader } from './TabellHeader'


interface DeltakerOversiktTabellProps {
	deltakere: TiltakDeltakerDto[]
}

export const DeltakerOversiktTabell = (props: DeltakerOversiktTabellProps): React.ReactElement<DeltakerOversiktTabellProps> => {
	const { deltakere } =  props
	const { deltakerSortering, tiltakStatusFilter } = useTiltaksoversiktSokStore()
	const [ deltakereBearbeidet, setDeltakereBearbeidet ] = useState<TiltakDeltakerDto[]>(deltakere)

	useEffect(() => {
		if (!deltakere) return
		const filtrerteBrukere = filtrerBrukere(deltakere, tiltakStatusFilter)
		const sortert = sorterDeltakere(filtrerteBrukere, deltakerSortering)
		setDeltakereBearbeidet(sortert)

	}, [ deltakere, deltakerSortering, tiltakStatusFilter ])

	return (
		<section>
			{deltakere.length === 0
				? <IngenDeltakereAlertstripe/>
				: (
					<Table className="tabell" zebraStripes={true}>
						<TabellHeader />
						<TabellBody brukere={deltakereBearbeidet} />
					</Table>
				)
			}
		</section>
	)
}
