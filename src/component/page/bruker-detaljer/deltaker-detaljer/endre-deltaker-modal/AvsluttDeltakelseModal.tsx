import React, { useState } from 'react'

import { DeltakerStatusAarsakType } from '../../../../../api/data/endringsmelding'
import { avsluttDeltakelse } from '../../../../../api/tiltak-api'
import { Nullable } from '../../../../../utils/types/or-nothing'
import { DateField } from '../../../../felles/DateField'
import { AarsakSelector } from './AarsakSelector'
import { BaseModal } from './BaseModal'
import styles from './EndreOppstartModal.module.scss'
import { SendTilNavKnapp } from './SendTilNavKnapp'
import { VeilederConfirmationPanel } from './VeilederConfirmationPanel'

interface AvsluttDeltakelseModalProps {
	onClose: () => void
}

export interface AvsluttDeltakelseModalDataProps {
	deltakerId: string
	onEndringUtfort: () => void
}

export const AvsluttDeltakelseModal = (props: AvsluttDeltakelseModalProps & AvsluttDeltakelseModalDataProps) => {
	const { onClose, deltakerId, onEndringUtfort } = props
	const [ sluttDato, settSluttDato ] = useState<Nullable<Date>>()
	const [ aarsak, settAarsak ] = useState<DeltakerStatusAarsakType>()
	const [ beskrivelse, settBeskrivelse ] = useState<Nullable<string>>()
	const [ vilkaarGodkjent, settVilkaarGodkjent ] = useState(false)
	const kanSendeEndringsmelding = aarsak === DeltakerStatusAarsakType.ANNET?
		aarsak && vilkaarGodkjent && sluttDato && beskrivelse :
		aarsak && vilkaarGodkjent && sluttDato

	const sendEndring = () => {
		if (!aarsak || !sluttDato) {
			return Promise.reject('Årsak og sluttdato er påkrevd for å sende AvsluttDeltakelse endringsmelding')
		}
		if (aarsak === DeltakerStatusAarsakType.ANNET && !beskrivelse) {
			return Promise.reject('Beskrivelse er påkrevd for å sende AvsluttDeltakelse endringsmelding med årsak ANNET')
		}
		const nyAarsak = { beskrivelse: beskrivelse??null, type: aarsak }
		return avsluttDeltakelse(deltakerId, sluttDato, nyAarsak).then(onEndringUtfort)
	}

	const onAarsakSelected = (nyAarsak: DeltakerStatusAarsakType, nyBeskrivelse: Nullable<string>) => {
		settAarsak(nyAarsak)
		settBeskrivelse(nyBeskrivelse)
	}
	
	return (
		<BaseModal tittel="Avslutt deltakelse" onClose={onClose}>
			<AarsakSelector tittel="Hva er årsaken til avslutning?" onAarsakSelected={onAarsakSelected}/>
			<DateField
				className={styles.datofelt}
				label="Hva er ny sluttdato?"
				date={sluttDato}
				onDateChanged={d => settSluttDato(d)}
			/>
			<VeilederConfirmationPanel vilkaarGodkjent={vilkaarGodkjent} setVilkaarGodkjent={settVilkaarGodkjent}/>
			<SendTilNavKnapp
				onEndringSendt={onClose}
				sendEndring={sendEndring}
				disabled={!kanSendeEndringsmelding}/>
		</BaseModal>
	)
}