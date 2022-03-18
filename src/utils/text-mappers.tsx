import { TiltakDeltakerStatus } from '../api/data/deltaker'

export const mapTiltakDeltagerStatusTilTekst = (tiltakDeltagerStatus: TiltakDeltakerStatus): string => {
	switch (tiltakDeltagerStatus) {
		case TiltakDeltakerStatus.VENTER_PA_OPPSTART:
			return 'Venter på oppstart'
		case TiltakDeltakerStatus.DELTAR:
			return 'Deltar'
		case TiltakDeltakerStatus.HAR_SLUTTET:
			return 'Har sluttet'
		case TiltakDeltakerStatus.IKKE_AKTUELL:
			return 'Ikke aktuell'
		default:
			return tiltakDeltagerStatus
	}
}
