import {EtikettFokus, EtikettInfo, EtikettSuksess} from 'nav-frontend-etiketter'
import React from 'react'

import {TiltakDeltagerStatus} from '../domeneobjekter/deltager'

export const mapTiltakDeltagerStatusTilEtikett = (tiltakDeltagerStatus: TiltakDeltagerStatus): React.ReactElement | null => {
	switch (tiltakDeltagerStatus) {
		case TiltakDeltagerStatus.VENTER_PA_OPPSTART:
			return <EtikettSuksess>Venter på oppstart</EtikettSuksess>
		case TiltakDeltagerStatus.GJENNOMFORES:
			return <EtikettSuksess>Gjennomføres</EtikettSuksess>
		case TiltakDeltagerStatus.HAR_SLUTTET:
			return <EtikettInfo>Har sluttet</EtikettInfo>
		case TiltakDeltagerStatus.IKKE_AKTUELL:
			return <EtikettFokus>Ikke aktuell</EtikettFokus>
		default:
			return null
	}
}

export const mapTiltakDeltagerStatusTilTekst = (tiltakDeltagerStatus: TiltakDeltagerStatus): string => {
	switch (tiltakDeltagerStatus) {
		case TiltakDeltagerStatus.VENTER_PA_OPPSTART:
			return 'Venter på oppstart'
		case TiltakDeltagerStatus.GJENNOMFORES:
			return 'Gjennomføres'
		case TiltakDeltagerStatus.HAR_SLUTTET:
			return 'Har sluttet'
		case TiltakDeltagerStatus.IKKE_AKTUELL:
			return 'Ikke aktuell'
		default:
			return tiltakDeltagerStatus
	}
}