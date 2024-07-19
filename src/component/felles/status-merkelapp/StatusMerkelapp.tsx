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
    case TiltakDeltakerStatus.IKKE_AKTUELL:
    case TiltakDeltakerStatus.AVBRUTT:
    case TiltakDeltakerStatus.FULLFORT:
    case TiltakDeltakerStatus.HAR_SLUTTET:
      return styles.statusTagOrange
    case TiltakDeltakerStatus.DELTAR:
      return styles.statusTagHvit
    case TiltakDeltakerStatus.VENTER_PA_OPPSTART:
      return styles.statusTagBla
    case TiltakDeltakerStatus.VURDERES:
      return styles.statusTagLilla
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
      return styles.statusTagOrangeSmall
    case TiltakDeltakerStatus.VENTER_PA_OPPSTART:
      return styles.statusTagBlaSmall
    case TiltakDeltakerStatus.DELTAR:
    default:
      return undefined
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
      variant="info"
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
