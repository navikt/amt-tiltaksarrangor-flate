import { TiltakDeltakerStatus } from '../api/data/deltaker'

export const mapTiltakDeltagerStatusTilTekst = (tiltakDeltakerStatus: TiltakDeltakerStatus | string): string => {
	switch (tiltakDeltakerStatus) {
		case TiltakDeltakerStatus.VENTER_PA_OPPSTART:
			return 'Venter på oppstart'
		case TiltakDeltakerStatus.DELTAR:
			return 'Deltar'
		case TiltakDeltakerStatus.HAR_SLUTTET:
			return 'Har sluttet'
		case TiltakDeltakerStatus.IKKE_AKTUELL:
			return 'Ikke aktuell'
		case TiltakDeltakerStatus.VURDERES:
			return 'Vurderes'
		case TiltakDeltakerStatus.FULLFORT:
			return 'Fullført'
		case TiltakDeltakerStatus.AVBRUTT:
			return 'Avbrutt'
		default:
			return tiltakDeltakerStatus
	}
}
