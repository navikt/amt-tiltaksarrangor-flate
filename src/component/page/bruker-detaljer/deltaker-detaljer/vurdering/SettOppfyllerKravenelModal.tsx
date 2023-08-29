import React from 'react'
import { BodyShort, Button, Modal } from '@navikt/ds-react'
import styles from './VurderingModal.module.scss'

export interface OppfyllerKravenelModalProps {
	isOpen: boolean
	deltakerId: string
	onClose: () => void
}

export const SettOppfyllerKravenelModal = ({ isOpen, deltakerId, onClose }: OppfyllerKravenelModalProps) => {

	// TODO send vurdering til backend
	const handleCloseModal = () => {
		onClose()
	}

	return (
		<Modal open={isOpen} onClose={handleCloseModal} aria-labelledby="modal-heading" header={{ heading: 'Oppfyller kravene' }}>
			<Modal.Body className={styles.content}>
				<BodyShort>Personen oppfyller kravene for å delta på dette arbeidsmarkedstiltaket.</BodyShort>
				<Button type="button" onClick={handleCloseModal} className={styles.modalKnapp}>
					Send til NAV
				</Button>
			</Modal.Body>
		</Modal>
	)
}
