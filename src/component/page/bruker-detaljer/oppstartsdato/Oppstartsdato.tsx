import { Calender } from '@navikt/ds-icons'
import { Alert, BodyShort, Button, Heading, TextField } from '@navikt/ds-react'
import { AxiosResponse } from 'axios'
import cls from 'classnames'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'

import { Endringsmelding } from '../../../../api/data/tiltak'
import { hentEndringsmeldinger, opprettStartDatoEndringsmelding } from '../../../../api/tiltak-api'
import globalStyles from '../../../../globals.module.scss'
import { formatDate, formatDateStr, formatDateToDateStr } from '../../../../utils/date-utils'
import { Nullable } from '../../../../utils/types/or-nothing'
import {
	isNotStarted,
	isPending,
	isRejected,
	isResolved,
	usePromise
} from '../../../../utils/use-promise'
import { Show } from '../../../felles/Show'
import styles from './Oppstartsdato.module.scss'

interface OppstartsdatoProps {
	erSkjermetPerson: boolean
	deltakerId: string
	deltakerOppstartsdato: Nullable<Date>
	gjennomforingStartDato: Nullable<Date>
	gjennomforingSluttDato: Nullable<Date>
	className?: string
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

export const Oppstartsdato = (props: OppstartsdatoProps): React.ReactElement => {
	const [ showEdit, setShowEdit ] = useState(false)
	const [ nyOppstartsdato, setNyOppstartsdato ] = useState<string>('')
	const [ sendtDato, setSendtDato ] = useState<string>()

	const endringsmeldingerPromise = usePromise<AxiosResponse<Endringsmelding[]>>(() => hentEndringsmeldinger(props.deltakerId))
	const opprettEndringsmeldingPromise = usePromise<AxiosResponse>()

	const minDato = formatDateToDateStr(kalkulerMinOppstartsdato(props.gjennomforingStartDato))
	const maxDato = formatDateToDateStr(kalkulerMaxOppstartsdato(props.gjennomforingSluttDato))

	const opprettEndringsmelding = () => {
		const oppstartsdato = dayjs(nyOppstartsdato).toDate()

		setSendtDato(nyOppstartsdato)

		opprettEndringsmeldingPromise.setPromise(
			opprettStartDatoEndringsmelding(props.deltakerId, oppstartsdato)
				.then(res => {
					setShowEdit(false)
					return res
				})
		)
	}

	useEffect(() => {
		if (showEdit) {
			setNyOppstartsdato('')
		}
	}, [ showEdit ])

	const aktivEndringsmelding = endringsmeldingerPromise.result?.data
		.filter(e => e.aktiv)[0]

	return (
		<div className={cls(styles.oppstartsdato, props.className)}>
			<div className={styles.iconWrapper}><Calender title="Kalender"/></div>

			<div className={styles.content}>
				<div className={styles.visOppstartsdato}>
					<div>
						<Heading size="small" level="4" className={globalStyles.blokkXxxs}>Oppstartsdato</Heading>
						<BodyShort>{formatDate(props.deltakerOppstartsdato)}</BodyShort>
					</div>

					<Show if={props.erSkjermetPerson}>
						<Alert variant="warning" className={styles.skjermetPersonAlert}>
							Du kan ikke legge til oppstartsdato på denne deltakeren. Ta kontakt med NAV-veileder.
						</Alert>
					</Show>

					<Show if={!props.erSkjermetPerson}>
						{
							showEdit
								? <Button variant="tertiary" onClick={() => setShowEdit(false)}>Avbryt</Button>
								: <Button variant="secondary" onClick={() => setShowEdit(true)}>
									{ props.deltakerOppstartsdato ? 'Endre' : 'Legg til' }
								</Button>
						}
					</Show>
				</div>

				<Show if={showEdit}>
					<div className={styles.endreOppstartsdato}>
						<TextField
							className={styles.datofelt}
							label="Ny oppstartsdato"
							type={'date' as any} // eslint-disable-line
							value={nyOppstartsdato}
							onChange={e => setNyOppstartsdato(e.target.value)}
							min={minDato}
							max={maxDato}
						/>
						<Button
							variant="primary"
							className={styles.oppdaterDatoKnapp}
							loading={isPending(opprettEndringsmeldingPromise)}
							onClick={opprettEndringsmelding}
							disabled={!nyOppstartsdato}
						>
							Send til NAV
						</Button>
					</div>
				</Show>

				<Show if={isResolved(opprettEndringsmeldingPromise)}>
					<Alert variant="info" className={styles.alert} inline>
						Ny dato {formatDateStr(sendtDato)} er sendt til NAV
					</Alert>
				</Show>

				<Show if={aktivEndringsmelding && isNotStarted(opprettEndringsmeldingPromise)}>
					<Alert variant="info" className={styles.alert} inline>
						Ny dato {formatDate(aktivEndringsmelding?.startDato)} er sendt til NAV
					</Alert>
				</Show>

				<Show if={isRejected(opprettEndringsmeldingPromise)}>
					<Alert variant="error" className={styles.alert}>Klarte ikke å sende oppstartsdato</Alert>
				</Show>
			</div>
		</div>
	)
}