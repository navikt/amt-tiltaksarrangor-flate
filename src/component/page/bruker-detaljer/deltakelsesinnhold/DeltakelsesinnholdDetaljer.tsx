import React from 'react'
import { BodyLong, Label } from '@navikt/ds-react'
import styles from './DeltakelsesinnholdDetaljer.module.scss'
import { Tiltakskode } from '../../../../api/data/tiltak'
import { DeltakelseInnholdListe } from '../deltaker-detaljer/DeltakelseInnholdListe'
import { Deltakelsesinnhold } from '../../../../api/data/innhold'

interface Props {
  innhold: Deltakelsesinnhold
  tiltakskode: Tiltakskode
}
export function DeltakelsesinnholdDetaljer({ innhold, tiltakskode }: Props) {
  const harInnhold = innhold.innhold.length > 0 || innhold.ledetekst

  if (!harInnhold) {
    return null
  }

  return (
    <div className={styles.wrapper}>
      <Label size="small" as="p">
        Dette er innholdet
      </Label>

      {innhold.ledetekst && (
        <BodyLong size="small" className={styles.bodylong}>
          {innhold.ledetekst}
        </BodyLong>
      )}

      <DeltakelseInnholdListe
        tiltakskode={tiltakskode}
        deltakelsesinnhold={innhold}
      />
    </div>
  )
}
