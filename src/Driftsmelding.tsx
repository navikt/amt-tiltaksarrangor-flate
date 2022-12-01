import { Alert } from '@navikt/ds-react'
import React from 'react'

import { VIS_DRIFTSMELDING_TOGGLE_NAVN } from './api/feature-toggle-api'
import { useFeatureToggle } from './hooks/useFeatureToggle'

export const Driftsmelding = () => {
	const { toggles } = useFeatureToggle()
	if(! toggles.get(VIS_DRIFTSMELDING_TOGGLE_NAVN)) return <></>

	return (
		<Alert variant="error">
			På grunn av en forsinkelse i dataoverføring vil du kunne oppleve feil. Vi jobber med feilsøking og retting. Beklager ulempen dette medfører.
		</Alert>
	)
}