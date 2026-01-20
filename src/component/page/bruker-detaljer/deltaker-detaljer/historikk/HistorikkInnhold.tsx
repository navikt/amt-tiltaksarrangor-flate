import { BodyLong } from '@navikt/ds-react'
import { Deltakelsesinnhold } from '../../../../../api/data/innhold'
import { DeltakelseInnholdListe } from '../DeltakelseInnholdListe'
import styles from './Historikk.module.scss'
import { Tiltakskode } from '../../../../../api/data/tiltak'

interface Props {
  deltakelsesinnhold: Deltakelsesinnhold | null
  tiltakskode: Tiltakskode
}

export const HistorikkInnhold = ({ deltakelsesinnhold, tiltakskode }: Props) => {

  const harInnhold = deltakelsesinnhold &&
    (deltakelsesinnhold.innhold.length > 0 || deltakelsesinnhold.ledetekst)

  if (!harInnhold) return null
  return (
    <div >
      <BodyLong size="small" weight="semibold">
        Dette er innholdet
      </BodyLong>
      <div className={styles.innhold_wrapper}>
        {deltakelsesinnhold.ledetekst && (
          <BodyLong size="small">{deltakelsesinnhold.ledetekst}</BodyLong>
        )}
        <DeltakelseInnholdListe
          tiltakskode={tiltakskode}
          deltakelsesinnhold={deltakelsesinnhold}
          className={styles.innhold_liste}
        />
      </div>
    </div>
  )
}
