import { Tag } from '@navikt/ds-react'
import React from 'react'

import { DeltakerStatus, TiltakDeltakerStatus } from '../../../api/data/deltaker'
import { mapTiltakDeltagerStatusTilTekst } from '../../../utils/text-mappers'
import styles from './StatusMerkelapp.module.scss'

const getStyle = (statusType: TiltakDeltakerStatus) => {
	switch (statusType) {
		case TiltakDeltakerStatus.IKKE_AKTUELL:
		case TiltakDeltakerStatus.HAR_SLUTTET: return styles.statusTagOrange
		case TiltakDeltakerStatus.DELTAR: return styles.statusTagHvit
		case TiltakDeltakerStatus.VENTER_PA_OPPSTART: return styles.statusTagBla
	}
}

interface StatusProps {
    status: DeltakerStatus
}

export const StatusMerkelapp = (props: StatusProps) => {
	const { type } = props.status
	return(
		<Tag variant="info" size="small" className={getStyle(type)} aria-label="Deltaker status">
			{mapTiltakDeltagerStatusTilTekst(type)}
		</Tag>
	)
}


