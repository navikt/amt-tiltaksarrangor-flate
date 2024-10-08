import { Alert } from '@navikt/ds-react'
import React from 'react'

import styles from './Driftsmelding.module.scss'
import { useFeatureToggle } from './hooks/useFeatureToggle'
export const Driftsmelding = () => {
  const { visDriftsmelding } = useFeatureToggle()
  if (!visDriftsmelding) return <></>

  return (
    <Alert variant="warning" className={styles.alertstripe}>
      Nylige endringer på deltakere vises ikke for øyeblikket. Dette skyldes
      vedlikehold på siden. Vedlikeholdet forventes ferdig innen kl. 19:00.
    </Alert>
  )
}
