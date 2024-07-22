import React from 'react'

import styles from './EndringTypeIkon.module.scss'
import { EndringType } from './types'
import {
  MinusCircleFillIcon,
  ChevronRightDoubleCircleFillIcon,
  ChevronRightCircleFillIcon,
  PlusCircleFillIcon,
  PieChartFillIcon,
  ChevronRightLastCircleFillIcon
} from '@navikt/aksel-icons'

interface EndringTypeIkonProps {
  type: EndringType
  size?: 'medium' | 'large'
}

export const EndringTypeIkon = (props: EndringTypeIkonProps) => {
  const s = props.size === 'large' ? 'Large' : ''
  switch (props.type) {
    case EndringType.LEGG_TIL_OPPSTARTSDATO:
    case EndringType.ENDRE_OPPSTARTSDATO:
      return (
        <ChevronRightCircleFillIcon
          className={styles[`endreIkon${s}`]}
          aria-hidden
        />
      )
    case EndringType.FORLENG_DELTAKELSE:
      return (
        <ChevronRightDoubleCircleFillIcon
          className={styles[`forlengIkon${s}`]}
          aria-hidden
        />
      )
    case EndringType.AVSLUTT_DELTAKELSE:
    case EndringType.ENDRE_SLUTTDATO:
      return (
        <MinusCircleFillIcon
          className={styles[`avsluttIkon${s}`]}
          aria-hidden
        />
      )
    case EndringType.ENDRE_DELTAKELSE_PROSENT:
      return (
        <PieChartFillIcon
          className={styles[`endreProsentDeltakelseIkon${s}`]}
          aria-hidden
        />
      )
    case EndringType.DELTAKER_IKKE_AKTUELL:
      return (
        <PlusCircleFillIcon
          className={styles[`ikkeAktuellIkon${s}`]}
          aria-hidden
        />
      )
    case EndringType.ENDRE_SLUTTAARSAK:
      return (
        <ChevronRightLastCircleFillIcon
          className={styles[`endreSluttArsak${s}`]}
          aria-hidden
        />
      )
  }
}
