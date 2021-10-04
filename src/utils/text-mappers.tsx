import { EtikettFokus, EtikettInfo, EtikettSuksess } from 'nav-frontend-etiketter'
import React from 'react'

import { TiltakDeltagerStatus } from '../domeneobjekter/deltager'
import { TiltakInstansStatus } from '../domeneobjekter/tiltak'

export const mapTiltakInstansStatusTilEtikett = (tiltakInstansStatus: TiltakInstansStatus) => {
	switch (tiltakInstansStatus) {
		case TiltakInstansStatus.IKKE_STARTET:
			return <EtikettInfo>Gjennomføres</EtikettInfo>
		case TiltakInstansStatus.GJENNOMFORES:
			return <EtikettSuksess>Gjennomføres</EtikettSuksess>
		case TiltakInstansStatus.AVSLUTTET:
			return <EtikettFokus>Avsluttet</EtikettFokus>
		default:
			return null
	}
}

export const mapTiltakDeltagerStatusTilEtikett = (tiltakDeltagerStatus: TiltakDeltagerStatus) => {
	switch (tiltakDeltagerStatus) {
		case TiltakDeltagerStatus.GJENNOMFORES:
			return <EtikettSuksess>Gjennomføres</EtikettSuksess>
		case TiltakDeltagerStatus.NY_BRUKER:
			return <EtikettInfo>Ny bruker</EtikettInfo>
		case TiltakDeltagerStatus.AVBRUTT:
			return <EtikettFokus>Avbrutt</EtikettFokus>
		case TiltakDeltagerStatus.FULLFORT:
			return <EtikettSuksess>Fullført</EtikettSuksess>
		default:
			return null
	}
}

export const mapTiltakDeltagerStatusTilTekst = (tiltakDeltagerStatus: TiltakDeltagerStatus): string => {
	switch (tiltakDeltagerStatus) {
		case TiltakDeltagerStatus.GJENNOMFORES:
			return 'Gjennomføres'
		case TiltakDeltagerStatus.NY_BRUKER:
			return 'Ny Bruker'
		case TiltakDeltagerStatus.AVBRUTT:
			return 'Avbrutt'
		case TiltakDeltagerStatus.FULLFORT:
			return 'Fullført'
		default:
			return tiltakDeltagerStatus
	}
}