import React from 'react'

import { endreOppstartsdato } from '../../../../../api/tiltak-api'
import {
	LeggTilEndreDatoModal
} from './LeggTilEndreDatoModal'

export interface EndreOppstartModalProps {
	onClose: () => void
}

export interface EndreOppstartModalDataProps {
	deltakerId: string
	visGodkjennVilkaarPanel: boolean
	onEndringUtfort: () => void
}

export const EndreOppstartModal = (props: EndreOppstartModalProps & EndreOppstartModalDataProps) => {
	const { deltakerId, onClose, onEndringUtfort } = props

	const sendEndring = (valgtDato: Date) => {
		return endreOppstartsdato(deltakerId, valgtDato)
			.then(onEndringUtfort)
	}

	return (
		<LeggTilEndreDatoModal
			tittel="Endre oppstartsdato"
			datoLabel="Ny oppstartsdato"
			onClose={onClose}
			sendEndring={sendEndring}
			visGodkjennVilkaarPanel={props.visGodkjennVilkaarPanel}
		/>
	)
}