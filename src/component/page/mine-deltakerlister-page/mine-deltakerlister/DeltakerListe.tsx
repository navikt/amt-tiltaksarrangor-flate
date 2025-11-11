import { Alert } from '@navikt/ds-react'
import React, { useMemo } from 'react'

import globalStyles from '../../../../globals.module.scss'
import { sortAlphabeticAsc } from '../../../../utils/sortering-utils'
import styles from './DeltakerListe.module.scss'
import { DeltakerlistePanel } from './DeltakerlistePanel'
import { TiltakSection } from './TiltakSection'
import { KoordinatorForDeltakerliste } from '../../../../api/data/deltaker'
import {
  finnDeltakerlister,
  finnUnikeTiltakskoder
} from '../../../../utils/deltakerliste-utils'

interface DeltakerListeProps {
  deltakerliste: KoordinatorForDeltakerliste[]
}

export const DeltakerListe = (
  props: DeltakerListeProps
): React.ReactElement<DeltakerListeProps> => {
  const unikeTiltakskoder = useMemo<string[]>(() => {
    return finnUnikeTiltakskoder(props.deltakerliste)
  }, [props.deltakerliste])

  const sorterteTiltakskoder = unikeTiltakskoder.sort((t1, t2) =>
    sortAlphabeticAsc(t1, t2)
  )

  if (props.deltakerliste.length === 0) {
    return (
      <Alert variant="info" className={globalStyles.blokkM}>
        For å se deltakere må du legge til en deltakerliste.
      </Alert>
    )
  }

  return (
    <div className={styles.cleanList}>
      {sorterteTiltakskoder.map((tiltakskode, tiltakskodeIdx) => {
        return (
          <TiltakSection key={tiltakskodeIdx} navn={tiltakskode}>
            {finnDeltakerlister(tiltakskode, props.deltakerliste)
              .sort((d1, d2) => sortAlphabeticAsc(d1.navn, d2.navn))
              .map((dl) => {
                return (
                  <DeltakerlistePanel
                    key={dl.id}
                    id={dl.id}
                    navn={dl.navn}
                    startdato={dl.startdato}
                    sluttdato={dl.sluttdato}
                    erKurs={dl.erKurs}
                  />
                )
              })}
          </TiltakSection>
        )
      })}
    </div>
  )
}
