import React from 'react'

import styles from './EndringTypeIkon.module.scss'
import {EndringType} from './types'
import {
  CaretRightCircleFillIcon,
  ChevronRightCircleFillIcon,
  ChevronRightDoubleCircleFillIcon,
  ChevronRightLastCircleFillIcon,
  MenuElipsisHorizontalCircleFillIcon,
  MinusCircleFillIcon,
  PieChartFillIcon,
  PlusCircleFillIcon
} from '@navikt/aksel-icons'
import {EndringType as HistorikkEndringType, TiltakskoordinatorEndringsType} from '../../../../api/data/historikk'
import {ForslagEndringType} from '../../../../api/data/forslag'
import {UlestEndringType} from '../../../../api/data/ulestEndring'

interface EndringTypeIkonProps {
  type: EndringType | HistorikkEndringType | ForslagEndringType | TiltakskoordinatorEndringsType | UlestEndringType
  size?: 'medium' | 'large' | 'small'
}

const sizeName = (size?: 'small' | 'medium' | 'large') => {
  if (size === 'large') {
    return styles.ikon_large
  } else if (size === 'small') {
    return styles.ikon_small
  } else {
    return styles.ikon_medium
  }
}

export const EndringTypeIkon = ({ type, size }: EndringTypeIkonProps) => {

  switch (type) {
    case HistorikkEndringType.EndreStartdato:
    case ForslagEndringType.Startdato:
    case EndringType.LEGG_TIL_OPPSTARTSDATO:
    case EndringType.ENDRE_OPPSTARTSDATO:
      return (
        <ChevronRightCircleFillIcon
          className={sizeName(size)}
          aria-hidden
          color="var(--a-deepblue-300)"
        />
      )
    case HistorikkEndringType.ForlengDeltakelse:
    case ForslagEndringType.ForlengDeltakelse:
    case EndringType.FORLENG_DELTAKELSE:
      return (
        <ChevronRightDoubleCircleFillIcon
          className={sizeName(size)}
          aria-hidden
          color="var(--a-icon-success)"
        />
      )
    case HistorikkEndringType.AvsluttDeltakelse:
    case HistorikkEndringType.EndreSluttdato:
    case HistorikkEndringType.FjernOppstartsdato:
    case ForslagEndringType.AvsluttDeltakelse:
    case ForslagEndringType.Sluttdato:
    case ForslagEndringType.FjernOppstartsdato:
    case EndringType.AVSLUTT_DELTAKELSE:
    case EndringType.AVSLUTT_KURS_DELTAKELSE:
    case EndringType.ENDRE_SLUTTDATO:
    case EndringType.FJERN_OPPSTARTSDATO:
      return (
        <MinusCircleFillIcon
          className={sizeName(size)}
          aria-hidden
          color="var(--a-gray-600)"
        />
      )
		case UlestEndringType.Avslag:
		case TiltakskoordinatorEndringsType.Avslag:
    case HistorikkEndringType.IkkeAktuell:
    case ForslagEndringType.IkkeAktuell:
    case EndringType.DELTAKER_IKKE_AKTUELL:
      return (
        <PlusCircleFillIcon
          className={`${sizeName(size)} ${styles.ikke_aktuell_ikon}`}
          aria-hidden
          color="var(--a-orange-600)"
        />
      )
    case HistorikkEndringType.EndreSluttarsak:
    case ForslagEndringType.Sluttarsak:
    case ForslagEndringType.EndreAvslutning:
    case EndringType.ENDRE_AVSLUTNING:
    case EndringType.ENDRE_SLUTTAARSAK:
      return (
        <ChevronRightLastCircleFillIcon
          className={sizeName(size)}
          aria-hidden
          color="var(--a-gray-500)"
        />
      )
    case HistorikkEndringType.EndreBakgrunnsinformasjon:
    case HistorikkEndringType.EndreInnhold:
    case TiltakskoordinatorEndringsType.DelMedArrangor:
    case TiltakskoordinatorEndringsType.SettPaaVenteliste:
      return (
        < DefaultIcon size={size} />
      )
    case HistorikkEndringType.EndreDeltakelsesmengde:
    case ForslagEndringType.Deltakelsesmengde:
    case EndringType.ENDRE_DELTAKELSE_PROSENT:
      return (
        <PieChartFillIcon
          className={sizeName(size)}
          aria-hidden
          color="var(--a-purple-500)"
        />
      )
    case TiltakskoordinatorEndringsType.TildelPlass:
      return (
        <ChevronRightCircleFillIcon
          className={sizeName(size)}
          aria-hidden
          color="var(--a-deepblue-300)"
        />
      )
    case HistorikkEndringType.ReaktiverDeltakelse:
      return (
        <CaretRightCircleFillIcon
          className={sizeName(size)}
          aria-hidden
          color="var(--a-icon-alt-2)"
        />
      )
		default:
			return <DefaultIcon size={size} />
  }

}

interface DefaultIconProps {
  size?: 'medium' | 'large' | 'small'
}

export const DefaultIcon = ({ size }: DefaultIconProps) => {
  return (
    <MenuElipsisHorizontalCircleFillIcon
      className={sizeName(size)}
      aria-hidden
      color="var(--a-deepblue-400)"
    />
  )
}
