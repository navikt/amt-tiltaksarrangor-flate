import { Adressetype, TiltakDeltakerStatus } from '../api/data/deltaker'
import { Veiledertype } from '../api/data/veileder'

export const mapTiltakDeltakerStatusTilTekst = (tiltakDeltakerStatus: typeof TiltakDeltakerStatus | string): string => {
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
			return tiltakDeltakerStatus.toString()
	}
}

export const mapVeilderTypeTilTekst = (veilederType: Veiledertype | string): string => {
	if (veilederType === Veiledertype.MEDVEILEDER) {
		return 'Medveileder'
	} else {
		return 'Veileder'
	}
}

export const mapAdresseTypeTilTekst = (adressetype: Adressetype) => {
	switch (adressetype) {
		case Adressetype.KONTAKTADRESSE:
			return 'Kontaktadresse'
		case Adressetype.OPPHOLDSADRESSE:
			return 'Oppholdsadresse'
		case Adressetype.BOSTEDSADRESSE:
			return 'Bostedsadresse'
	}
}
