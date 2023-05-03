import React from 'react'

import { postEndreSluttdato } from '../../../../../api/tiltak-api'
import { LeggTilEndreDatoModal } from './LeggTilEndreDatoModal'

export interface EndreSluttdatoModalProps {
	onClose: () => void
}

export interface EndreSluttdatoModalDataProps {
	deltakerId: string
	visGodkjennVilkaarPanel: boolean
	onEndringUtfort: () => void
}

export const EndreSluttdatoModal = (props: EndreSluttdatoModalProps & EndreSluttdatoModalDataProps) => {
	const { deltakerId, onClose, onEndringUtfort } = props

	const sendEndring = (valgtDato: Date) => {
		return postEndreSluttdato(deltakerId, valgtDato)
			.then(onEndringUtfort)
	}

	return (
		<LeggTilEndreDatoModal
			tittel="Endre sluttdato"
			datoLabel="Ny sluttdato"
			onClose={onClose}
			sendEndring={sendEndring}
			visGodkjennVilkaarPanel={props.visGodkjennVilkaarPanel}
		/>
	)
}