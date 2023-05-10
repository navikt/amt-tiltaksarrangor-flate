import { TextField } from '@navikt/ds-react'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import React from 'react'

import { endreDeltakelsesprosent } from '../../../../../api/tiltak-api'
import { Nullable } from '../../../../../utils/types/or-nothing'
import { DateField } from '../../../../felles/DateField'
import styles from './EndreProsentDeltakelseModal.module.scss'
import { SendTilNavKnapp } from './SendTilNavKnapp'
import { VeilederConfirmationPanel } from './VeilederConfirmationPanel'
import { BaseModal } from '../../../../felles/base-modal/BaseModal'
import { useDeltakerlisteStore } from '../deltakerliste-store'


interface EndreProsentDeltakelseModalProps {
	onClose: () => void
}

export interface EndreProsentDeltakelseModalDataProps {
	deltakerId: string,
	gammelProsentDeltakelse: number | null,
	gammelDagerPerUke: number | null,
	visGodkjennVilkaarPanel: boolean,
	onEndringUtfort: () => void
}

export const EndreProsentDeltakelseModal = (props: EndreProsentDeltakelseModalProps & EndreProsentDeltakelseModalDataProps) => {
	const { deltakerId, gammelProsentDeltakelse, gammelDagerPerUke, visGodkjennVilkaarPanel, onEndringUtfort } = props
	const today = dayjs().toDate()
	const { deltakerliste } = useDeltakerlisteStore()
	const [ prosentDeltakelseFelt, settProsentDeltakelseFelt ] = useState<string>('')
	const [ dagerPerUkeFelt, settDagerPerUkeFelt ] = useState<string>('')
	const [ gyldigFraDato, setGyldigFraDato ] = useState<Nullable<Date>>(today)
	const [ errorMessage, settErrorMessage ] = useState<string>()
	const [ dagerPerUkeErrorMessage, settDagerPerUkeErrorMessage ] = useState<string>()
	const [ vilkaarGodkjent, settVilkaarGodkjent ] = useState(false)

	const visDagerPerUke = prosentDeltakelseFelt !== '100' && prosentDeltakelseFelt !== ''

	const sendTilNavDisabled = (!vilkaarGodkjent && visGodkjennVilkaarPanel)
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
		else if (newValue === gammelProsentDeltakelse) settErrorMessage('Gammel deltakelse kan ikke være lik ny deltakelse')
		else settErrorMessage(undefined)

		const newDagerPerUkeValue = parseInt(dagerPerUkeFelt)
		const dagerPerUkeIsInvalid = newDagerPerUkeValue !== null &&
			(!dagerPerUkeFelt.match(/^\d*$/)
			|| newDagerPerUkeValue < 1
			|| newDagerPerUkeValue > 5)

		if (dagerPerUkeIsInvalid) settDagerPerUkeErrorMessage('Dager per uke må være et helt tall fra 1 til 5')
		else if (newDagerPerUkeValue !== null && newDagerPerUkeValue === gammelDagerPerUke) settDagerPerUkeErrorMessage('Gammel deltakelse kan ikke være lik ny deltakelse')
		else settDagerPerUkeErrorMessage(undefined)

	}, [ prosentDeltakelseFelt, gammelProsentDeltakelse, dagerPerUkeFelt, gammelDagerPerUke ])

	const sendEndringsmelding = () => {
		const prosentDeltakelse = parseInt(prosentDeltakelseFelt)
		const dagerPerUke = parseInt(dagerPerUkeFelt)

		if (isNaN(prosentDeltakelse))
			return Promise.reject('Kan ikke sende Prosent Deltakelse endringsmelding')

		return endreDeltakelsesprosent(deltakerId, prosentDeltakelse, dagerPerUke, gyldigFraDato)
			.then(onEndringUtfort)
	}

	return (
		<BaseModal
			tittel="Endre deltakelsesmengde"
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

			{visDagerPerUke && <TextField
				className={styles.prosentDeltakselseTextField}
				label="Hvor mange dager i uka? (valgfritt)"
				type="number"
				value={dagerPerUkeFelt}
				min={1}
				max={5}
				error={dagerPerUkeErrorMessage}
				onChange={e => settDagerPerUkeFelt(e.target.value)}
			/>}

			<DateField
				className={styles.datofelt}
				label="Fra når gjelder ny deltakelsesprosent?"
				date={gyldigFraDato}
				onDateChanged={d => setGyldigFraDato(d)}
				min={deltakerliste.startDato}
				max={deltakerliste.sluttDato}
			/>

			{visGodkjennVilkaarPanel && <VeilederConfirmationPanel
				vilkaarGodkjent={vilkaarGodkjent}
				setVilkaarGodkjent={settVilkaarGodkjent}
			/>}

			<SendTilNavKnapp
				onEndringSendt={props.onClose}
				sendEndring={sendEndringsmelding}
				disabled={sendTilNavDisabled}
			/>
		</BaseModal>
	)
}
