import { BodyShort } from '@navikt/ds-react'
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
			<BodyShort as="span" className={styles.labelTittel}>{title}</BodyShort>
			<BodyShort>{value || EMDASH}</BodyShort>
		</div>
	)
}