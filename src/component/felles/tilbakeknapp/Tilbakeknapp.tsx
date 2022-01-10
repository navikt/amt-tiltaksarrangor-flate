import cls from 'classnames'
import { Tilbakeknapp as NavTilbakeknapp } from 'nav-frontend-ikonknapper'
import React from 'react'
import { Link } from 'react-router-dom'

import { internalUrl } from '../../../utils/url-utils'
import styles from './Tilbakeknapp.module.less'

interface TilbakeknappProps {
	to: string
	className?: string
}

export const Tilbakeknapp = (props: TilbakeknappProps): React.ReactElement<TilbakeknappProps> => {

	return (
		<Link to={internalUrl(props.to)} className={cls(styles.tilbakeknapp, props.className)}>
			<NavTilbakeknapp />
		</Link>
	)
}