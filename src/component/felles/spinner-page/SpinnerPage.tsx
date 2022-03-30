import { Loader } from '@navikt/ds-react'
import React from 'react'

import styles from './SpinnerPage.module.scss'

export const SpinnerPage = (): React.ReactElement => {
	return (
		<main className={styles.page}>
			<Loader size="2xlarge" />
		</main>
	)
}
