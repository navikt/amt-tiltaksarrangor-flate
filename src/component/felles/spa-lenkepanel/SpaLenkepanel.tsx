import { ChevronRightIcon } from '@navikt/aksel-icons'
import cls from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'

import styles from './SpaLenkepanel.module.scss'

interface SpaLenkepanelProps {
	to: string
	children?: React.ReactNode
	className?: string
}

export const SpaLenkepanel = (props: SpaLenkepanelProps): React.ReactElement<SpaLenkepanelProps> => {
	const { to, children, className } = props

	return (
		<Link to={to} className={cls('navds-link-panel', styles.spaLenkepanel, className)}>
			<div className="navds-link-panel__content">{children}</div>
			<ChevronRightIcon className="navds-link-panel__chevron" />
		</Link>
	)
}
