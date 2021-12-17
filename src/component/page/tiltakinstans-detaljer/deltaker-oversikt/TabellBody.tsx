import React from 'react'

import { TiltakDeltager } from '../../../../domeneobjekter/deltager'
import { Rad } from './Rad'
import styles from './TabellBody.module.less'

interface TabellBodyProps {
	brukere: TiltakDeltager[];
}

export const TabellBody = (props: TabellBodyProps) : JSX.Element => {
	return (
		<tbody className={styles.rad}>
			{props.brukere.map((bruker, idx) => (
				<Rad idx={idx} bruker={bruker} key={idx} />
			))}
		</tbody>
	)
}
