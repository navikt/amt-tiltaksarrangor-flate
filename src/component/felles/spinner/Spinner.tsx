import { Loader } from '@navikt/ds-react'
import React from 'react'

import styles from './Spinner.module.scss'

export const Spinner = (): React.ReactElement => {
	return (
		<div className={styles.spinner}>
			<Loader size="2xlarge" />
		</div>
	)
}
