import { BodyShort } from '@navikt/ds-react'
import cls from 'classnames'
import React from 'react'

import styles from './ElementPanel.module.scss'

interface ElementPanelProps {
	tittel: string
	className?: string
	children: React.ReactElement
}

export const ElementPanel = ({ tittel, children, className }: ElementPanelProps): React.ReactElement => {
	return (
		<div className={cls(styles.wrapper, className)}>
			<BodyShort size="small">
				<span className={styles.tittel}>
					{tittel}
				</span>
				{children}
			</BodyShort>
		</div>
	)
}