import React from 'react'

import { endreOppstartsdato } from '../../../../../api/tiltak-api'
import {
	LeggTilEndreOppstartModal
} from './LeggTilEndreOppstartModal'

export interface EndreOppstartModalProps {
	onClose: () => void
}

export interface EndreOppstartModalDataProps {
	deltakerId: string
	visConfirmationPanel: boolean
	onEndringUtfort: () => void
}

export const EndreOppstartModal = (props: EndreOppstartModalProps & EndreOppstartModalDataProps) => {
	const { deltakerId, onClose, onEndringUtfort } = props

	const sendEndring = (valgtDato: Date) => {
		return endreOppstartsdato(deltakerId, valgtDato)
			.then(onEndringUtfort)
	}

	return (
		<LeggTilEndreOppstartModal
			tittel="Endre oppstartsdato"
			onClose={onClose}
			sendEndring={sendEndring}
			visGodkjennVilkaarPanel={props.visConfirmationPanel}
		/>
	)
}