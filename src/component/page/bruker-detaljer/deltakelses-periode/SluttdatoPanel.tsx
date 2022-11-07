import { Alert, Button, ConfirmationPanel } from '@navikt/ds-react'
import { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'

import { avsluttDeltakelse } from '../../../../api/tiltak-api'
import { formatDate } from '../../../../utils/date-utils'
import { Nullable } from '../../../../utils/types/or-nothing'
import { isPending, isRejected, usePromise } from '../../../../utils/use-promise'
import { DateField } from '../../../felles/DateField'
import { Show } from '../../../felles/Show'
import { DatoPanel } from './DatoPanel'
import styles from './DatoPanel.module.scss'

interface SluttdatoPanelProps {
	deltakerId: string
	disabled: boolean
	deltakerStartdato: Nullable<Date>
	deltakerSluttdato: Nullable<Date>
	endringsmeldingSluttdato: Nullable<Date>
	gjennomforingStartDato: Nullable<Date>
	gjennomforingSluttDato: Nullable<Date>
}

export const SluttdatoPanel = ({
	deltakerId,
	disabled,
	deltakerStartdato,
	deltakerSluttdato,
	endringsmeldingSluttdato,
	gjennomforingStartDato,
	gjennomforingSluttDato,
}: SluttdatoPanelProps): React.ReactElement => {
	const [ ekspandert, setEkspandert ] = useState(false)
	const [ valgtDato, setValgtDato ] = useState<Nullable<Date>>()
	const [ sendtDato, setSendtDato ] = useState<Nullable<Date>>()
	const [ confirm, setConfirm ] = useState(false)
	const avsluttDeltakelsePromise = usePromise<AxiosResponse>()

	const minDato = deltakerStartdato || gjennomforingStartDato

	const sendEndreSluttdatoEndringsmelding = () => {
		if (!valgtDato) {
			return
		}
		avsluttDeltakelsePromise.setPromise(
			avsluttDeltakelse(deltakerId, valgtDato)
				.then(res => {
					setEkspandert(false)
					setSendtDato(valgtDato)
					return res
				})
		)
	}

	useEffect(() => {
		if (!sendtDato) {
			setSendtDato(endringsmeldingSluttdato)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ endringsmeldingSluttdato ])

	useEffect(() => {
		if (ekspandert) {
			setValgtDato(undefined)
			setConfirm(false)
		}
	}, [ ekspandert ])


	return (
		<div className={styles.datoPanel}>
			<DatoPanel tittel={'Sluttdato'}
				disabled={disabled}
				dato={deltakerSluttdato}
				ekspandert={ekspandert}
				onEkspanderToggle={() => setEkspandert(e => !e)}
			>
				<div className={styles.endreDato}>
					<DateField
						className={styles.datofelt}
						label="Ny sluttdato"
						date={valgtDato}
						min={minDato}
						max={gjennomforingSluttDato}
						onDateChanged={d => setValgtDato(d)}
					/>
				</div>
				<ConfirmationPanel
					label={'Ja, NAV-veileder har godkjent'}
					checked={confirm}
					onChange={() => setConfirm(x => !x)}
				>
					Forlengelse og avslutning må først avtales med NAV-veileder. Når dette er gjort kan du sende ny sluttdato her. Er ny sluttdato godkjent av NAV-veileder?
				</ConfirmationPanel>
				<Button
					variant="primary"
					size="small"
					className={styles.sendSluttDatoKnapp}
					loading={isPending(avsluttDeltakelsePromise)}
					onClick={sendEndreSluttdatoEndringsmelding}
					disabled={!valgtDato || !confirm}
				>
					Send til NAV
				</Button>
			</DatoPanel>
			<Show if={sendtDato}>
				<Alert variant="info" className={styles.alert} inline>
					Ny sluttdato {formatDate(sendtDato)} er sendt til NAV
				</Alert>
			</Show>
			<Show if={isRejected(avsluttDeltakelsePromise)}>
				<Alert variant="error" className={styles.alert}>Klarte ikke å sende sluttdato</Alert>
			</Show>


		</div>
	)

}
