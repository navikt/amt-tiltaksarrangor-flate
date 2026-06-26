import { Alert, BodyLong, BodyShort, Detail } from '@navikt/ds-react'
import cls from 'classnames'
import React from 'react'

import { TiltakGjennomforingStatus } from '../../../api/data/tiltak'
import { dateStrWithMonthName } from '../../../utils/date-utils'
import { Show } from '../../felles/Show'
import styles from './DeltakerlisteDetaljerPage.module.scss'
import { KoordinatorsDeltakerliste } from '../../../api/data/deltaker'

interface TiltakInfoProps {
  deltakerliste: KoordinatorsDeltakerliste
  className?: string
}

export const TiltakInfo = ({ deltakerliste, className }: TiltakInfoProps) => {
  return (
    <div className={className}>
      <BodyShort size="small" className={styles.textXs}>
        {deltakerliste.tiltaksnavn}
      </BodyShort>
      <BodyShort size="small" className={styles.textXs}>
        {dateStrWithMonthName(deltakerliste.startDato)} -{' '}
        {dateStrWithMonthName(deltakerliste.sluttDato)}
      </BodyShort>
      <BodyShort size="small" className={cls(styles.textXs)}>
        {deltakerliste.arrangorNavn}
      </BodyShort>
      {deltakerliste.lopenummer && (
        <Detail>Løpenr. {deltakerliste.lopenummer}</Detail>
      )}

      <Show if={deltakerliste.status === TiltakGjennomforingStatus.AVSLUTTET}>
        <Alert variant="warning" className={styles.statusAlert}>
          <strong>Tiltaket er avsluttet</strong>
          <br />
          <BodyLong>
            Tiltaket er avlyst eller så er avtalen utdatert. Er dette feil, ta
            kontakt med den som er ansvarlig for tiltaket i Nav.
          </BodyLong>
        </Alert>
      </Show>
    </div>
  )
}
