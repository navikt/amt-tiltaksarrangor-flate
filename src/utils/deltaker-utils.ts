import { Adresse } from '../api/data/deltaker'
import { Tiltakskode } from '../api/data/tiltak'

export const lagAdresseTekst = (adresse: Adresse) => {
	const tilleggsnavn = adresse.tilleggsnavn ? `${adresse.tilleggsnavn}, ` : ''
	const adressenavn = adresse.adressenavn ? `${adresse.adressenavn}, ` : ''
	return `${tilleggsnavn}${adressenavn}${adresse.postnummer} ${adresse.poststed}`
}

export const TILTAK_UTEN_DELTAKER_ADRESSE = [
	Tiltakskode.DIGIOPPARB, // Digitalt oppfølgingstiltak
	Tiltakskode.JOBBK, // jobbklubb
	Tiltakskode.GRUPPEAMO, // GruppeAMO
	Tiltakskode.GRUFAGYRKE, // Gruppe Fag og yrkesopplæring
]

export const skalTiltakViseAdresse = ( tiltakskode: Tiltakskode ) => {
	if ( TILTAK_UTEN_DELTAKER_ADRESSE.includes( tiltakskode )){
		return false
	}
	return true
}