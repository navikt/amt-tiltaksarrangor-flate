import React from 'react'
import { BodyShort, Button, Modal } from '@navikt/ds-react'
import styles from './SettVurderingModal.module.scss'
import { postDeltakerVurderingOppfyllerKravene } from '../../../../../api/tiltak-api'

export interface OppfyllerKravenelModalProps {
  isOpen: boolean
  deltakerId: string
  onClose: () => void
  onVurderingSendt: () => void
}

export const SettOppfyllerKravenelModal = ({
  isOpen,
  deltakerId,
  onClose,
  onVurderingSendt
}: OppfyllerKravenelModalProps) => {
  const sendVurdering = () => {
    return postDeltakerVurderingOppfyllerKravene(deltakerId)
      .then(onClose)
      .then(onVurderingSendt)
  }

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-heading"
      header={{ heading: 'Oppfyller kravene' }}
    >
      <Modal.Body className={styles.content}>
        <BodyShort size="small">
          Personen oppfyller kravene for å delta på dette
          arbeidsmarkedstiltaket.
        </BodyShort>
        <Button
          type="button"
          onClick={sendVurdering}
          className={styles.modalKnapp}
          size="small"
        >
          Send til NAV
        </Button>
      </Modal.Body>
    </Modal>
  )
}
