import { ConfirmationPanel } from '@navikt/ds-react'
import React from 'react'

import styles from './EndreOppstartModal.module.scss'

interface VeilederConfirmationPanelProps {
  vilkaarGodkjent: boolean
  setVilkaarGodkjent: (val: boolean) => void
}
export const VeilederConfirmationPanel = ({
  vilkaarGodkjent,
  setVilkaarGodkjent
}: VeilederConfirmationPanelProps) => {
  return (
    <ConfirmationPanel
      size="small"
      className={styles.confirmation}
      checked={vilkaarGodkjent}
      label="Ja, Nav-veileder har godkjent"
      onChange={() => setVilkaarGodkjent(!vilkaarGodkjent)}
    >
      Endringer må først avtales med Nav-veileder. Er endringen godkjent av
      Nav-veileder?
    </ConfirmationPanel>
  )
}
