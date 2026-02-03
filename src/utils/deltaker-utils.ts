import dayjs from 'dayjs'
import { Adresse, AktivEndring, AktivEndringForDeltaker, Deltaker } from '../api/data/deltaker'
import { Pameldingstype, Tiltakskode } from '../api/data/tiltak'
import { EndringType } from '../component/page/bruker-detaljer/deltaker-detaljer/types'
import { erOpplaringstiltak } from './deltakerliste-utils'

export const INNHOLD_TYPE_ANNET = 'annet'

export const lagAdresseTekst = (adresse: Adresse) => {
  const tilleggsnavn = adresse.tilleggsnavn ? `${adresse.tilleggsnavn}, ` : ''
  const adressenavn = adresse.adressenavn ? `${adresse.adressenavn}, ` : ''
  return `${tilleggsnavn}${adressenavn}${adresse.postnummer} ${adresse.poststed}`
}

export const harAdresse = (tiltakskode: Tiltakskode) =>
  !erOpplaringstiltak(tiltakskode) &&
  tiltakskode !== Tiltakskode.DIGITALT_OPPFOLGINGSTILTAK &&
  tiltakskode !== Tiltakskode.JOBBKLUBB

export const skalViseDeltakelsesmengde = (tiltakskode: Tiltakskode) =>
  [Tiltakskode.ARBEIDSFORBEREDENDE_TRENING, Tiltakskode.VARIG_TILRETTELAGT_ARBEID_SKJERMET].includes(tiltakskode)

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
    case AktivEndring.EndreAvslutning:
      return 'Endre avslutning'
  }
}

export const getAktivEndringTekst = (aktivEndring: AktivEndringForDeltaker) => {
  const typeEndringTekst = getAktivEndringTypeTekst(aktivEndring.endingsType)
  return `Forslag sendt til Nav: ${typeEndringTekst}`
}

export const harDeltattMindreEnnFemtenDager = (deltaker: Deltaker, endringstype?: EndringType) => {
  const startDato = deltaker.startDato
  if (startDato === null) throw Error('startdato er null')

  if (endringstype === EndringType.ENDRE_AVSLUTNING) {
    return deltaker.sluttDato
      ? dayjs(deltaker.startDato)
        .add(15, 'days')
        .isAfter(deltaker.sluttDato, 'day')
      : false
  }

  const femtenDagerSiden = dayjs().subtract(15, 'days')
  return dayjs(startDato).isAfter(femtenDagerSiden, 'day')
}

export const kanDeleDeltakerMedArrangorForVurdering = (
  pameldingstype: Pameldingstype,
  tiltakskode: Tiltakskode
) => {
  return (
    pameldingstype === Pameldingstype.TRENGER_GODKJENNING &&
    (tiltakskode === Tiltakskode.GRUPPE_ARBEIDSMARKEDSOPPLAERING ||
      tiltakskode === Tiltakskode.GRUPPE_FAG_OG_YRKESOPPLAERING ||
      tiltakskode === Tiltakskode.ARBEIDSMARKEDSOPPLAERING ||
      tiltakskode === Tiltakskode.FAG_OG_YRKESOPPLAERING ||
      tiltakskode ===
      Tiltakskode.NORSKOPPLAERING_GRUNNLEGGENDE_FERDIGHETER_FOV ||
      tiltakskode === Tiltakskode.STUDIESPESIALISERING ||
      tiltakskode === Tiltakskode.HOYERE_YRKESFAGLIG_UTDANNING)
  )
}