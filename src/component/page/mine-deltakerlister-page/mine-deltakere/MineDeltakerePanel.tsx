import { LinkPanel } from '@navikt/ds-react'
import React from 'react'

import { Link } from 'react-router-dom'
import styles from './MineDeltakerePanel.module.scss'
import { VeilederFor } from '../../../../api/data/deltaker'
import { MINE_DELTAKERE_PAGE_ROUTE } from '../../../../navigation'
import clipboard from './clipboard.svg'

interface MineDeltakerePanelProps {
    veileder: VeilederFor
}

export const MineDeltakerePanel = (props: MineDeltakerePanelProps): React.ReactElement<MineDeltakerePanelProps> => {
	return (
		<div className={styles.content} >
			<Link to={ MINE_DELTAKERE_PAGE_ROUTE } className={ styles.link } >
				<LinkPanel border >
					<div className={styles.linkpanel}>
						<img src={clipboard} alt="Clipboard" className={styles.clipboardimage}/>
						<div>
							<LinkPanel.Title>Mine deltakere</LinkPanel.Title>
							<LinkPanel.Description>Du er veileder for {props.veileder.veilederFor} deltakere og medveileder for {props.veileder.medveilederFor} deltakere.</LinkPanel.Description>
						</div>
					</div>
				</LinkPanel>
			</Link>
		</div>
	)
}
