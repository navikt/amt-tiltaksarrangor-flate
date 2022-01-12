import { BodyShort, Heading } from '@navikt/ds-react'
import cls from 'classnames'
import React from 'react'

import { EMDASH } from '../../../../utils/constants'
import styles from './Label.module.scss'

interface LabelProps {
	title: string;
	value: string | undefined | null;
	className?: string;
}

export const Label = (props: LabelProps): React.ReactElement<LabelProps> => {
	const { title, value, className } = props
	return (
		<div className={cls(styles.label, className)}>
			<Heading size="xsmall">{title}</Heading>
			<BodyShort>{value || EMDASH}</BodyShort>
		</div>
	)
}