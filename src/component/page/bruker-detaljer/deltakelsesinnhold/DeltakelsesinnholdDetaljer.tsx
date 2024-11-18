import React from 'react'
import { BodyLong, Label } from '@navikt/ds-react'
import { Deltakelsesinnhold } from '../../../../api/data/deltaker'
import styles from './DeltakelsesinnholdDetaljer.module.scss'
import { Tiltakskode } from '../../../../api/data/tiltak'
import { DeltakelseInnholdListe } from '../deltaker-detaljer/DeltakelseInnholdListe'

interface Props {
  innhold: Deltakelsesinnhold
  tiltakskode: Tiltakskode
}
export function DeltakelsesinnholdDetaljer({ innhold, tiltakskode }: Props) {
  return (
    <div className={styles.wrapper}>
      <Label size="small" as="p">
        Dette er innholdet
      </Label>

      <BodyLong size="small" className={styles.bodylong}>
        {innhold.ledetekst}
      </BodyLong>

      <DeltakelseInnholdListe
        tiltakstype={tiltakskode}
        deltakelsesinnhold={innhold}
      />
    </div>
  )
}
