import React, { useState } from 'react'

import { BodyShort, Button, Modal, Textarea } from '@navikt/ds-react'
import styles from './SettVurderingModal.module.scss'
import { Nullable } from '../../../../../utils/types/or-nothing'
import { postDeltakerVurderingOppfyllerIkkeKravene } from '../../../../../api/tiltak-api'
import { BESKRIVELSE_MAKS_TEGN } from '../../../../../utils/endre-deltaker-utils'

export interface OppfyllerIkkeKravenelModalProps {
  isOpen: boolean
  deltakerId: string
  onClose: () => void
  onVurderingSendt: () => void
}

export const SettOppfyllerIkkeKravenelModal = ({
  isOpen,
  deltakerId,
  onClose,
  onVurderingSendt
}: OppfyllerIkkeKravenelModalProps) => {
  const [beskrivelse, settBeskrivelse] = useState<Nullable<string>>()

  const sendVurdering = () => {
    if (!beskrivelse) {
      return Promise.reject(
        'Beskrivelse er påkrevd for vurdering: Oppfyller ikke kravene'
      )
    }
    if (beskrivelse?.length > 40) {
      return Promise.reject('Beskrivelse kan ikke være mer enn 40 tegn')
    }
    return postDeltakerVurderingOppfyllerIkkeKravene(deltakerId, beskrivelse)
      .then(onClose)
      .then(onVurderingSendt)
  }

  const handleChangeDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const nyBeskrivelse = e.target.value
    settBeskrivelse(nyBeskrivelse)
  }

  const kanSendeVurdering =
    beskrivelse && beskrivelse.length <= BESKRIVELSE_MAKS_TEGN

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-heading"
      header={{ heading: 'Oppfyller ikke kravene' }}
    >
      <Modal.Body className={styles.content}>
        <BodyShort size="small">
          Personen oppfyller ikke kravene for å delta på dette
          arbeidsmarkedstiltaket.
        </BodyShort>
        <Textarea
          label="Forklar hvorfor:"
          description="Teksten kan bli vist til deltakeren"
          value={beskrivelse ?? ''}
          onChange={handleChangeDescription}
          maxLength={BESKRIVELSE_MAKS_TEGN}
          minRows={1}
          rows={1}
          size="small"
        />
        <Button
          type="button"
          onClick={sendVurdering}
          className={styles.modalKnapp}
          disabled={!kanSendeVurdering}
          size="small"
        >
          Send til Nav
        </Button>
      </Modal.Body>
    </Modal>
  )
}
