import { Alert } from '@navikt/ds-react'
import React from 'react'

import styles from './Driftsmelding.module.scss'
import { useFeatureToggle } from './hooks/useFeatureToggle'
export const Driftsmelding = () => {
  const { visDriftsmelding } = useFeatureToggle()
  if (!visDriftsmelding) return <></>

  return (
    <Alert variant="error" className={styles.alertstripe}>
        På grunn av teknisk oppgradering vil det for øyeblikket ikke komme nye endringer på deltakere.
        Når du ikke ser denne meldingen lenger vi Deltakeroversikten fungere som normalt igjen.
    </Alert>
  )
}
