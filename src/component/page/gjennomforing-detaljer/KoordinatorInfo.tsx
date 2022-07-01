import { Heading } from '@navikt/ds-react'
import React from 'react'

import globalStyles from '../../../globals.module.scss'
import styles from './KoordinatorInfo.module.scss'

interface KoordinatorInfoProps {
	koordinatorer: string[]
}

export const KoordinatorInfo = (props: KoordinatorInfoProps) => {
	if (props.koordinatorer.length === 0) {
		return <></>
	}

	return (
		<div className={globalStyles.blokkM}>
			<Heading size="medium" level="2" className={globalStyles.blokkXxs}>Koordinatorer</Heading>
			<ul className={styles.koordinatorList}>
				{props.koordinatorer.map(k => <li className={styles.koordinator} key={k}>{k}</li>)}
			</ul>

		</div>
	)

}
