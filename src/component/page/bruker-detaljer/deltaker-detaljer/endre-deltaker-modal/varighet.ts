import dayjs from 'dayjs'
import { Tiltakskode } from '../../../../../api/data/tiltak'

export enum VarighetValg {
  IKKE_VALGT,
  ANNET,
  FIRE_UKER,
  SEKS_UKER,
  ATTE_UKER,
  TOLV_UKER,
  TRE_MANEDER,
  SEKS_MANEDER,
  TOLV_MANEDER
}

export interface Varighet {
  antall: number
  tidsenhet: 'day' | 'week' | 'month' | 'year'
  navn: string
}

type Varigheter = {
  [valg: number]: Varighet
}

export const varigheter: Varigheter = {
  [VarighetValg.FIRE_UKER]: { antall: 4, tidsenhet: 'week', navn: '4 uker' },
  [VarighetValg.SEKS_UKER]: { antall: 6, tidsenhet: 'week', navn: '6 uker' },
  [VarighetValg.ATTE_UKER]: { antall: 8, tidsenhet: 'week', navn: '8 uker' },
  [VarighetValg.TOLV_UKER]: { antall: 12, tidsenhet: 'week', navn: '12 uker' },
  [VarighetValg.TRE_MANEDER]: {
    antall: 3,
    tidsenhet: 'month',
    navn: '3 måneder'
  },
  [VarighetValg.SEKS_MANEDER]: {
    antall: 6,
    tidsenhet: 'month',
    navn: '6 måneder'
  },
  [VarighetValg.TOLV_MANEDER]: {
    antall: 12,
    tidsenhet: 'month',
    navn: '12 måneder'
  }
}

export const varighetValgForKode = (
  tiltakskode: Tiltakskode,
  erForOppstartsdato?: boolean
): VarighetValg[] => {
  switch (tiltakskode) {
    case Tiltakskode.ARBEIDSFORBEREDENDE_TRENING:
      return [
        VarighetValg.TRE_MANEDER,
        VarighetValg.SEKS_MANEDER,
        VarighetValg.TOLV_MANEDER
      ]
    case Tiltakskode.ARBEIDSRETTET_REHABILITERING:
      return [
        VarighetValg.FIRE_UKER,
        VarighetValg.SEKS_UKER,
        VarighetValg.TOLV_UKER
      ]
    case Tiltakskode.AVKLARING:
      return [VarighetValg.FIRE_UKER, VarighetValg.ATTE_UKER]
    case Tiltakskode.OPPFOLGING:
      return [VarighetValg.TRE_MANEDER, VarighetValg.SEKS_MANEDER]
    case Tiltakskode.DIGITALT_OPPFOLGINGSTILTAK:
      return erForOppstartsdato
        ? [ VarighetValg.FIRE_UKER, VarighetValg.ATTE_UKER ]
        : [ VarighetValg.FIRE_UKER ]
    case Tiltakskode.VARIG_TILRETTELAGT_ARBEID_SKJERMET:
      return [ VarighetValg.SEKS_MANEDER, VarighetValg.TOLV_MANEDER ]
    case Tiltakskode.JOBBKLUBB:
      return [
        VarighetValg.FIRE_UKER,
        VarighetValg.SEKS_UKER,
        VarighetValg.ATTE_UKER,
        VarighetValg.TOLV_UKER,
        VarighetValg.TRE_MANEDER
      ]
    default:
      return []
  }
}

export function finnValgtVarighet(
  fraDato: Date | null | undefined,
  tilDato: Date | null | undefined,
  tiltakskode: Tiltakskode
) {
  return fraDato && tilDato
    ? finnVarighetValgForTiltakskode(fraDato, tilDato, tiltakskode)
    : undefined
}

function finnVarighetValgForTiltakskode(
  fraDato: Date,
  tilDato: Date,
  tiltakskode: Tiltakskode
) {
  const varighet = finnVarighetValg(fraDato, tilDato)
  const varigheter = varighetValgForKode(tiltakskode)

  if (varigheter.includes(varighet.uker)) {
    return varighet.uker
  } else if (varigheter.includes(varighet.maaneder)) {
    return varighet.maaneder
  } else {
    return VarighetValg.ANNET
  }
}

function finnVarighetValg(
  fraDato: Date,
  tilDato: Date
): { uker: VarighetValg; maaneder: VarighetValg } {
  const fra = dayjs(fraDato)
  const til = dayjs(tilDato)

  const uker = til.diff(fra, 'weeks')
  const maaneder = til.diff(fra, 'months')

  const erIkkeDelbarIVarigheter =
    fra.add(uker, 'weeks').isBefore(til) &&
    fra.add(maaneder, 'months').isBefore(til)

  if (erIkkeDelbarIVarigheter) {
    return {
      uker: VarighetValg.ANNET,
      maaneder: VarighetValg.ANNET
    }
  }

  const ukeVarighet = () => {
    switch (uker) {
      case 4:
        return VarighetValg.FIRE_UKER
      case 6:
        return VarighetValg.SEKS_UKER
      case 8:
        return VarighetValg.ATTE_UKER
      case 12:
        return VarighetValg.TOLV_UKER
      default:
        return VarighetValg.ANNET
    }
  }

  const mndVarighet = () => {
    switch (maaneder) {
      case 3:
        return VarighetValg.TRE_MANEDER
      case 6:
        return VarighetValg.SEKS_MANEDER
      case 12:
        return VarighetValg.TOLV_MANEDER
      default:
        return VarighetValg.ANNET
    }
  }

  return {
    uker: ukeVarighet(),
    maaneder: mndVarighet()
  }
}

/*
 * Finner maksimal varighet for en tiltakskode.
 * Denne sjekken er enklere enn i nav-veiledersflate,
 * fordi vi ønsker at tiltaksarrangør ikke skal behøve
 * å ta høyde for forskjellige innsatsgrupper.
 *
 * Vi bruker en mindre presis beregning av varigheten av en
 * periode enn det vi kunne har gjort hvis vi brukte år og måned enhetene i dayjs.
 * Dette for å få den mer lik varigheten som blir beregnet i nav-veiledersflate i dag.
 * Hvis dette ikke gjøres vil maks varighet ofte være noe lengre hos tiltaksarrangør enn nav.
 */
export function maxVarighetMillisFor(
  tiltakskode: Tiltakskode
): number | undefined {
  const dagMs = 24 * 60 * 60 * 1000
  const ukerMs = (n: number) => n * 7 * dagMs
  const maanederMs = (n: number) => n * 30 * dagMs
  const aarMs = (n: number) => n * 365 * dagMs

  switch (tiltakskode) {
    case Tiltakskode.GRUPPE_ARBEIDSMARKEDSOPPLAERING:
    case Tiltakskode.ARBEIDSMARKEDSOPPLAERING:
    case Tiltakskode.ARBEIDSFORBEREDENDE_TRENING:
      return aarMs(3)
    case Tiltakskode.ARBEIDSRETTET_REHABILITERING:
    case Tiltakskode.AVKLARING:
      return ukerMs(17)
    case Tiltakskode.DIGITALT_OPPFOLGINGSTILTAK:
      return ukerMs(13)
    case Tiltakskode.GRUPPE_FAG_OG_YRKESOPPLAERING:
    case Tiltakskode.HOYERE_UTDANNING:
    case Tiltakskode.HOYERE_YRKESFAGLIG_UTDANNING:
    case Tiltakskode.NORSKOPPLAERING_GRUNNLEGGENDE_FERDIGHETER_FOV:
    case Tiltakskode.STUDIESPESIALISERING:
      return aarMs(4)
    case Tiltakskode.OPPFOLGING:
      return aarMs(3) + maanederMs(6)
    case Tiltakskode.JOBBKLUBB:
    case Tiltakskode.VARIG_TILRETTELAGT_ARBEID_SKJERMET:
    case Tiltakskode.ENKELTPLASS_ARBEIDSMARKEDSOPPLAERING:
    case Tiltakskode.ENKELTPLASS_FAG_OG_YRKESOPPLAERING:
      return undefined
    case Tiltakskode.FAG_OG_YRKESOPPLAERING:
      return aarMs(5)
  }
}

export function maxVarighetLeggTilOppstartsDatoMillisFor(
  tiltakskode: Tiltakskode
): number | undefined {
  const dagMs = 24 * 60 * 60 * 1000
  const ukerMs = (n: number) => n * 7 * dagMs
  const aarMs = (n: number) => n * 365 * dagMs

  switch (tiltakskode) {
    case Tiltakskode.GRUPPE_ARBEIDSMARKEDSOPPLAERING:
    case Tiltakskode.GRUPPE_FAG_OG_YRKESOPPLAERING:
    case Tiltakskode.ARBEIDSMARKEDSOPPLAERING:
      return aarMs(3)
    case Tiltakskode.DIGITALT_OPPFOLGINGSTILTAK:
      return ukerMs(8) + (dagMs * 6)
    case Tiltakskode.ARBEIDSFORBEREDENDE_TRENING:
      return aarMs(2)
    case Tiltakskode.ARBEIDSRETTET_REHABILITERING:
    case Tiltakskode.AVKLARING:
      return ukerMs(12)
    case Tiltakskode.OPPFOLGING:
      return aarMs(1)
    case Tiltakskode.JOBBKLUBB:
    case Tiltakskode.VARIG_TILRETTELAGT_ARBEID_SKJERMET:
    case Tiltakskode.ENKELTPLASS_ARBEIDSMARKEDSOPPLAERING:
    case Tiltakskode.ENKELTPLASS_FAG_OG_YRKESOPPLAERING:
      return undefined
    case Tiltakskode.HOYERE_UTDANNING:
    case Tiltakskode.HOYERE_YRKESFAGLIG_UTDANNING:
    case Tiltakskode.NORSKOPPLAERING_GRUNNLEGGENDE_FERDIGHETER_FOV:
    case Tiltakskode.STUDIESPESIALISERING:
      return aarMs(4)
    case Tiltakskode.FAG_OG_YRKESOPPLAERING:
      return aarMs(5)
  }
}
