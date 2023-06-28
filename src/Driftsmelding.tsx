import { Alert } from '@navikt/ds-react'
import React from 'react'

import styles from './Driftsmelding.module.scss'
import { useFeatureToggle } from './hooks/useFeatureToggle'
export const Driftsmelding = () => {
	const { visDriftsmelding } = useFeatureToggle()
	if (!visDriftsmelding) return <></>


	return (
		<Alert variant="error" className={styles.alertstripe}>
			Deltakeroversikten er noe ustabil nå. Hvis du opplever at noe ikke fungerer kan du prøve å laste siden på nytt. Vi jobber med å fikse problemet. Vi beklager ulempen.
		</Alert>
	)
}
