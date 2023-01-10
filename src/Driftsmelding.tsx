import { Alert } from '@navikt/ds-react'
import React from 'react'

import styles from './Driftsmelding.module.scss'
import { useFeatureToggle } from './hooks/useFeatureToggle'
export const Driftsmelding = () => {
	const { visDriftsmelding } = useFeatureToggle()
	if (!visDriftsmelding) return <></>


	return (
		<Alert variant="error" className={styles.alertstripe}>
			På grunn av en teknisk oppdatering vil det mangle data om deltakere i omtrent en dag.<br />
			Vi gir beskjed når oppdateringen er ferdig.
		</Alert>
	)
}

/*
 * Original tekst:
 *
			På grunn av en forsinkelse i dataoverføring vil du kunne oppleve feil. <br/>
			Vi jobber med feilsøking og retting. Beklager ulempen dette medfører.
*/
