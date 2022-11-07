import { Alert, Button } from '@navikt/ds-react'
import { AxiosResponse } from 'axios'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'

import { leggTilOppstartsdato } from '../../../../api/tiltak-api'
import { formatDate } from '../../../../utils/date-utils'
import { Nullable } from '../../../../utils/types/or-nothing'
import { isPending, isRejected, usePromise } from '../../../../utils/use-promise'
import { DateField } from '../../../felles/DateField'
import { Show } from '../../../felles/Show'
import { DatoPanel } from './DatoPanel'
import styles from './DatoPanel.module.scss'

interface StartdatoPanelProps {
	deltakerId: string
	disabled: boolean
	deltakerStartdato: Nullable<Date>
	endringsmeldingStartdato: Nullable<Date>
	gjennomforingStartDato: Nullable<Date>
	gjennomforingSluttDato: Nullable<Date>
}

export const StartdatoPanel = ({
	deltakerId,
	disabled,
	deltakerStartdato,
	endringsmeldingStartdato,
	gjennomforingStartDato,
	gjennomforingSluttDato,
}: StartdatoPanelProps): React.ReactElement => {
	const [ ekspandert, setEkspandert ] = useState(false)
	const [ valgtDato, setNyDato ] = useState<Nullable<Date>>()
	const [ sendtDato, setSendtDato ] = useState<Nullable<Date>>()
	const opprettEndringsmeldingPromise = usePromise<AxiosResponse>()

	const minDato = kalkulerMinOppstartsdato(gjennomforingStartDato)
	const maxDato = kalkulerMaxOppstartsdato(gjennomforingSluttDato)

	const opprettEndringsmelding = () => {
		if (!valgtDato) {
			return
		}
		opprettEndringsmeldingPromise.setPromise(
			leggTilOppstartsdato(deltakerId, valgtDato)
				.then(res => {
					setEkspandert(false)
					setSendtDato(valgtDato)
					return res
				})
		)
	}

	useEffect(() => {
		if (!sendtDato) {
			setSendtDato(endringsmeldingStartdato)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ endringsmeldingStartdato ])

	useEffect(() => {
		if (ekspandert) {
			setNyDato(undefined)
		}
	}, [ ekspandert ])

	return (
		<div className={styles.datoPanel}>
			<DatoPanel tittel={'Oppstartsdato'}
				disabled={disabled}
				dato={deltakerStartdato}
				ekspandert={ekspandert}
				onEkspanderToggle={() => setEkspandert(e => !e)}
			>
				<div className={styles.endreDato}>
					<DateField
						className={styles.datofelt}
						label="Ny oppstartsdato"
						date={valgtDato}
						onDateChanged={d => setNyDato(d)}
						min={minDato}
						max={maxDato}
					/>
					<Button
						variant="primary"
						size="small"
						className={styles.sendStartDatoKnapp}
						loading={isPending(opprettEndringsmeldingPromise)}
						onClick={opprettEndringsmelding}
						disabled={!valgtDato}
					>
						Send til NAV
					</Button>
				</div>
			</DatoPanel>
			<Show if={sendtDato}>
				<Alert variant="info" className={styles.alert} inline>
					Ny oppstartsdato {formatDate(sendtDato)} er sendt til NAV
				</Alert>
			</Show>
			<Show if={isRejected(opprettEndringsmeldingPromise)}>
				<Alert variant="error" className={styles.alert}>Klarte ikke å sende oppstartsdato</Alert>
			</Show>


		</div>
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
