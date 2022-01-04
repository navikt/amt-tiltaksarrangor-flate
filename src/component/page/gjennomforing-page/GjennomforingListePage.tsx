import { AxiosResponse } from 'axios'
import { AlertStripeFeil } from 'nav-frontend-alertstriper'
import React from 'react'

import { fetchTiltakGjennomforinger } from '../../../api/tiltak-api'
import { Gjennomforing } from '../../../domeneobjekter/tiltak'
import { useValgtVirksomhetStore } from '../../../store/valgt-virksomhet-store'
import { isNotStartedOrPending, isRejected, usePromise } from '../../../utils/use-promise'
import { Spinner } from '../../felles/spinner/Spinner'
import { GjennomforingListe } from './gjennomforing-liste/GjennomforingListe'
import styles from './GjennomforingListePage.module.less'

export const GjennomforingListePage = (): React.ReactElement => {
	const { valgtVirksomhet } = useValgtVirksomhetStore()

	const fetchGjennomforingerPromise = usePromise<AxiosResponse<Gjennomforing[]>>(
		() => fetchTiltakGjennomforinger(valgtVirksomhet.id), [ valgtVirksomhet ]
	)

	if (isNotStartedOrPending(fetchGjennomforingerPromise)) {
		return <Spinner/>
	}

	if (isRejected(fetchGjennomforingerPromise)) {
		return <AlertStripeFeil>Noe gikk galt</AlertStripeFeil>
	}

	const alleGjennomforinger = fetchGjennomforingerPromise.result.data

	return (
		<main className={styles.page} data-testid="gjennomforing-oversikt-page">
			<section className={styles.seksjonGjennomforinger}>
				<GjennomforingListe gjennomforinger={alleGjennomforinger}/>
			</section>
		</main>
	)
}
