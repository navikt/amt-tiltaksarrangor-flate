import { BodyShort } from '@navikt/ds-react'
import cls from 'classnames'
import React from 'react'

import { EMDASH } from '../../../../utils/constants'
import styles from './IconLabel.module.scss'

interface IconLabelProps {
	labelValue: string | undefined | null,
	icon: React.ReactElement,
	iconWrapperClassName?: string
}

export function IconLabel(props: IconLabelProps): React.ReactElement {
	return (
		<div className={styles.iconWrapper}>
			<div className={cls(styles.iconLabelIconWrapper, props.iconWrapperClassName)}>{props.icon}</div>
			<BodyShort className={styles.labelValue}>{props.labelValue || EMDASH}</BodyShort>
		</div>
	)
}
