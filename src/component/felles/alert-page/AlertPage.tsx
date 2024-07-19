import { Alert } from '@navikt/ds-react'
import React from 'react'

import styles from './AlertPage.module.scss'

interface AlertPageProps {
  variant: 'error' | 'warning' | 'info' | 'success'
  tekst: string
}

export const AlertPage = (
  props: AlertPageProps
): React.ReactElement<AlertPageProps> => {
  return (
    <Alert variant={props.variant} size="medium" className={styles.page}>
      {props.tekst}
    </Alert>
  )
}
