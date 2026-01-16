import { BodyLong, List } from '@navikt/ds-react'
import { erOpplaringstiltak, INNHOLD_TYPE_ANNET } from '../../../../utils/deltaker-utils'
import { Tiltakskode } from '../../../../api/data/tiltak'
import styles from './DeltakelseInfo.module.scss'
import { Deltakelsesinnhold } from '../../../../api/data/innhold'

interface Props {
  deltakelsesinnhold: Deltakelsesinnhold
  tiltakskode: Tiltakskode
  className?: string
}

export const DeltakelseInnholdListe = ({
  deltakelsesinnhold,
  tiltakskode,
  className
}: Props) => {
  if (deltakelsesinnhold.innhold.length === 0) {
    return null
  }

  const kanKunHaAnnetInnhold = erOpplaringstiltak(tiltakskode)
    || tiltakskode === Tiltakskode.VARIG_TILRETTELAGT_ARBEID_SKJERMET

  return (<>
    {kanKunHaAnnetInnhold &&
      deltakelsesinnhold.innhold.map((i) => {
        if (i.innholdskode === 'annet') {
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

    {!kanKunHaAnnetInnhold &&
      <List as="ul" size="small" className={className ?? ''}>
        {deltakelsesinnhold.innhold.map((i) => (
          <List.Item key={i.innholdskode} className={styles.listItem}>
            {i.innholdskode === INNHOLD_TYPE_ANNET ? i.beskrivelse : i.tekst}
          </List.Item>
        ))}
      </List>
    }</>
  )
}
