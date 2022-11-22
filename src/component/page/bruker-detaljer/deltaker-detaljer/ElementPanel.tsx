import { BodyShort } from '@navikt/ds-react'
import React from 'react'

import styles from './ElementPanel.module.scss'

interface ElementPanelProps {
	tittel: string
	children: React.ReactElement
}

export const ElementPanel = ({ tittel, children }: ElementPanelProps): React.ReactElement => {
	return (
		<div className={styles.wrapper}>
			<BodyShort size="small" className={styles.tittel}>{tittel}</BodyShort>
			{children}
		</div>
	)
}