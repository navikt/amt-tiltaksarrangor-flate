import { TextField } from '@navikt/ds-react'
import { useState } from 'react'
import React from 'react'

import { endreDeltakelsesprosent } from '../../../../../api/tiltak-api'
import { BaseModal } from './BaseModal'
import styles from './EndreProsentDeltakelseModal.module.scss'
import { SendTilNavKnapp } from './SendTilNavKnapp'
import { VeilederConfirmationPanel } from './VeilederConfirmationPanel'


interface EndreProsentDeltakelseModalProps {
    onClose: () => void
}

export interface EndreProsentDeltakelseModalDataProps {
    deltakerId: string,
    gammelProsentDeltakelse: number | null
    onEndringUtfort: () => void
}

export const EndreProsentDeltakelseModal = (props: EndreProsentDeltakelseModalProps & EndreProsentDeltakelseModalDataProps) => {

	const [ prosentDeltakelse, settProsentDeltakelse ] = useState<number | undefined>(undefined)
	const [ errorMessage, settErrorMessage ] = useState<string | undefined>(undefined)
	const [ vilkaarGodkjent, settVilkaarGodkjent ] = useState(false)


	const onChange = ((e: React.ChangeEvent<HTMLInputElement>): void => {
		if (e.target.value === '') {
			settErrorMessage(undefined)
			settProsentDeltakelse(undefined)
		} else {
			const newValue = +e.target.value

			if (newValue < 0) settErrorMessage('Ny prosentverdi kan ikke være under 0%')
			else if (newValue > 100) settErrorMessage('Ny prosentverdi kan ikke være over 100%')
			else if (newValue === props.gammelProsentDeltakelse) settErrorMessage('Gammel deltakelse kan ikke være lik ny deltakelse')
			else settErrorMessage(undefined)

			settProsentDeltakelse(newValue)
		}
	})

	const sendEndringsmelding = () => {
		if (prosentDeltakelse === undefined || errorMessage !== undefined)
			return Promise.reject('Kan ikke sende Prosent Deltakelse endringsmelding')

		return endreDeltakelsesprosent(props.deltakerId, prosentDeltakelse)
			.then(props.onEndringUtfort)
	}

	return (
		<BaseModal
			tittel="Endre Deltakelsesprosent"
			onClose={props.onClose}>

			<TextField
				className={styles.prosentDeltakselseTextField}
				label="Hva er ny Deltakelsesprosent?"
				type="number"
				value={prosentDeltakelse !== undefined ? prosentDeltakelse : ''}
				min={0}
				max={100}
				error={errorMessage}
				onChange={onChange}/>
			<VeilederConfirmationPanel vilkaarGodkjent={vilkaarGodkjent} setVilkaarGodkjent={settVilkaarGodkjent}/>

			<SendTilNavKnapp
				onEndringSendt={props.onClose}
				sendEndring={sendEndringsmelding}
				disabled={!vilkaarGodkjent || prosentDeltakelse === undefined || errorMessage !== undefined}/>
		</BaseModal>
	)
}
