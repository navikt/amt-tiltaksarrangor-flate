import React from 'react'
import { postSettPaaVenteliste } from '../../../../../api/tiltak-api'
import { BaseModal } from '../../../../felles/base-modal/BaseModal'
import { SendTilNavKnapp } from './SendTilNavKnapp'
import { Label } from '@navikt/ds-react'
import styles from './TilbyPlassModal.module.scss'
interface SettPaaVentelisteModalProps {
	onClose: () => void
}

export interface SettPaaVentelisteModalDataProps {
	deltakerId: string
	onEndringUtfort: () => void
}

export const SettPaaVentelisteModal = (props: SettPaaVentelisteModalProps & SettPaaVentelisteModalDataProps) => {
	const { deltakerId, onClose, onEndringUtfort } = props
	const sendEndringsmelding = () => {
		return postSettPaaVenteliste(deltakerId)
			.then(onEndringUtfort)
	}

	return (
		<BaseModal tittel="Sett på venteliste" onClose={onClose} className={styles.window}>
			<Label size="small" spacing as="p">Foreslår at denne personen bør stå på venteliste. Hvis det blir ledige plasser så er personen aktuell. </Label>
			<SendTilNavKnapp
				onEndringSendt={onClose}
				sendEndring={sendEndringsmelding}
			/>
		</BaseModal>
	)
}
