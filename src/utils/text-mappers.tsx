import { EtikettFokus, EtikettInfo, EtikettSuksess } from 'nav-frontend-etiketter'
import React from 'react'

import { TiltakDeltakerStatus } from '../domeneobjekter/deltaker'

export const mapTiltakDeltagerStatusTilEtikett = (tiltakDeltagerStatus: TiltakDeltakerStatus): React.ReactElement | null => {
	switch (tiltakDeltagerStatus) {
		case TiltakDeltakerStatus.VENTER_PA_OPPSTART:
			return <EtikettSuksess>Venter på oppstart</EtikettSuksess>
		case TiltakDeltakerStatus.GJENNOMFORES:
			return <EtikettSuksess>Gjennomføres</EtikettSuksess>
		case TiltakDeltakerStatus.HAR_SLUTTET:
			return <EtikettInfo>Har sluttet</EtikettInfo>
		case TiltakDeltakerStatus.IKKE_AKTUELL:
			return <EtikettFokus>Ikke aktuell</EtikettFokus>
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