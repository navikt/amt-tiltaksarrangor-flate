import { Back } from '@navikt/ds-icons'
import { Button } from '@navikt/ds-react'
import cls from 'classnames'
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
			<Button variant="tertiary"><Back/>Tilbake</Button>
		</Link>
	)
}