import React, { useState } from 'react'

import { DeltakerStatusAarsakType } from '../../../../../api/data/endringsmelding'
import { avsluttDeltakelse } from '../../../../../api/tiltak-api'
import { maxDate } from '../../../../../utils/date-utils'
import { Nullable } from '../../../../../utils/types/or-nothing'
import { DateField } from '../../../../felles/DateField'
import { AarsakSelector } from './AarsakSelector'
import styles from './EndreOppstartModal.module.scss'
import { useDeltakerlisteStore } from '../deltakerliste-store'
import { AktivtForslag } from '../../../../../api/data/forslag'
import { useAarsakValidering, validerAarsakForm } from './validering/aarsakValidering'
import { Endringsmodal } from './endringsmodal/Endringsmodal'
import { avsluttDeltakelseForslag } from '../../../../../api/forslag-api'

interface AvsluttDeltakelseModalProps {
	onClose: () => void
}

export interface AvsluttDeltakelseModalDataProps {
	readonly deltakerId: string
	readonly startDato: Nullable<Date>
	readonly visGodkjennVilkaarPanel: boolean
	readonly onEndringUtfort: () => void
	readonly onForslagSendt: (forslag: AktivtForslag) => void
	readonly erForslagEnabled: boolean
}

export const AvsluttDeltakelseModal = (props: AvsluttDeltakelseModalProps & AvsluttDeltakelseModalDataProps) => {
	const { onClose, deltakerId, startDato, visGodkjennVilkaarPanel, onEndringUtfort, onForslagSendt, erForslagEnabled } = props
	const [ sluttDato, settSluttDato ] = useState<Nullable<Date>>()
	const [ aarsak, settAarsak ] = useState<DeltakerStatusAarsakType>()
	const [ beskrivelse, settBeskrivelse ] = useState<Nullable<string>>()
	const [ begrunnelse, setBegrunnelse ] = useState<string>()

	const { deltakerliste } = useDeltakerlisteStore()
	const { validering } = useAarsakValidering(aarsak, beskrivelse, begrunnelse)

	const minDato = maxDate(startDato, deltakerliste.startDato)

	const sendEndringsmelding = () => {
		if (!sluttDato) {
			return Promise.reject('Sluttdato er påkrevd for å sende AvsluttDeltakelse endringsmelding')
		}
		return validerAarsakForm(aarsak, beskrivelse)
			.then(validertForm => avsluttDeltakelse(deltakerId, sluttDato, validertForm.endringsmelding.aarsak))
			.then(onEndringUtfort)
	}

	const sendForslag = () => {
		if (!sluttDato) {
			return Promise.reject('Sluttdato er påkrevd for å sende AvsluttDeltakelse forslag')
		}
		return validerAarsakForm(aarsak, beskrivelse, begrunnelse)
			.then(validertForm => avsluttDeltakelseForslag(deltakerId, sluttDato, validertForm.forslag.aarsak, validertForm.forslag.begrunnelse))
			.then(res => onForslagSendt(res.data))
	}

	const onAarsakSelected = (nyAarsak: DeltakerStatusAarsakType, nyBeskrivelse: Nullable<string>) => {
		settAarsak(nyAarsak)
		settBeskrivelse(nyBeskrivelse)
	}

	return (
		<Endringsmodal
			tittel="Avslutt deltakelse"
			visGodkjennVilkaarPanel={visGodkjennVilkaarPanel}
			erForslag={erForslagEnabled}
			erSendKnappDisabled={!validering.isSuccess || !sluttDato}
			onClose={onClose}
			onSend={erForslagEnabled ? sendForslag : sendEndringsmelding}
			onBegrunnelse={begrunnelse => { setBegrunnelse(begrunnelse) }}
		>
			<AarsakSelector
				tittel="Hva er årsaken til avslutning?"
				onAarsakSelected={onAarsakSelected}
			/>
			<DateField
				className={styles.datofelt}
				label="Hva er ny sluttdato?"
				date={sluttDato}
				min={minDato}
				max={deltakerliste.sluttDato}
				onDateChanged={(d) => settSluttDato(d)}
			/>
		</Endringsmodal>
	)
}
