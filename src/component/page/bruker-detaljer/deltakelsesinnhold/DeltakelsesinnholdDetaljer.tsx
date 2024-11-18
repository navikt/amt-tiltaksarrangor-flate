import React from 'react'
import { BodyLong, Label, List } from '@navikt/ds-react'
import { Deltakelsesinnhold } from '../../../../api/data/deltaker'
import styles from './DeltakelsesinnholdDetaljer.module.scss'
import { Tiltakskode } from '../../../../api/data/tiltak'
import { INNHOLD_TYPE_ANNET } from '../../../../utils/deltaker-utils'

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

      {tiltakskode === Tiltakskode.VASV && innhold.innhold.length > 0
        && innhold.innhold.map((i) => {
          if (i.innholdskode === INNHOLD_TYPE_ANNET) {
            return <BodyLong
              className={styles.annetTekst}
              key={i.innholdskode}
              size="small"
            >
              {i.beskrivelse}
            </BodyLong>
          }
        })
      }

      {tiltakskode !== Tiltakskode.VASV &&
        <List as="ul" size="small">
          {innhold.innhold.map((i) => (
            <List.Item key={i.innholdskode} className={styles.list}>
              {i.innholdskode === INNHOLD_TYPE_ANNET ? i.beskrivelse : i.tekst}
            </List.Item>
          ))}
        </List>
      }
    </div>
  )
}
