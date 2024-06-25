import { BodyShort, Label } from '@navikt/ds-react'
import React from 'react'
import styles from './LabelValue.module.scss'

interface Props {
	textColor?: 'subtle' | 'default',
	title: string,
	children: React.ReactElement | string
}

export const LabelValue = ({ textColor, title, children }: Props): React.ReactElement => (
	<BodyShort size="small" className={ styles.wrapper }>
		<Label className={ styles.label } textColor={ textColor ?? 'default' } size="small">{ title }:</Label>
		{ children }
	</BodyShort>
)

