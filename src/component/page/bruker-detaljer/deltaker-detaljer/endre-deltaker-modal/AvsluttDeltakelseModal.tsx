import React, { useState } from 'react'

import { DeltakerStatusAarsakType } from '../../../../../api/data/endringsmelding'
import { avsluttDeltakelse } from '../../../../../api/tiltak-api'
import { maxDate } from '../../../../../utils/date-utils'
import { Nullable } from '../../../../../utils/types/or-nothing'
import { BaseModal } from '../../../../felles/base-modal/BaseModal'
import { DateField } from '../../../../felles/DateField'
import { AarsakSelector } from './AarsakSelector'
import styles from './EndreOppstartModal.module.scss'
import { SendTilNavKnapp } from './SendTilNavKnapp'
import { VeilederConfirmationPanel } from './VeilederConfirmationPanel'
import { useDeltakerlisteStore } from '../deltakerliste-store'

interface AvsluttDeltakelseModalProps {
	onClose: () => void
}

export interface AvsluttDeltakelseModalDataProps {
	deltakerId: string
	startDato: Nullable<Date>
	visGodkjennVilkaarPanel: boolean,
	onEndringUtfort: () => void
}

export const AvsluttDeltakelseModal = (props: AvsluttDeltakelseModalProps & AvsluttDeltakelseModalDataProps) => {
	const { onClose, deltakerId, startDato, visGodkjennVilkaarPanel, onEndringUtfort } = props
	const [ sluttDato, settSluttDato ] = useState<Nullable<Date>>()
	const [ aarsak, settAarsak ] = useState<DeltakerStatusAarsakType>()
	const [ beskrivelse, settBeskrivelse ] = useState<Nullable<string>>()
	const [ vilkaarGodkjent, settVilkaarGodkjent ] = useState(false)
	const { deltakerliste } = useDeltakerlisteStore()

	const minDato = maxDate(startDato, deltakerliste.startDato)
	const kanSendeEndringsmelding = aarsak === DeltakerStatusAarsakType.ANNET?
		aarsak && (vilkaarGodkjent || !visGodkjennVilkaarPanel) && sluttDato && beskrivelse :
		aarsak && (vilkaarGodkjent || !visGodkjennVilkaarPanel) && sluttDato

	const sendEndring = () => {
		if (!aarsak || !sluttDato) {
			return Promise.reject('Årsak og sluttdato er påkrevd for å sende AvsluttDeltakelse endringsmelding')
		}
		if (aarsak === DeltakerStatusAarsakType.ANNET && !beskrivelse) {
			return Promise.reject('Beskrivelse er påkrevd for å sende AvsluttDeltakelse endringsmelding med årsak ANNET')
		}
		if (aarsak === DeltakerStatusAarsakType.ANNET && beskrivelse && beskrivelse?.length > 40) {
			return Promise.reject('Beskrivelse kan ikke være med enn 40 tegn med årsak ANNET')
		}
		const nyAarsak = { beskrivelse: beskrivelse ?? null, type: aarsak }
		return avsluttDeltakelse(deltakerId, sluttDato, nyAarsak).then(onEndringUtfort)
	}

	const onAarsakSelected = (nyAarsak: DeltakerStatusAarsakType, nyBeskrivelse: Nullable<string>) => {
		settAarsak(nyAarsak)
		settBeskrivelse(nyBeskrivelse)
	}

	return (
		<BaseModal tittel="Avslutt deltakelse" onClose={onClose}>
			<AarsakSelector tittel="Hva er årsaken til avslutning?" skalViseOppfyllerIkkeKrav={false} onAarsakSelected={onAarsakSelected} />
			<DateField
				className={styles.datofelt}
				label="Hva er ny sluttdato?"
				date={sluttDato}
				min={minDato}
				max={deltakerliste.sluttDato}
				onDateChanged={d => settSluttDato(d)}
			/>
			{ visGodkjennVilkaarPanel && <VeilederConfirmationPanel vilkaarGodkjent={vilkaarGodkjent} setVilkaarGodkjent={settVilkaarGodkjent} /> }
			<SendTilNavKnapp
				onEndringSendt={onClose}
				sendEndring={sendEndring}
				disabled={!kanSendeEndringsmelding} />
		</BaseModal >
	)
}
