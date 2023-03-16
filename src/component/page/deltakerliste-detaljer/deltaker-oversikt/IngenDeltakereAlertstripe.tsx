import { Alert } from '@navikt/ds-react'
import React from 'react'

import styles from './IngenDeltakereAlertstripe.module.scss'

export const IngenDeltakereAlertstripe = (): JSX.Element => (
	<Alert variant="info" className={styles.ingenDeltakere}>
		<span role="alert" aria-live="polite">
			Det er ingen deltakere i dette arbeidsmarkedstiltaket.
		</span>
	</Alert>
)