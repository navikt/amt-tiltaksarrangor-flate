import { Back } from '@navikt/ds-icons'
import cls from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'

import styles from './Tilbakelenke.module.scss'

interface TilbakelenkeProps {
	to: string
	className?: string
}

export const Tilbakelenke = (props: TilbakelenkeProps): React.ReactElement<TilbakelenkeProps> => {

	return (
		<Link to={props.to} className={cls(styles.tilbakelenke, props.className)}>
			<Back className={styles.pil}/>
			Tilbake
		</Link>
	)
}