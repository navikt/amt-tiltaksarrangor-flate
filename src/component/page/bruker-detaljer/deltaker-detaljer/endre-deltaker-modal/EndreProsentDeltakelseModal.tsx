import { TextField } from '@navikt/ds-react'
import { useEffect, useState } from 'react'
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
	const [ prosentDeltakelseFelt, settProsentDeltakelseFelt ] = useState<string>('')
	const [ errorMessage, settErrorMessage ] = useState<string>()
	const [ vilkaarGodkjent, settVilkaarGodkjent ] = useState(false)

	const sendTilNavDisabled = !vilkaarGodkjent
		|| prosentDeltakelseFelt === ''
		|| errorMessage !== undefined

	useEffect(() => {
		if (prosentDeltakelseFelt === '') {
			settErrorMessage(undefined)
			return
		}

		const newValue = parseInt(prosentDeltakelseFelt)

		const isInvalid = isNaN(newValue)
			|| !prosentDeltakelseFelt.match(/^\d*$/)
			|| newValue <= 0
			|| newValue > 100

		if (isInvalid) settErrorMessage('Tallet må være et helt tall fra 1 til 100')
		else if (newValue === props.gammelProsentDeltakelse) settErrorMessage('Gammel deltakelse kan ikke være lik ny deltakelse')
		else settErrorMessage(undefined)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ prosentDeltakelseFelt ])

	const sendEndringsmelding = () => {
		const prosentDeltakelse = parseInt(prosentDeltakelseFelt)

		if (isNaN(prosentDeltakelse))
			return Promise.reject('Kan ikke sende Prosent Deltakelse endringsmelding')

		return endreDeltakelsesprosent(props.deltakerId, prosentDeltakelse)
			.then(props.onEndringUtfort)
	}

	return (
		<BaseModal
			tittel="Endre deltakelsesprosent"
			onClose={props.onClose}>

			<TextField
				className={styles.prosentDeltakselseTextField}
				label="Hva er ny deltakelsesprosent?"
				type="number"
				value={prosentDeltakelseFelt}
				min={0}
				max={100}
				error={errorMessage}
				onChange={e => settProsentDeltakelseFelt(e.target.value)}
			/>

			<VeilederConfirmationPanel
				vilkaarGodkjent={vilkaarGodkjent}
				setVilkaarGodkjent={settVilkaarGodkjent}
			/>

			<SendTilNavKnapp
				onEndringSendt={props.onClose}
				sendEndring={sendEndringsmelding}
				disabled={sendTilNavDisabled}
			/>
		</BaseModal>
	)
}
