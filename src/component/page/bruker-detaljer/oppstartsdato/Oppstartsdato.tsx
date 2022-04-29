import { Calender } from '@navikt/ds-icons'
import { Alert, BodyShort, Button, Heading, TextField } from '@navikt/ds-react'
import { AxiosResponse } from 'axios'
import cls from 'classnames'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'

import { opprettStartDatoEndringsmelding } from '../../../../api/tiltak-api'
import globalStyles from '../../../../globals.module.scss'
import { formatDateStr } from '../../../../utils/date-utils'
import { isPending, isRejected, isResolved, usePromise } from '../../../../utils/use-promise'
import { Show } from '../../../felles/Show'
import styles from './Oppstartsdato.module.scss'

interface OppstartsdatoProps {
	deltakerId: string
	deltakerOppstartsdato: string
	className?: string
}

export const Oppstartsdato = (props: OppstartsdatoProps): React.ReactElement => {
	const [ showEdit, setShowEdit ] = useState(false)
	const [ nyOppstartsdato, setNyOppstartsdato ] = useState<string>('')
	const [ sendtDato, setSendtDato ] = useState<string>()

	const opprettEndringsmeldingPromise = usePromise<AxiosResponse>()

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

	return (
		<div className={cls(styles.oppstartsdato, props.className)}>
			<div className={styles.iconWrapper}><Calender title="Kalender"/></div>

			<div className={styles.content}>
				<div className={styles.visOppstartsdato}>
					<div>
						<Heading size="small" level="4" className={globalStyles.blokkXxxs}>Oppstartsdato</Heading>
						<BodyShort>{props.deltakerOppstartsdato}</BodyShort>
					</div>

					{
						showEdit
							? <Button variant="tertiary" onClick={() => setShowEdit(false)}>Avbryt</Button>
							: <Button variant="secondary" onClick={() => setShowEdit(true)}>Endre</Button>
					}
				</div>

				<Show if={showEdit}>
					<div className={styles.endreOppstartsdato}>
						<TextField
							label="Ny oppstartsdato"
							type={'date' as any} // eslint-disable-line
							value={nyOppstartsdato}
							onChange={e => setNyOppstartsdato(e.target.value)}
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

				<Show if={isRejected(opprettEndringsmeldingPromise)}>
					<Alert variant="error" className={styles.alert}>Klarte ikke å sende oppstartsdato</Alert>
				</Show>

				<Show if={isResolved(opprettEndringsmeldingPromise)}>
					<Alert variant="info" inline={true} className={styles.alert}>
						Ny dato {formatDateStr(sendtDato)} er sendt til NAV
					</Alert>
				</Show>
			</div>
		</div>
	)
}