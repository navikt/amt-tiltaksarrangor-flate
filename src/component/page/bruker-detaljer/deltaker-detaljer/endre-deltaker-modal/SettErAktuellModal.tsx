import React from 'react'
import { postDeltakerErAktuell } from '../../../../../api/tiltak-api'
import { BaseModal } from '../../../../felles/base-modal/BaseModal'
import { SendTilNavKnapp } from './SendTilNavKnapp'
import { Label } from '@navikt/ds-react'
import styles from './SettErAktuellModal.module.scss'

interface ErAktuellModalProps {
	onClose: () => void
}

export interface ErAktuellModalDataProps {
	deltakerId: string
	onEndringUtfort: () => void
}

export const SettErAktuellModal = (props: ErAktuellModalProps & ErAktuellModalDataProps) => {
	const { deltakerId, onClose, onEndringUtfort } = props
	const sendEndringsmelding = () => {
		return postDeltakerErAktuell(deltakerId)
			.then(onEndringUtfort)
	}

	return (
		<BaseModal tittel="Er aktuell" onClose={onClose} className={styles.window}>
			<Label size="small" spacing as="p">
				Personen vurderes som aktuell for dette arbeidsmarkedstiltaket.
			</Label>
			<SendTilNavKnapp onEndringSendt={onClose} sendEndring={sendEndringsmelding} />
		</BaseModal>
	)
}
