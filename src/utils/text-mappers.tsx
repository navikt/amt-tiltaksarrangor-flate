import { Tag } from '@navikt/ds-react'
import React from 'react'

import { TiltakDeltakerStatus } from '../domeneobjekter/deltaker'

export const mapTiltakDeltagerStatusTilEtikett = (tiltakDeltagerStatus: TiltakDeltakerStatus): React.ReactElement | null => {
	switch (tiltakDeltagerStatus) {
		case TiltakDeltakerStatus.VENTER_PA_OPPSTART:
			return <Tag variant="success">Venter på oppstart</Tag>
		case TiltakDeltakerStatus.GJENNOMFORES:
			return <Tag variant="success">Gjennomføres</Tag>
		case TiltakDeltakerStatus.HAR_SLUTTET:
			return <Tag variant="info">Har sluttet</Tag>
		case TiltakDeltakerStatus.IKKE_AKTUELL:
			return <Tag variant="warning">Ikke aktuell</Tag>
		default:
			return null
	}
}

export const mapTiltakDeltagerStatusTilTekst = (tiltakDeltagerStatus: TiltakDeltakerStatus): string => {
	switch (tiltakDeltagerStatus) {
		case TiltakDeltakerStatus.VENTER_PA_OPPSTART:
			return 'Venter på oppstart'
		case TiltakDeltakerStatus.GJENNOMFORES:
			return 'Gjennomføres'
		case TiltakDeltakerStatus.HAR_SLUTTET:
			return 'Har sluttet'
		case TiltakDeltakerStatus.IKKE_AKTUELL:
			return 'Ikke aktuell'
		default:
			return tiltakDeltagerStatus
	}
}