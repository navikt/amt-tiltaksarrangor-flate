import 'nav-frontend-tabell-style'

import React, { useEffect, useState } from 'react'

import { TiltakDeltaker } from '../../../../domeneobjekter/deltaker'
import { useTiltaksoversiktSokStore } from '../../../../store/tiltaksoversikt-sok-store'
import { filtrerBrukere } from '../../../../utils/filtrering-utils'
import { sorterDeltakere } from '../../../../utils/sortering-utils'
import { IngenDeltakereAlertstripe } from './IngenDeltakereAlertstripe'
import { TabellBody } from './TabellBody'
import { TabellHeader } from './TabellHeader'


interface DeltakerOversiktTabellProps {
	deltakere: TiltakDeltaker[]
}

export const DeltakerOversiktTabell = (props: DeltakerOversiktTabellProps): React.ReactElement<DeltakerOversiktTabellProps> => {
	const { deltakere } =  props
	const { deltakerSortering, tiltakStatusFilter, navnFnrSok } = useTiltaksoversiktSokStore()
	const [ deltakereBearbeidet, setDeltakereBearbeidet ] = useState<TiltakDeltaker[]>(deltakere)

	useEffect(() => {
		if (!deltakere) return
		const filtrerteBrukere = filtrerBrukere(deltakere, tiltakStatusFilter, navnFnrSok)
		const sortert = sorterDeltakere(filtrerteBrukere, deltakerSortering)
		setDeltakereBearbeidet(sortert)

	}, [ deltakere, deltakerSortering, tiltakStatusFilter, navnFnrSok ])

	if (deltakere.length === 0) {
		return <IngenDeltakereAlertstripe/>
	}

	return (
		<table className="tabell">
			<TabellHeader />
			<TabellBody brukere={deltakereBearbeidet} />
		</table>
	)
}
