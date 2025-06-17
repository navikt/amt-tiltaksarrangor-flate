import { Adresse, AktivEndring, AktivEndringForDeltaker, Deltaker } from '../api/data/deltaker'
import { Tiltakskode } from '../api/data/tiltak'

export const INNHOLD_TYPE_ANNET = 'annet'

export const lagAdresseTekst = (adresse: Adresse) => {
  const tilleggsnavn = adresse.tilleggsnavn ? `${adresse.tilleggsnavn}, ` : ''
  const adressenavn = adresse.adressenavn ? `${adresse.adressenavn}, ` : ''
  return `${tilleggsnavn}${adressenavn}${adresse.postnummer} ${adresse.poststed}`
}

export const TILTAK_UTEN_DELTAKER_ADRESSE = [
  Tiltakskode.DIGIOPPARB, // Digitalt jobbsøkerkurs
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

const getAktivEndringTypeTekst = (aktivEndringType: AktivEndring) => {
  switch (aktivEndringType) {
    case AktivEndring.IkkeAktuell:
      return 'Er ikke aktuell'
    case AktivEndring.ForlengDeltakelse:
      return 'Forleng deltakelse'
    case AktivEndring.AvsluttDeltakelse:
      return 'Avslutt deltakelse'
    case AktivEndring.Deltakelsesmengde:
      return 'Endre deltakelsesmengde'
    case AktivEndring.Sluttarsak:
      return 'Endre sluttårsak'
    case AktivEndring.Startdato:
      return 'Endre oppstartsdato'
    case AktivEndring.Sluttdato:
      return 'Endre sluttdato'
    case AktivEndring.LeggTilOppstartsDato:
      return 'Legg til oppstartsdato'
    case AktivEndring.FjernOppstartsdato:
      return 'Fjern oppstartsdato'
  }
}

export const getAktivEndringTekst = (aktivEndring: AktivEndringForDeltaker) => {
  const typeEndringTekst = getAktivEndringTypeTekst(aktivEndring.endingsType)
  return `Forslag sendt til Nav: ${typeEndringTekst}`
}

export const harDeltattMindreEnnFemtenDager = (deltaker: Deltaker) => {
  const startDato = deltaker.startDato
  if (startDato === null) throw Error('startdato er null')
  const femtenDagerSiden = new Date()
  femtenDagerSiden.setDate(femtenDagerSiden.getDate() - 15)
  return startDato > femtenDagerSiden
}
