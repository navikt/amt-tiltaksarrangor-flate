import { LinkPanel } from '@navikt/ds-react'
import React from 'react'

import styles from './MineDeltakerePanel.module.scss'
import { VeilederInfo } from '../../../../api/data/deltaker'
import { INGEN_ROLLE_PAGE_ROUTE } from '../../../../navigation'
import clipboard from './clipboard.svg'

interface MineDeltakerePanelProps {
    veileder: VeilederInfo
}

export const MineDeltakerePanel = (props: MineDeltakerePanelProps): React.ReactElement<MineDeltakerePanelProps> => {
	return (
		// denne skal peke til ny deltakeroversikt
		<div className={styles.content} >
			<LinkPanel href={INGEN_ROLLE_PAGE_ROUTE} border>
				<div className={styles.linkpanel}>
					<img src={clipboard} alt="Clipboard" className={styles.clipboardimage}/>
					<div>
						<LinkPanel.Title>Mine deltakere</LinkPanel.Title>
						<LinkPanel.Description>Du har rollen som veileder for {props.veileder.veilederFor} deltakere og medveileder for {props.veileder.medveilederFor} deltakere. Her kan du se deltakerne du er tildelt.</LinkPanel.Description>
					</div>
				</div>
			</LinkPanel>
		</div>
	)
}
