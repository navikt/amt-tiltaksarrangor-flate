import { Heading } from '@navikt/ds-react'
import React, { ReactNode } from 'react'

import globalStyles from '../../../../globals.module.scss'
import styles from './DeltakerListe.module.scss'

interface TiltakSectionProps {
	children: ReactNode,
	key: number,
	navn: string
}

export const TiltakSection = ({ children, navn }: TiltakSectionProps) => {
	return (
		<div key={navn} className={globalStyles.blokkL}>
			<Heading className={globalStyles.blokkS} size="xsmall" level="2">{navn}</Heading>
			<ul className={styles.cleanList}>
				{children}
			</ul>
		</div>
	)
}