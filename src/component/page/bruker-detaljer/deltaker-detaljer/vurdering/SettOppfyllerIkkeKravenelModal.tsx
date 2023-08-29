import React from 'react'

import { BodyShort, Button, Modal, Textarea } from '@navikt/ds-react'
import styles from './VurderingModal.module.scss'

export interface OppfyllerIkkeKravenelModalProps {
	isOpen: boolean
	deltakerId: string
	onClose: () => void
}

export const SettOppfyllerIkkeKravenelModal = ({ isOpen, deltakerId, onClose }: OppfyllerIkkeKravenelModalProps) => {
	// TODO send vurdering til backend
	const handleCloseModal = () => {
		onClose()
	}

	// TODO håndtere feil fra skjema
	return (
		<Modal open={isOpen} onClose={handleCloseModal} aria-labelledby="modal-heading" header={{ heading: 'Oppfyller ikke kravene' }}>
			<Modal.Body className={styles.content}>
				<BodyShort>Personen oppfyller ikke kravene for å delta på dette arbeidsmarkedstiltaket.</BodyShort>
				<Textarea label="Forklar hvorfor:" description="Teksten kan bli vist til deltakeren" maxLength={40} minRows={1} rows={1} />
				<Button type="button" onClick={handleCloseModal} className={styles.modalKnapp}>
					Send til NAV
				</Button>
			</Modal.Body>
		</Modal>
	)
}
