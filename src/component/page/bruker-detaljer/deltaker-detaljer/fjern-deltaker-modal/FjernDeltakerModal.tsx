import { BodyLong, Button } from '@navikt/ds-react'
import React from 'react'
import { BaseModal } from '../../../../felles/base-modal/BaseModal'

import styles from './FjernDeltakerModal.module.scss'

interface FjernDeltakerModalProps {
  open: boolean
  onConfirm: () => void
  onClose: () => void
}

export const FjernDeltakerModal = (props: FjernDeltakerModalProps) => {
  return (
    <BaseModal
      tittel="Er du sikker på at du vil fjerne deltaker?"
      open={props.open}
      onClose={props.onClose}
      contentClassName={styles.modalContent}
    >
      <BodyLong className={styles.text}>
        Når du fjerner en deltaker fra listen, så blir den borte for alle
        tiltaksarrangør-ansatte som bruker Deltakeroversikten. Nav vil ikke
        merke noe endring. Deltaker blir ikke fjernet fra Navs system.
      </BodyLong>

      <div className={styles.knappeRad}>
        <Button variant="secondary" onClick={props.onClose} size="small">
          Nei, ikke fjern
        </Button>
        <Button variant="primary" onClick={props.onConfirm} size="small">
          Ja, fjern deltaker
        </Button>
      </div>
    </BaseModal>
  )
}
