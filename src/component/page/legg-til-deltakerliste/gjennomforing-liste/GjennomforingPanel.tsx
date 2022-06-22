import { Add } from '@navikt/ds-icons'
import { Alert, BodyShort, Button, Heading, Panel } from '@navikt/ds-react'
import { AxiosResponse } from 'axios'
import cls from 'classnames'
import React from 'react'

import { leggTilGjennomforingIDeltakeroversikt } from '../../../../api/tiltak-api'
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

	const leggTilGjennomforingPromise = usePromise<AxiosResponse>()

	const handleOnLeggTilClicked = () => {
		leggTilGjennomforingPromise.setPromise(leggTilGjennomforingIDeltakeroversikt(gjennomforingId))
	}

	return (
		<Panel border className={styles.panel}>
			<Heading size="xsmall" level="3" className={globalStyles.blokkXxs}>{navn}</Heading>
			<div className={styles.innhold}>
				<div>
					<div className={cls(styles.rad, globalStyles.blokkXxs)}>
						<BodyShort className={cls(styles.muted, styles.tiltaknavn)}>{tiltaksnavn}</BodyShort>
						<BodyShort className={styles.muted}>{arrangorNavn}</BodyShort>
					</div>

					<BodyShort className={styles.muted}>{formatDate(startDato)} - {formatDate(sluttDato)}</BodyShort>
				</div>

				<Show if={!alleredeLagtTil}>
					{ isNotStartedOrPending(leggTilGjennomforingPromise) && (
						<Button
							variant="secondary"
							disabled={isPending(leggTilGjennomforingPromise)}
							loading={isPending(leggTilGjennomforingPromise)}
							onClick={handleOnLeggTilClicked}
						>
							<Add/> Legg til
						</Button>
					)}
					{ isResolved(leggTilGjennomforingPromise) && <Alert size="small" variant="success">Lagt til</Alert> }
					{ isRejected(leggTilGjennomforingPromise) && <Alert size="small" variant="error">Noe gikk galt</Alert> }
				</Show>

				<Show if={alleredeLagtTil}>
					<Alert size="small" variant="info" className={styles.alleredeLagtTilAlert}>Allerede lagt til</Alert>
				</Show>
			</div>
		</Panel>
	)
}