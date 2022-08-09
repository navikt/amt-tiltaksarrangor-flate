import { Alert } from '@navikt/ds-react'
import React from 'react'

import styles from './IngenRollePage.module.scss'

export const IngenRollePage = (): React.ReactElement => {
	return (
		<main className={styles.page}>
			<Alert variant="warning">Du har ikke tilgang til Deltakeroversikten for tiltaksarrangører. Hvis du
                skal
                ha tilgang så må noen i din organisasjon sette opp tilgang til deg i Altinn.</Alert>
		</main>
	)
}
