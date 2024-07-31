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

export const varighetValgForType = (
  tiltakstype: Tiltakskode
): VarighetValg[] => {
  switch (tiltakstype) {
    case Tiltakskode.ARBFORB:
      return [
        VarighetValg.TRE_MANEDER,
        VarighetValg.SEKS_MANEDER,
        VarighetValg.TOLV_MANEDER
      ]
    case Tiltakskode.ARBRRHDAG:
      return [
        VarighetValg.FIRE_UKER,
        VarighetValg.SEKS_UKER,
        VarighetValg.TOLV_UKER
      ]
    case Tiltakskode.AVKLARAG:
      return [VarighetValg.FIRE_UKER, VarighetValg.ATTE_UKER]
    case Tiltakskode.INDOPPFAG:
      return [VarighetValg.TRE_MANEDER, VarighetValg.SEKS_MANEDER]
    case Tiltakskode.DIGIOPPARB:
      return [VarighetValg.FIRE_UKER]
    case Tiltakskode.VASV:
      return [VarighetValg.SEKS_MANEDER, VarighetValg.TOLV_MANEDER]
    case Tiltakskode.GRUFAGYRKE:
    default:
      return [
        VarighetValg.FIRE_UKER,
        VarighetValg.SEKS_UKER,
        VarighetValg.ATTE_UKER,
        VarighetValg.TOLV_UKER,
        VarighetValg.TRE_MANEDER
      ]
  }
}

export function finnValgtVarighet(
  fraDato: Date | null | undefined,
  tilDato: Date | null | undefined,
  tiltakstype: Tiltakskode
) {
  return fraDato && tilDato
    ? finnVarighetValgForTiltakstype(fraDato, tilDato, tiltakstype)
    : undefined
}

function finnVarighetValgForTiltakstype(
  fraDato: Date,
  tilDato: Date,
  tiltakstype: Tiltakskode
) {
  const varighet = finnVarighetValg(fraDato, tilDato)
  const varigheter = varighetValgForType(tiltakstype)

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
