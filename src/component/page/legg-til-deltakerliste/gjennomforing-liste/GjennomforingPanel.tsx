import { Add, Close } from '@navikt/ds-icons'
import { Alert, BodyShort, Button, Heading, Panel } from '@navikt/ds-react'
import cls from 'classnames'
import React, { useState } from 'react'

import { fjernTilgangTilGjennomforing, opprettTilgangTilGjennomforing } from '../../../../api/tiltak-api'
import globalStyles from '../../../../globals.module.scss'
import { formatDate } from '../../../../utils/date-utils'
import { Nullable } from '../../../../utils/types/or-nothing'
import { isNotStartedOrPending, isPending, isRejected, usePromise } from '../../../../utils/use-promise'
import { Show } from '../../../felles/Show'
import styles from './GjennomforingPanel.module.scss'

interface GjennomforingPanelProps {
	gjennomforingId: string,
	navn: string,
	tiltaksnavn: string,
	arrangorNavn: string,
	startDato: Nullable<Date>,
	sluttDato: Nullable<Date>,
	alleredeLagtTil: boolean
}

const SUCCESS_ALERT_TIMEOUT_MS = 2000

export const GjennomforingPanel = (props: GjennomforingPanelProps) => {
	const { gjennomforingId, navn, tiltaksnavn, arrangorNavn, startDato, sluttDato, alleredeLagtTil } = props

	const [ erLagtTil, setErLagtTil ] = useState(alleredeLagtTil)
	const [ showSuccessAlert, setShowSuccessAlert ] = useState(false)

	const opprettTilgangTilGjennomforingPromise = usePromise()
	const fjernTilgangTilGjennomforingPromise = usePromise()

	const handleOnLeggTilClicked = () => {
		fjernTilgangTilGjennomforingPromise.reset()

		opprettTilgangTilGjennomforingPromise.setPromise(
			opprettTilgangTilGjennomforing(gjennomforingId)
				.then(() => endreErLagtTil(true))
		)
	}

	const handleOnFjernClicked = () => {
		opprettTilgangTilGjennomforingPromise.reset()

		fjernTilgangTilGjennomforingPromise.setPromise(
			fjernTilgangTilGjennomforing(gjennomforingId)
				.then(() => endreErLagtTil(false))
		)
	}

	const endreErLagtTil = (lagtTil: boolean) => {
		setShowSuccessAlert(true)

		setTimeout(() => {
			setErLagtTil(lagtTil)
			setShowSuccessAlert(false)
		}, SUCCESS_ALERT_TIMEOUT_MS)
	}

	return (
		<Panel border className={styles.panel}>
			<Heading size="xsmall" level="4" className={globalStyles.blokkXxs}>{navn}</Heading>
			<div className={styles.innhold}>
				<div>
					<div className={cls(styles.rad, globalStyles.blokkXxs)}>
						<BodyShort className={styles.tiltaknavn}>{tiltaksnavn}</BodyShort>
						<BodyShort>{arrangorNavn}</BodyShort>
					</div>

					<BodyShort>{formatDate(startDato)} - {formatDate(sluttDato)}</BodyShort>
				</div>

				<Show if={!erLagtTil}>
					{ isNotStartedOrPending(opprettTilgangTilGjennomforingPromise) && (
						<Button
							variant="primary"
							size="small"
							className={styles.knapp}
							disabled={isPending(opprettTilgangTilGjennomforingPromise)}
							loading={isPending(opprettTilgangTilGjennomforingPromise)}
							onClick={handleOnLeggTilClicked}
						>
							<Add/> Legg til
						</Button>
					)}
					{ showSuccessAlert && <Alert size="small" variant="success">Lagt til</Alert> }
					{ isRejected(opprettTilgangTilGjennomforingPromise) && <Alert size="small" variant="error">Noe gikk galt</Alert> }
				</Show>

				<Show if={erLagtTil}>
					{ isNotStartedOrPending(fjernTilgangTilGjennomforingPromise) && (
						<Button
							variant="secondary"
							size="small"
							className={styles.knapp}
							disabled={isPending(fjernTilgangTilGjennomforingPromise)}
							loading={isPending(fjernTilgangTilGjennomforingPromise)}
							onClick={handleOnFjernClicked}
						>
							<Close/> Fjern
						</Button>
					)}
					{ showSuccessAlert && <Alert size="small" variant="success">Fjernet</Alert> }
					{ isRejected(fjernTilgangTilGjennomforingPromise) && <Alert size="small" variant="error">Noe gikk galt</Alert> }
				</Show>
			</div>
		</Panel>
	)
}