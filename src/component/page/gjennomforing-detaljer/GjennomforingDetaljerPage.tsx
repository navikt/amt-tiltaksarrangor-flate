import { AxiosResponse } from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'

import { TiltakDeltaker } from '../../../api/data/deltaker'
import { fetchDeltakerePaTiltakGjennomforing } from '../../../api/tiltak-api'
import { useTabTitle } from '../../../hooks/use-tab-title'
import { GJENNOMFORING_LISTE_PAGE_ROUTE } from '../../../navigation'
import { getAntallDeltakerePerStatus } from '../../../utils/deltaker-status-utils'
import { isNotStartedOrPending, isRejected, usePromise } from '../../../utils/use-promise'
import { AlertPage } from '../../felles/alert-page/AlertPage'
import { SpinnerPage } from '../../felles/spinner-page/SpinnerPage'
import { Tilbakelenke } from '../../felles/tilbakelenke/Tilbakelenke'
import { DeltakerOversiktTabell } from './deltaker-oversikt/DeltakerOversiktTabell'
import { FilterMeny } from './FilterMeny'
import styles from './GjennomforingDetaljerPage.module.scss'
import { TiltakInfo } from './TiltakInfo'

export const GjennomforingDetaljerPage = (): React.ReactElement => {
	useTabTitle('Deltakeroversikt')

	const params  = useParams<{ gjennomforingId: string }>()
	const gjennomforingId = params.gjennomforingId || ''

	const fetchDeltakerePaGjennomforingPromise = usePromise<AxiosResponse<TiltakDeltaker[]>>(
		() => fetchDeltakerePaTiltakGjennomforing(gjennomforingId), [ gjennomforingId ]
	)

	if (isNotStartedOrPending(fetchDeltakerePaGjennomforingPromise)) {
		return <SpinnerPage/>
	}

	if (isRejected(fetchDeltakerePaGjennomforingPromise)) {
		return <AlertPage variant="error" tekst="Noe gikk galt"/>
	}

	const deltakere = fetchDeltakerePaGjennomforingPromise.result.data
	const deltakerePerStatus = getAntallDeltakerePerStatus(deltakere)

	return (
		<main className={styles.tiltaksoversiktPage} data-testid="gjennomforing-detaljer-page">
			<section>
				<Tilbakelenke to={GJENNOMFORING_LISTE_PAGE_ROUTE} className={styles.tilbakelenke} />
				<TiltakInfo gjennomforingId={gjennomforingId}/>
				<FilterMeny statusMap={deltakerePerStatus}/>
			</section>

			<DeltakerOversiktTabell deltakere={deltakere}/>
		</main>
	)
}
