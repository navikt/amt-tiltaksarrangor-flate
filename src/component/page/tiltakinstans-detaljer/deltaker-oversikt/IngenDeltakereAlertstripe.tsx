import { AlertStripeInfo } from 'nav-frontend-alertstriper'
import React from 'react'

import styles from './IngenDeltakereAlertstripe.module.less'

export const IngenDeltakereAlertstripe = (): JSX.Element => (
	<AlertStripeInfo className={styles.ingenDeltakere}>
		<span role="alert" aria-live="polite">
				Fant ingen brukere
		</span>
	</AlertStripeInfo>
)