import { Tag } from '@navikt/ds-react'
import classNames from 'classnames'
import React from 'react'

import {
  DeltakerStatus,
  TiltakDeltakerStatus
} from '../../../api/data/deltaker'
import { mapTiltakDeltakerStatusTilTekst } from '../../../utils/text-mappers'
import styles from './StatusMerkelapp.module.scss'

const getStyle = (statusType: typeof TiltakDeltakerStatus | string) => {
  switch (statusType) {
    case TiltakDeltakerStatus.DELTAR:
      return styles.statusTagHvit
    default:
      return ''
  }
}

const deltakerlisteStyle = (
  statusType: typeof TiltakDeltakerStatus | string
) => {
  switch (statusType) {
    case TiltakDeltakerStatus.IKKE_AKTUELL:
    case TiltakDeltakerStatus.AVBRUTT:
    case TiltakDeltakerStatus.FULLFORT:
    case TiltakDeltakerStatus.HAR_SLUTTET:
      return styles.statusTagmall
    case TiltakDeltakerStatus.VENTER_PA_OPPSTART:
      return styles.statusTagBlaSmall
    case TiltakDeltakerStatus.DELTAR:
    default:
      return undefined
  }
}

const getTagType = (statusType: typeof TiltakDeltakerStatus | string) => {
  switch (statusType) {
    case TiltakDeltakerStatus.VENTER_PA_OPPSTART:
      return 'alt3'
    case TiltakDeltakerStatus.FULLFORT:
    case TiltakDeltakerStatus.HAR_SLUTTET:
      return 'alt1'
    case TiltakDeltakerStatus.VURDERES:
      return 'alt2'
    case TiltakDeltakerStatus.DELTAR:
    case TiltakDeltakerStatus.AVBRUTT:
    case TiltakDeltakerStatus.IKKE_AKTUELL:
    default:
      return 'neutral'
  }
}

interface StatusProps {
  status: DeltakerStatus
  erDeltakerlisteVisning?: boolean
}

export const StatusMerkelapp = (props: StatusProps) => {
  const { type } = props.status
  return (
    <Tag
      variant={getTagType(type)}
      size="xsmall"
      className={classNames(
        getStyle(type),
        props.erDeltakerlisteVisning ? deltakerlisteStyle(type) : undefined
      )}
    >
      {mapTiltakDeltakerStatusTilTekst(type)}
    </Tag>
  )
}
