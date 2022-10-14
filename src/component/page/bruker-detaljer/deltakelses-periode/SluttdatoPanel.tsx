import { Alert, Button, ConfirmationPanel, TextField } from '@navikt/ds-react'
import { AxiosResponse } from 'axios'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'

import { Endringsmelding } from '../../../../api/data/tiltak'
import { opprettSluttDatoEndringsmelding } from '../../../../api/tiltak-api'
import { formatDate, formatDateToDateInputStr } from '../../../../utils/date-utils'
import { Nullable } from '../../../../utils/types/or-nothing'
import { isPending, isRejected, usePromise } from '../../../../utils/use-promise'
import { Show } from '../../../felles/Show'
import { DatoPanel } from './DatoPanel'
import styles from './DatoPanel.module.scss'

interface SluttdatoPanelProps {
	deltakerId: string
	disabled: boolean
	startDato: Nullable<Date>
	sluttDato: Nullable<Date>
	aktivEndringsmelding: Nullable<Endringsmelding>
	gjennomforingStartDato: Nullable<Date>
	gjennomforingSluttDato: Nullable<Date>
}

export const SluttdatoPanel = ({
	deltakerId,
	disabled,
	startDato,
	sluttDato,
	aktivEndringsmelding,
	gjennomforingStartDato,
	gjennomforingSluttDato,
}: SluttdatoPanelProps): React.ReactElement => {
	const [ ekspandert, setEkspandert ] = useState(false)
	const [ nyDato, setNyDato ] = useState('')
	const [ sendtDato, setSendtDato ] = useState<Nullable<Date>>()
	const [ confirm, setConfirm ] = useState(false)
	const opprettEndringsmeldingPromise = usePromise<AxiosResponse>()

	const minDato = startDato || gjennomforingStartDato

	const opprettEndringsmelding = () => {
		const dato = dayjs(nyDato).toDate()
		opprettEndringsmeldingPromise.setPromise(
			opprettSluttDatoEndringsmelding(deltakerId, dato)
				.then(res => {
					setEkspandert(false)
					setSendtDato(dato)
					return res
				})
		)
	}

	useEffect(() => {
		if (!sendtDato) {
			setSendtDato(aktivEndringsmelding?.sluttDato)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ aktivEndringsmelding ])

	useEffect(() => {
		if (ekspandert) {
			setNyDato('')
			setConfirm(false)
		}
	}, [ ekspandert ])


	return (
		<div className={styles.datoPanel}>
			<DatoPanel tittel={'Sluttdato'}
				disabled={disabled}
				dato={sluttDato}
				ekspandert={ekspandert}
				onEkspanderToggle={() => setEkspandert(e => !e)}
			>
				<div className={styles.endreDato}>
					<TextField
						className={styles.datofelt}
						label="Ny sluttdato"
						type={'date' as any} // eslint-disable-line
						value={nyDato}
						onChange={e => setNyDato(e.target.value)}
						min={minDato ? formatDateToDateInputStr(minDato) : undefined}
						max={gjennomforingSluttDato ? formatDateToDateInputStr(gjennomforingSluttDato) : undefined}
					/>
				</div>
				<ConfirmationPanel
					label={'Ja, dette har vi avklart allerede'}
					checked={confirm}
					onChange={() => setConfirm(x => !x)}
				>
					Forlengelse og avslutning må først avtales med NAV-veileder, og så kan ny sluttdato sendes inn her. Er ny sluttdato godkjent av NAV-veileder?
				</ConfirmationPanel>
				<Button
					variant="primary"
					size="small"
					className={styles.sendSluttDatoKnapp}
					loading={isPending(opprettEndringsmeldingPromise)}
					onClick={opprettEndringsmelding}
					disabled={!nyDato || !confirm}
				>
					Send til NAV
				</Button>
			</DatoPanel>
			<Show if={sendtDato}>
				<Alert variant="info" className={styles.alert} inline>
					Ny sluttdato {formatDate(sendtDato)} er sendt til NAV
				</Alert>
			</Show>
			<Show if={isRejected(opprettEndringsmeldingPromise)}>
				<Alert variant="error" className={styles.alert}>Klarte ikke å sende sluttdato</Alert>
			</Show>


		</div>
	)

}
