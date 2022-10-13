import { Alert, Button, TextField } from '@navikt/ds-react'
import { AxiosResponse } from 'axios'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'

import { Endringsmelding } from '../../../../api/data/tiltak'
import { opprettStartDatoEndringsmelding } from '../../../../api/tiltak-api'
import { formatDate, formatDateToDateStr } from '../../../../utils/date-utils'
import { Nullable } from '../../../../utils/types/or-nothing'
import { isPending, isRejected, usePromise } from '../../../../utils/use-promise'
import { Show } from '../../../felles/Show'
import { DatoPanel } from './DatoPanel'
import styles from './DatoPanel.module.scss'

interface StartdatoPanelProps {
	deltakerId: string
	disabled: boolean
	startDato: Nullable<Date>
	aktivEndringsmelding: Nullable<Endringsmelding>
	gjennomforingStartDato: Nullable<Date>
	gjennomforingSluttDato: Nullable<Date>
}

export const StartdatoPanel = ({
	deltakerId,
	disabled,
	startDato,
	aktivEndringsmelding,
	gjennomforingStartDato,
	gjennomforingSluttDato,
}: StartdatoPanelProps): React.ReactElement => {
	const [ ekspandert, setEkspandert ] = useState(false)
	const [ nyDato, setNyDato ] = useState('')
	const [ sendtDato, setSendtDato ] = useState<Nullable<Date>>()
	const opprettEndringsmeldingPromise = usePromise<AxiosResponse>()

	const minDato = kalkulerMinOppstartsdato(gjennomforingStartDato)
	const maxDato = kalkulerMaxOppstartsdato(gjennomforingSluttDato)

	const opprettEndringsmelding = () => {
		const dato = dayjs(nyDato).toDate()
		opprettEndringsmeldingPromise.setPromise(
			opprettStartDatoEndringsmelding(deltakerId, dato)
				.then(res => {
					setEkspandert(false)
					setSendtDato(dato)
					return res
				})
		)
	}

	useEffect(() => {
		if (!sendtDato) {
			setSendtDato(aktivEndringsmelding?.startDato)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ aktivEndringsmelding ])

	useEffect(() => {
		if (ekspandert) {
			setNyDato('')
		}
	}, [ ekspandert ])

	return (
		<div className={styles.datoPanel}>
			<DatoPanel tittel={'Startdato'}
				disabled={disabled}
				dato={startDato}
				ekspandert={ekspandert}
				onEkspanderToggle={() => setEkspandert(e => !e)}
			>
				<div className={styles.endreDato}>
					<TextField
						className={styles.datofelt}
						label="Ny startdato"
						type={'date' as any} // eslint-disable-line
						value={nyDato}
						onChange={e => setNyDato(e.target.value)}
						min={formatDateToDateStr(minDato)}
						max={formatDateToDateStr(maxDato)}
					/>
					<Button
						variant="primary"
						className={styles.sendStartDatoKnapp}
						loading={isPending(opprettEndringsmeldingPromise)}
						onClick={opprettEndringsmelding}
						disabled={!nyDato}
					>
						Send til NAV
					</Button>
				</div>
			</DatoPanel>
			<Show if={sendtDato}>
				<Alert variant="info" className={styles.alert} inline>
					Ny startdato {formatDate(sendtDato)} er sendt til NAV
				</Alert>
			</Show>
			<Show if={isRejected(opprettEndringsmeldingPromise)}>
				<Alert variant="error" className={styles.alert}>Klarte ikke å sende sluttdato</Alert>
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
