import React from 'react'
import { BodyLong, Label, List } from '@navikt/ds-react'
import { Deltakelsesinnhold } from '../../../../api/data/deltaker'
import styles from './DeltakelsesinnholdDetaljer.module.scss'

interface Props {
  innhold: Deltakelsesinnhold
}
export function DeltakelsesinnholdDetaljer({ innhold }: Props) {
  return (
    <div className={styles.wrapper}>
      <Label size="small" as="p">
        Dette er innholdet
      </Label>

      <BodyLong size="small" className={styles.bodylong}>
        {innhold.ledetekst}
      </BodyLong>

      <List as="ul" size="small">
        {innhold.innhold.map((i) => (
          <List.Item key={i.innholdskode} className={styles.list}>
            {i.innholdskode === 'annet' ? i.beskrivelse : i.tekst}
          </List.Item>
        ))}
      </List>
    </div>
  )
}
