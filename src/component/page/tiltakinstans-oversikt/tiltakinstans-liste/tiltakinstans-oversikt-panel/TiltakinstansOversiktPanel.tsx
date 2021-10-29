import { Element, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import globalStyles from '../../../../../globals.module.less'
import { dateStrWithMonthName } from '../../../../../utils/date-utils'
import { SpaLenkepanel } from '../../../../felles/SpaLenkepanel'
import styles from './TiltakinstansOversiktPanel.module.less'

interface TiltakinstansOversiktPanelProps {
    id: string,
    navn: string,
    deltakere?: number
    oppstart?: Date,
}

export const TiltakinstansOversiktPanel = (props: TiltakinstansOversiktPanelProps) => {
	const { id, navn, deltakere, oppstart } = props

	return (
		<SpaLenkepanel to={`/instans/${id}`} border>
			<div className={styles.content} >
				<Element className={globalStyles.blokkXxs}>{navn}</Element>
				<div className={styles.undertekst}>
					{ deltakere !== undefined && <Normaltekst>{`Antall deltakere: ${deltakere}`}</Normaltekst> }
					{ oppstart && <Normaltekst>{`Oppstart: ${dateStrWithMonthName(oppstart)}`}</Normaltekst> }
				</div>
			</div>
		</SpaLenkepanel>
	)
}
