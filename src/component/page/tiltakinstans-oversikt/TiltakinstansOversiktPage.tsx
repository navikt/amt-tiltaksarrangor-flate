import { AxiosResponse } from 'axios'
import { AlertStripeFeil } from 'nav-frontend-alertstriper'
import React from 'react'

import { fetchTiltakinstanser } from '../../../api/tiltak-api'
import { TiltakInstans } from '../../../domeneobjekter/tiltak'
import { useValgtVirksomhetStore } from '../../../store/valgt-virksomhet-store'
import { isNotStartedOrPending, isRejected, usePromise } from '../../../utils/use-promise'
import { Spinner } from '../../felles/spinner/Spinner'
import { TiltakinstansListe } from './tiltakinstans-liste/TiltakinstansListe'
import styles from './TiltakinstansOversiktPage.module.less'

export const TiltakinstansOversiktPage = (): React.ReactElement => {
	const { valgtVirksomhet } = useValgtVirksomhetStore()

	const fetchTiltakInstanserPromise = usePromise<AxiosResponse<TiltakInstans[]>>(
		() => fetchTiltakinstanser(valgtVirksomhet.id), [ valgtVirksomhet ]
	)

	if (isNotStartedOrPending(fetchTiltakInstanserPromise)) {
		return <Spinner/>
	}

	if (isRejected(fetchTiltakInstanserPromise)) {
		return <AlertStripeFeil>Noe gikk galt</AlertStripeFeil>
	}

	const alleTiltakInstanser = fetchTiltakInstanserPromise.result.data

	return (
		<main className={styles.page} data-testid="tiltaksinstans-oversikt-page">
			<section className={styles.seksjonTiltakinstanser}>
				<TiltakinstansListe tiltakInstanser={alleTiltakInstanser}/>
			</section>
		</main>
	)
}
