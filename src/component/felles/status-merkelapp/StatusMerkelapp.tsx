import { Tag } from '@navikt/ds-react'
import React from 'react'

import { DeltakerStatus, TiltakDeltakerStatus } from '../../../api/data/deltaker'
import { mapTiltakDeltagerStatusTilTekst } from '../../../utils/text-mappers'

const getVariant = (statusType: TiltakDeltakerStatus) => {
	switch (statusType) {
		case TiltakDeltakerStatus.IKKE_AKTUELL:
		case TiltakDeltakerStatus.HAR_SLUTTET: return 'warning'
		case TiltakDeltakerStatus.DELTAR: return 'neutral'
		case TiltakDeltakerStatus.VENTER_PA_OPPSTART: return 'info'
	}
}

interface StatusProps {
	status: DeltakerStatus
}

export const StatusMerkelapp = (props: StatusProps) => {
	const { type } = props.status
	return (
		<Tag variant={getVariant(type)} size="small" aria-label="Deltaker status">
			{mapTiltakDeltagerStatusTilTekst(type)}
		</Tag>
	)
}
