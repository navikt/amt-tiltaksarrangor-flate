import { Heading } from '@navikt/ds-react'
import React from 'react'

import { internalUrl } from '../../../../utils/url-utils'
import { SpaLenkepanel } from '../../../felles/spa-lenkepanel/SpaLenkepanel'
import styles from './GjennomforingListePanel.module.less'

interface GjennomforingListePanelProps {
    id: string,
    navn: string,
}

export const GjennomforingListePanel = (props: GjennomforingListePanelProps): React.ReactElement<GjennomforingListePanelProps> => {
	const { id, navn } = props

	return (
		<SpaLenkepanel to={internalUrl(`/gjennomforing/${id}`)}>
			<div className={styles.content} >
				<Heading size="small">{navn}</Heading>
			</div>
		</SpaLenkepanel>
	)
}
