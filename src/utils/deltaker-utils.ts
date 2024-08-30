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
  Tiltakskode.GRUFAGYRKE // Gruppe Fag og yrkesopplæring
]

export const skalTiltakViseAdresse = (tiltakskode: Tiltakskode) => {
  if (TILTAK_UTEN_DELTAKER_ADRESSE.includes(tiltakskode)) {
    return false
  }
  return true
}

export const skalViseDeltakelsesmengde = (tiltakskode: Tiltakskode) =>
  [Tiltakskode.ARBFORB, Tiltakskode.VASV].includes(tiltakskode)

export const getDagerPerUkeTekst = (dagerPerUke: number): string => {
  if (dagerPerUke === 1) {
    return `${dagerPerUke} dag i uka`
  } else {
    return `${dagerPerUke} dager i uka`
  }
}

export const getDeltakelsesmengdetekst = (
  deltakelsesprosent: number | null,
  dagerPerUke: number | null
) => {
  const dagerIUkaText = dagerPerUke
    ? `fordelt på ${dagerPerUke} ${dagerPerUke > 1 ? 'dager' : 'dag'} i uka`
    : ''
  return `${deltakelsesprosent ?? 100}\u00A0% ${dagerIUkaText}`
}

