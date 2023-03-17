import { Heading } from '@navikt/ds-react'
import { AxiosResponse } from 'axios'
import React, { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import { TiltakDeltaker } from '../../../api/data/deltaker'
import { Gjennomforing } from '../../../api/data/tiltak'
import { fetchDeltakerePaTiltakGjennomforing, fetchTiltakGjennomforing } from '../../../api/tiltak-api'
import globalStyles from '../../../globals.module.scss'
import { useTabTitle } from '../../../hooks/use-tab-title'
import { MINE_DELTAKERLISTER_PAGE_ROUTE } from '../../../navigation'
import { useTilbakelenkeStore } from '../../../store/tilbakelenke-store'
import { getAntallDeltakerePerStatus } from '../../../utils/deltaker-status-utils'
import { isNotFound, isNotStartedOrPending, isRejected, usePromise } from '../../../utils/use-promise'
import { AlertPage } from '../../felles/alert-page/AlertPage'
import { SpinnerPage } from '../../felles/spinner-page/SpinnerPage'
import { DeltakerOversiktTabell } from './deltaker-oversikt/DeltakerOversiktTabell'
import { FilterMenyStatus } from './FilterMenyStatus'
import styles from './DeltakerlisteDetaljerPage.module.scss'
import { KoordinatorInfo } from './KoordinatorInfo'
import { TiltakInfo } from './TiltakInfo'

export const DeltakerlisteDetaljerPage = (): React.ReactElement => {
	const { setTilbakeTilUrl } = useTilbakelenkeStore()
	const params = useParams<{ deltakerlisteId: string }>()
	const deltakerlisteId = params.deltakerlisteId || ''

	useEffect(() => {
		setTilbakeTilUrl(MINE_DELTAKERLISTER_PAGE_ROUTE)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useTabTitle('Deltakerliste')

	const fetchDeltakerePaGjennomforingPromise = usePromise<AxiosResponse<TiltakDeltaker[]>>(
		() => fetchDeltakerePaTiltakGjennomforing(deltakerlisteId), [ deltakerlisteId ]
	)

	const fetchDeltakerlistePromise = usePromise<AxiosResponse<Gjennomforing>>(
		() => fetchTiltakGjennomforing(deltakerlisteId), [ deltakerlisteId ]
	)

	if (
		isNotStartedOrPending(fetchDeltakerePaGjennomforingPromise)
		|| isNotStartedOrPending(fetchDeltakerlistePromise)
	) {
		return <SpinnerPage />
	}

	if (
		isRejected(fetchDeltakerePaGjennomforingPromise)
		|| isRejected(fetchDeltakerlistePromise)
	) {

		if(isNotFound(fetchDeltakerlistePromise)) {
			return <Navigate replace to={MINE_DELTAKERLISTER_PAGE_ROUTE}/>
		}

		return <AlertPage variant="error" tekst="Noe gikk galt" />
	}

	const deltakere = fetchDeltakerePaGjennomforingPromise.result.data

	const deltakerliste = fetchDeltakerlistePromise.result.data

	const deltakerePerStatus = getAntallDeltakerePerStatus(deltakere)

	return (
		<div className={styles.deltakerlisteDetaljer} data-testid="gjennomforing-detaljer-page">
			<section className={styles.infoSection}>
				<Heading size="small" level="2" className={globalStyles.blokkXs}>{deltakerliste.navn}</Heading>
				<TiltakInfo gjennomforing={deltakerliste} className={globalStyles.blokkXs} />
				<KoordinatorInfo deltakerlisteId={deltakerliste.id} />
				<FilterMenyStatus statusMap={deltakerePerStatus} className={globalStyles.blokkXs} />
			</section>

			<DeltakerOversiktTabell deltakere={deltakere} />
		</div>
	)
}
