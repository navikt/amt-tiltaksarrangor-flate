import React from 'react'

import { leggTilOppstartsdato } from '../../../../../api/tiltak-api'
import {
	LeggTilEndreOppstartModal
} from './LeggTilEndreOppstartModal'

export interface LeggTilOppstartModalProps {
	onClose: () => void
}

export interface LeggTilOppstartModalDataProps {
	deltakerId: string
	visGodkjennVilkaarPanel: boolean
	onEndringUtfort: () => void
}

export const LeggTilOppstartModal = (props: LeggTilOppstartModalProps & LeggTilOppstartModalDataProps) => {
	const { deltakerId, onClose, visGodkjennVilkaarPanel, onEndringUtfort } = props

	const sendEndringsmelding = (valgtDato: Date) => {
		return leggTilOppstartsdato(deltakerId, valgtDato)
			.then(onEndringUtfort)
	}

	return (
		<LeggTilEndreOppstartModal
			tittel="Legg til oppstartsdato"
			onClose={onClose}
			sendEndring={sendEndringsmelding}
			visGodkjennVilkaarPanel={visGodkjennVilkaarPanel}
		/>
	)
}