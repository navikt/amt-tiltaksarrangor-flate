import React from 'react'
import { postTilbyPlass } from '../../../../../api/tiltak-api'
import { BaseModal } from '../../../../felles/base-modal/BaseModal'
import { SendTilNavKnapp } from './SendTilNavKnapp'
import { Label } from '@navikt/ds-react'
import styles from './TilbyPlassModal.module.scss'

interface TilbyPlassModalProps {
	onClose: () => void
}

export interface TilbyPlassModalDataProps {
	deltakerId: string
	onEndringUtfort: () => void
}

export const TilbyPlassModal = (props: TilbyPlassModalProps & TilbyPlassModalDataProps) => {
	const { deltakerId, onClose, onEndringUtfort } = props
	const sendEndringsmelding = () => {
		return postTilbyPlass(deltakerId)
			.then(onEndringUtfort)
	}

	return (
		<BaseModal tittel="Tilby plass" onClose={onClose} className={styles.window}>
			<Label size="small" spacing as="p">Foreslår å tilby plass til denne personen.</Label>
			<SendTilNavKnapp
				onEndringSendt={onClose}
				sendEndring={sendEndringsmelding}
			/>
		</BaseModal>
	)
}
