import { Information } from '@navikt/ds-icons'
import { Alert } from '@navikt/ds-react'
import { AxiosResponse } from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

import { Gjennomforing, TiltakGjennomforingStatus } from '../../../api/data/tiltak'
import { fetchTiltakGjennomforinger } from '../../../api/tiltak-api'
import { useTabTitle } from '../../../hooks/use-tab-title'
import { INFORMASJON_PAGE_ROUTE } from '../../../navigation'
import { sortAlphabeticAsc } from '../../../utils/sortering-utils'
import { isNotStartedOrPending, isRejected, usePromise } from '../../../utils/use-promise'
import { Spinner } from '../../felles/spinner/Spinner'
import { GjennomforingListe } from './gjennomforing-liste/GjennomforingListe'
import styles from './GjennomforingListePage.module.scss'

export const GjennomforingListePage = (): React.ReactElement => {
	useTabTitle('Tiltaksoversikt')


	const fetchGjennomforingerPromise = usePromise<AxiosResponse<Gjennomforing[]>>(
		() => fetchTiltakGjennomforinger()
	)

	if (isNotStartedOrPending(fetchGjennomforingerPromise)) {
		return <Spinner/>
	}

	if (isRejected(fetchGjennomforingerPromise)) {
		return <Alert variant="error">Noe gikk galt</Alert>
	}

	const alleGjennomforinger = fetchGjennomforingerPromise.result.data

	const gjennomforinger = alleGjennomforinger
		.filter(g => g.status === TiltakGjennomforingStatus.GJENNOMFORES)
		.sort((g1, g2) => sortAlphabeticAsc(g1.navn, g2.navn))

	return (
		<main className={styles.page} data-testid="gjennomforing-oversikt-page">
			<section className={styles.seksjonGjennomforinger}>
				<GjennomforingListe gjennomforinger={gjennomforinger}/>

				<div className={styles.informasjonLenkeWrapper}>
					<Link className="navds-link" to={INFORMASJON_PAGE_ROUTE}>
						<Information title="Informasjon"/>Info om deltakeroversikten
					</Link>
				</div>
			</section>
		</main>
	)
}
