import { BodyLong, Button } from '@navikt/ds-react'
import React from 'react'

import { BaseModal } from '../endre-deltaker-modal/BaseModal'
import styles from './FjernDeltakerModal.module.scss'

interface FjernDeltakerModalProps {
	open: boolean
	onConfirm: () => void;
	onClose: () => void;
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
				Når du fjerner en deltaker fra listen, så blir den borte for alle tiltaksarrangør-ansatte som bruker Deltakeroversikten.
				NAV vil ikke merke noe endring. Deltaker blir ikke fjernet fra NAVs system.
			</BodyLong>

			<div className={styles.knappeRad}>
				<Button variant="secondary" onClick={props.onClose}>Nei, ikke fjern</Button>
				<Button variant="primary" onClick={props.onConfirm}>Ja, fjern deltaker</Button>
			</div>
		</BaseModal>
	)
}