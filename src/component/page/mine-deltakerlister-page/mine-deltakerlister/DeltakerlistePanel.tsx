import { BodyShort } from '@navikt/ds-react'
import React from 'react'

import globalStyles from '../../../../globals.module.scss'
import { gjennomforingDetaljerPageUrl } from '../../../../navigation'
import { SpaLenkepanel } from '../../../felles/spa-lenkepanel/SpaLenkepanel'
import styles from './DeltakerlistePanel.module.scss'

interface DeltakerlistePanelProps {
    id: string,
    navn: string,
}

export const DeltakerlistePanel = (props: DeltakerlistePanelProps): React.ReactElement<DeltakerlistePanelProps> => {
	const { id, navn } = props

	return (
		<li className={globalStyles.blokkS}>
			<SpaLenkepanel to={gjennomforingDetaljerPageUrl(id)}>
				<div className={styles.content} >
					<BodyShort as="span" className={styles.panelTittel}>{navn}</BodyShort>
				</div>
			</SpaLenkepanel>
		</li>
	)
}
