import { Alert, BodyLong, BodyShort, Heading } from '@navikt/ds-react'
import { AxiosResponse } from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'

import { fetchDeltakerePaTiltakGjennomforing, fetchTiltakGjennomforing } from '../../../api/tiltak-api'
import { TiltakDeltaker } from '../../../domeneobjekter/deltaker'
import { Gjennomforing, TiltakGjennomforingStatus } from '../../../domeneobjekter/tiltak'
import globalStyles from '../../../globals.module.scss'
import { useTabTitle } from '../../../hooks/use-tab-title'
import { GJENNOMFORING_LISTE_PAGE_ROUTE } from '../../../navigation'
import { dateStrWithMonthName } from '../../../utils/date-utils'
import { getAntallDeltakerePerStatus, sluttaForOver2UkerSiden } from '../../../utils/deltaker-status-utils'
import { isNotStartedOrPending, isRejected, usePromise } from '../../../utils/use-promise'
import { Show } from '../../felles/Show'
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
	const deltakereIkkeUtdaterte = deltakere.filter( deltaker => !sluttaForOver2UkerSiden(deltaker.status))
	const deltakerePerStatus = getAntallDeltakerePerStatus(deltakereIkkeUtdaterte)

	return (
		<main className={styles.tiltaksoversiktPage} data-testid="gjennomforing-detaljer-page">
			<section>
				<Tilbakelenke to={GJENNOMFORING_LISTE_PAGE_ROUTE} className={styles.tilbakeknapp} />

				<div className={globalStyles.blokkM}>
					<Heading size="medium" level="2" className={globalStyles.blokkXxs}>{gjennomforing.navn}</Heading>
					<BodyShort>Oppstart: {dateStrWithMonthName(gjennomforing.startDato)}</BodyShort>
					<BodyShort className={globalStyles.blokkXxs}>Sluttdato: {dateStrWithMonthName(gjennomforing.sluttDato)}</BodyShort>

					<Show if={gjennomforing.status === TiltakGjennomforingStatus.AVSLUTTET}>
						<Alert variant="warning" className={styles.statusAlert}>
							<strong>Tiltaket er avsluttet</strong>
							<br/>
							<BodyLong>
								Tiltaket er avlyst eller så er avtalen
								utdatert. Er dette feil, ta kontakt med
								den som er ansvarlig for tiltaket  i NAV.
							</BodyLong>
						</Alert>
					</Show>
				</div>

				<FilterMeny statusMap={deltakerePerStatus}/>
			</section>

			<DeltakerOversiktTabell deltakere={deltakereIkkeUtdaterte}/>
		</main>
	)
}
