import { Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { SpaLenkepanel } from '../../../../felles/SpaLenkepanel'
import styles from './TiltakinstansOversiktPanel.module.less'

interface TiltakinstansOversiktPanelProps {
    id: string,
    navn: string,
}

export const TiltakinstansOversiktPanel = (props: TiltakinstansOversiktPanelProps): React.ReactElement<TiltakinstansOversiktPanelProps> => {
	const { id, navn } = props

	return (
		<SpaLenkepanel to={`/instans/${id}`} border>
			<div className={styles.content} >
				<Undertittel>{navn}</Undertittel>
			</div>
		</SpaLenkepanel>
	)
}
