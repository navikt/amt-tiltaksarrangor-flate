import { Adresse } from '../api/data/deltaker'
import { Tiltakskode } from '../api/data/tiltak'
import { Nullable } from './types/or-nothing'

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

export const skalViseDeltakelsesmengde = ( tiltakskode: Tiltakskode ) => [ Tiltakskode.ARBFORB, Tiltakskode.VASV ]
	.includes( tiltakskode )

export const getDagerPerUkeTekst = ( dagerPerUke: number ): string => {
	if ( dagerPerUke === 1 ) {
		return `${dagerPerUke} dag i uka`
	} else {
		return `${dagerPerUke} dager i uka`
	}
}

export const getDeltakelsesmengdetekst = ( deltakelseProsent: Nullable<number>, dagerPerUke: Nullable<number> ): string => {
	if ( ( deltakelseProsent === null || deltakelseProsent === undefined ) && ( !dagerPerUke || dagerPerUke < 1 || dagerPerUke > 5 ) ) {
		return 'Ikke satt'
	} else if ( deltakelseProsent === 100 || !dagerPerUke || dagerPerUke < 1 || dagerPerUke > 5 ) {
		return `${deltakelseProsent}%`
	} else if ( deltakelseProsent !== null ) {
		return `${deltakelseProsent}% ${getDagerPerUkeTekst( dagerPerUke )}`
	} else {
		return `${getDagerPerUkeTekst( dagerPerUke )}`
	}
}