import { TiltakDeltakerStatus } from '../domeneobjekter/deltaker'

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