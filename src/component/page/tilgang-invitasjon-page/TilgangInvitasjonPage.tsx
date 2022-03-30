import { BodyShort, Button, Checkbox, Heading } from '@navikt/ds-react'
import { AxiosResponse } from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import { aksepterTilgangInvitasjon, fetchTilgangInvitasjonInfo } from '../../../api/tiltak-api'
import { isNotStartedOrPending, isPending, isRejected, isResolved, usePromise } from '../../../utils/use-promise'
import { AlertPage } from '../../felles/alert-page/AlertPage'
import { SpinnerPage } from '../../felles/spinner-page/SpinnerPage'
import styles from './TilgangInvitasjonPage.module.scss'

export const TilgangInvitasjonPage = (): React.ReactElement => {
	const params  = useParams<{ invitasjonId: string }>()
	const invitasjonId = params.invitasjonId ?? ''

	const [ bekreftet, setBekreftet ] = useState(false)
	const aksepterInvitasjonPromise = usePromise<AxiosResponse>()
	const tilgangInvitasjonPromise = usePromise(() => fetchTilgangInvitasjonInfo(invitasjonId))

	const beOmTilgangTilGjennomforing = () => {
		aksepterInvitasjonPromise.setPromise(aksepterTilgangInvitasjon(invitasjonId))
	}

	if (isNotStartedOrPending(tilgangInvitasjonPromise) || isPending(aksepterInvitasjonPromise)) {
		return <SpinnerPage />
	}

	if (isRejected(tilgangInvitasjonPromise) || isRejected(aksepterInvitasjonPromise)) {
		return <AlertPage variant="error" tekst="Noe gikk galt" />
	}

	if (isResolved(aksepterInvitasjonPromise)) {
		return (
			<AlertPage
				variant="success"
				tekst="Du har bedt om tilgang til deltakeroversikten. Den ansvarlige for arbeidsmarkedstiltaket i NAV har mottat forespørselen din."
			/>
		)
	}

	const invitasjonInfo = tilgangInvitasjonPromise.result.data

	if (invitasjonInfo.erBrukt) {
		return (
			<AlertPage
				variant="warning"
				tekst="Denne invitasjonen er allerede brukt"
			/>
		)
	}

	return (
		<main className={styles.page}>
			<div className={styles.alert}>
				<Heading size="medium" level="1" spacing>
					Jobber du hos {invitasjonInfo.overordnetEnhetNavn} med administrering av deltakere på “{invitasjonInfo.gjennomforingNavn}”?
				</Heading>
				<BodyShort spacing>
					Når du klikker på send til NAV så vil ditt fødselsnummer sendes til NAV, bla bla og det brukes til å logge inn.
				</BodyShort>

				<BodyShort>
					Tiltak: {invitasjonInfo.gjennomforingNavn}
				</BodyShort>
				<BodyShort spacing>
					Tiltaksarrangør: {invitasjonInfo.overordnetEnhetNavn}
				</BodyShort>
				<Checkbox checked={bekreftet} onChange={(e) => setBekreftet(e.target.checked)}>Ja</Checkbox>
			</div>

			<Button
				type="button"
				variant="primary"
				disabled={!bekreftet}
				onClick={beOmTilgangTilGjennomforing}
			>
				Be om tilgang
			</Button>
		</main>
	)
}
