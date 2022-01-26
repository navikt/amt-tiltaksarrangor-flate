import { Alert, BodyShort, Heading } from '@navikt/ds-react'
import { AxiosResponse } from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'

import { fetchDeltakerePaTiltakGjennomforing, fetchTiltakGjennomforing } from '../../../api/tiltak-api'
import { TiltakDeltaker } from '../../../domeneobjekter/deltaker'
import { Gjennomforing } from '../../../domeneobjekter/tiltak'
import globalStyles from '../../../globals.module.scss'
import { useTabTitle } from '../../../hooks/use-tab-title'
import { dateStrWithMonthName } from '../../../utils/date-utils'
import { getAntallDeltakerePerStatus } from '../../../utils/deltaker-status-utils'
import { isNotStartedOrPending, isRejected, usePromise } from '../../../utils/use-promise'
import { Spinner } from '../../felles/spinner/Spinner'
import { Tilbakelenke } from '../../felles/tilbakelenke/Tilbakelenke'
import { DeltakerOversiktTabell } from './deltaker-oversikt/DeltakerOversiktTabell'
import { FilterMeny } from './FilterMeny'
import styles from './GjennomforingDetaljerPage.module.scss'

export const GjennomforingDetaljerPage = (): React.ReactElement => {
	useTabTitle('Deltakeroversikt')

	const params  = useParams<{ gjennomforingId: string }>()
	const gjennomforingId = params.gjennomforingId || ''

	const fetchGjennomforingPromise = usePromise<AxiosResponse<Gjennomforing>>(
		() => fetchTiltakGjennomforing(gjennomforingId), [ gjennomforingId ]
	)

	const fetchDeltakerePaGjennomforingPromise = usePromise<AxiosResponse<TiltakDeltaker[]>>(
		() => fetchDeltakerePaTiltakGjennomforing(gjennomforingId), [ gjennomforingId ]
	)

	if (isNotStartedOrPending(fetchGjennomforingPromise) || isNotStartedOrPending(fetchDeltakerePaGjennomforingPromise)) {
		return <Spinner/>
	}

	if (isRejected(fetchGjennomforingPromise) || isRejected(fetchDeltakerePaGjennomforingPromise)) {
		return <Alert variant="error">Noe gikk galt</Alert>
	}

	const gjennomforing = fetchGjennomforingPromise.result.data
	const deltakere = fetchDeltakerePaGjennomforingPromise.result.data
	const deltakerePerStatus = getAntallDeltakerePerStatus(deltakere)

	return (
		<main className={styles.tiltaksoversiktPage} data-testid="gjennomforing-detaljer-page">
			<section>
				<Tilbakelenke to="/" className={styles.tilbakeknapp} />

				<div className={globalStyles.blokkM}>
					<Heading size="medium" level="2" className={globalStyles.blokkXxs}>{gjennomforing.navn}</Heading>
					<BodyShort>Oppstart: {dateStrWithMonthName(gjennomforing.startDato)}</BodyShort>
					<BodyShort className={globalStyles.blokkXxs}>Sluttdato: {dateStrWithMonthName(gjennomforing.sluttDato)}</BodyShort>
				</div>

				<FilterMeny statusMap={deltakerePerStatus}/>
			</section>

			<DeltakerOversiktTabell deltakere={deltakere}/>
		</main>
	)
}
