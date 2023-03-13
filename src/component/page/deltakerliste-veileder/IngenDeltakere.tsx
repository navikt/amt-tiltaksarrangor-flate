import { GuidePanel } from '@navikt/ds-react'
import React from 'react'
import styles from './IngenDeltakere.module.scss'

export const IngenDeltakere = (): JSX.Element => (
	<div className={styles.ingenDeltakere}>
		<GuidePanel poster>
        Du er logget inn som veileder i deltakeroversikten. Her kan du holde oversikt over deltakere som du følger opp.
			<p />
        Du er ikke veileder til noen deltakere nå. Koordinator kan tildele deg som veileder til deltakere.
		</GuidePanel>
	</div>
)
