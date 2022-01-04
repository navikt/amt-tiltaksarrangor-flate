import React from 'react'

import { TiltakDeltaker } from '../../../../domeneobjekter/deltaker'
import { Rad } from './Rad'
import styles from './TabellBody.module.less'

interface TabellBodyProps {
	brukere: TiltakDeltaker[];
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
