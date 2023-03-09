import dayjs from 'dayjs'
import React, { useState } from 'react'

import { Nullable } from '../../../../../utils/types/or-nothing'
import { DateField } from '../../../../felles/DateField'
import { useGjennomforingStore } from '../gjennomforing-store'
import { BaseModal } from './BaseModal'
import styles from './EndreOppstartModal.module.scss'
import { SendTilNavKnapp } from './SendTilNavKnapp'
import { VeilederConfirmationPanel } from './VeilederConfirmationPanel'

export interface LeggTilEndreOppstartModalProps {
	onClose: () => void
	sendEndring: (valgtDato: Date) => Promise<void>
}

interface LeggTilEndreOppstartDataProps {
	tittel: string
	visGodkjennVilkaarPanel: boolean
}


export const LeggTilEndreOppstartModal = (props: LeggTilEndreOppstartModalProps & LeggTilEndreOppstartDataProps) => {
	const { tittel, visGodkjennVilkaarPanel, onClose, sendEndring } = props
	const [ valgtDato, setNyDato ] = useState<Nullable<Date>>()
	const [ vilkaarGodkjent, setVilkaarGodkjent ] = useState(false)
	const { gjennomforing } = useGjennomforingStore()

	const sendEndringsmelding = () => {
		if (!valgtDato) return Promise.reject('Dato er påkrevd for å sende endringsmelding med endring av oppstartsdato')
		return sendEndring(valgtDato)
	}

	return (
		<BaseModal
			tittel={tittel}
			onClose={onClose}>
			<DateField
				className={styles.datofelt}
				label="Ny oppstartsdato"
				date={valgtDato}
				onDateChanged={d => setNyDato(d)}
				min={kalkulerMinOppstartsdato(gjennomforing.startDato)}
				max={kalkulerMaxOppstartsdato(gjennomforing.sluttDato)}
			/>
			{visGodkjennVilkaarPanel && (
				<VeilederConfirmationPanel vilkaarGodkjent={vilkaarGodkjent} setVilkaarGodkjent={setVilkaarGodkjent}/>
			)}
			<SendTilNavKnapp
				onEndringSendt={onClose}
				sendEndring={sendEndringsmelding}
				disabled={!valgtDato || (visGodkjennVilkaarPanel && !vilkaarGodkjent)} />
		</BaseModal>
	)
}


/*
	Skal maksimum være 2 måneder tilbake i tid.
	Hvis gjennomforingStartDato er satt så må datoen være etter.
*/
const kalkulerMinOppstartsdato = (gjennomforingStartDato: Nullable<Date>): Date => {
	const twoMonthsAgo = dayjs().subtract(2, 'month')

	if (gjennomforingStartDato && twoMonthsAgo.isBefore(gjennomforingStartDato)) {
		return gjennomforingStartDato
	} else {
		return twoMonthsAgo.toDate()
	}
}

/*
Skal maksimum være 2 måneder forover i tid.
	Hvis gjennomforingSluttDato er satt så må datoen være før.
*/
const kalkulerMaxOppstartsdato = (gjennomforingSluttDato: Nullable<Date>): Date => {
	const twoMonthsInTheFuture = dayjs().add(2, 'month')

	if (gjennomforingSluttDato && twoMonthsInTheFuture.isAfter(gjennomforingSluttDato)) {
		return gjennomforingSluttDato
	} else {
		return twoMonthsInTheFuture.toDate()
	}
}
