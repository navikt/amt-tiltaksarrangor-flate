import { Add } from '@navikt/ds-icons'
import { Alert, BodyShort, Button, Heading, Panel } from '@navikt/ds-react'
import { AxiosResponse } from 'axios'
import cls from 'classnames'
import React from 'react'

import { opprettTilgangTilGjennomforing } from '../../../../api/tiltak-api'
import globalStyles from '../../../../globals.module.scss'
import { formatDate } from '../../../../utils/date-utils'
import { Nullable } from '../../../../utils/types/or-nothing'
import { isNotStartedOrPending, isPending, isRejected, isResolved, usePromise } from '../../../../utils/use-promise'
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

export const GjennomforingPanel = (props: GjennomforingPanelProps) => {
	const { gjennomforingId, navn, tiltaksnavn, arrangorNavn, startDato, sluttDato, alleredeLagtTil } = props

	const opprettTilgangTilGjennomforingPromise = usePromise<AxiosResponse>()

	const handleOnLeggTilClicked = () => {
		opprettTilgangTilGjennomforingPromise.setPromise(opprettTilgangTilGjennomforing(gjennomforingId))
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

				<Show if={!alleredeLagtTil}>
					{ isNotStartedOrPending(opprettTilgangTilGjennomforingPromise) && (
						<Button
							variant="secondary"
							size="small"
							disabled={isPending(opprettTilgangTilGjennomforingPromise)}
							loading={isPending(opprettTilgangTilGjennomforingPromise)}
							onClick={handleOnLeggTilClicked}
						>
							<Add/> Legg til
						</Button>
					)}
					{ isResolved(opprettTilgangTilGjennomforingPromise) && <Alert size="small" variant="success">Lagt til</Alert> }
					{ isRejected(opprettTilgangTilGjennomforingPromise) && <Alert size="small" variant="error">Noe gikk galt</Alert> }
				</Show>

				<Show if={alleredeLagtTil}>
					<Alert size="small" variant="info" className={styles.alleredeLagtTilAlert}>Allerede lagt til</Alert>
				</Show>
			</div>
		</Panel>
	)
}