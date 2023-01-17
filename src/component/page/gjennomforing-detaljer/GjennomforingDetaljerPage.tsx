import { Heading } from '@navikt/ds-react'
import { AxiosResponse } from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { TiltakDeltaker } from '../../../api/data/deltaker'
import { Gjennomforing } from '../../../api/data/tiltak'
import { fetchDeltakerePaTiltakGjennomforing, fetchTiltakGjennomforing } from '../../../api/tiltak-api'
import globalStyles from '../../../globals.module.scss'
import { useTabTitle } from '../../../hooks/use-tab-title'
import { GJENNOMFORING_LISTE_PAGE_ROUTE } from '../../../navigation'
import { useTilbakelenkeStore } from '../../../store/tilbakelenke-store'
import { getAntallDeltakerePerStatus } from '../../../utils/deltaker-status-utils'
import toggle from '../../../utils/toggle'
import { isNotStartedOrPending, isRejected, usePromise } from '../../../utils/use-promise'
import { AlertPage } from '../../felles/alert-page/AlertPage'
import { SpinnerPage } from '../../felles/spinner-page/SpinnerPage'
import { Tilbakelenke } from '../../felles/tilbakelenke/Tilbakelenke'
import { DeltakerOversiktTabell } from './deltaker-oversikt/DeltakerOversiktTabell'
import { FilterMeny } from './FilterMeny'
import styles from './GjennomforingDetaljerPage.module.scss'
import { KoordinatorInfo } from './KoordinatorInfo'
import { TiltakInfo } from './TiltakInfo'

export const GjennomforingDetaljerPage = (): React.ReactElement => {
	const { setTilbakeTilUrl } = useTilbakelenkeStore()
	const params = useParams<{ gjennomforingId: string }>()
	const gjennomforingId = params.gjennomforingId || ''

	useEffect(() => {
		setTilbakeTilUrl(GJENNOMFORING_LISTE_PAGE_ROUTE)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useTabTitle('Deltakerliste')

	const fetchDeltakerePaGjennomforingPromise = usePromise<AxiosResponse<TiltakDeltaker[]>>(
		() => fetchDeltakerePaTiltakGjennomforing(gjennomforingId), [ gjennomforingId ]
	)

	const fetchGjennomforingPromise = usePromise<AxiosResponse<Gjennomforing>>(
		() => fetchTiltakGjennomforing(gjennomforingId), [ gjennomforingId ]
	)

	if (
		isNotStartedOrPending(fetchDeltakerePaGjennomforingPromise)
		|| isNotStartedOrPending(fetchGjennomforingPromise)
	) {
		return <SpinnerPage />
	}

	if (
		isRejected(fetchDeltakerePaGjennomforingPromise)
		|| isRejected(fetchGjennomforingPromise)
	) {
		return <AlertPage variant="error" tekst="Noe gikk galt" />
	}

	const deltakere = fetchDeltakerePaGjennomforingPromise.result.data

	const gjennomforing = fetchGjennomforingPromise.result.data

	const deltakerePerStatus = getAntallDeltakerePerStatus(deltakere)

	return (
		<div className={styles.gjennomforingDetaljer} data-testid="gjennomforing-detaljer-page">
			<section className={styles.infoSection}>
				{!toggle.navDekoratorEnabled && <Tilbakelenke to={GJENNOMFORING_LISTE_PAGE_ROUTE} className={styles.tilbakelenke} />}
				<Heading size="medium" level="2" className={globalStyles.blokkXs}>{gjennomforing.navn}</Heading>
				<FilterMeny statusMap={deltakerePerStatus} className={globalStyles.blokkXs} />
				<TiltakInfo gjennomforing={gjennomforing} className={globalStyles.blokkXs} />
				<KoordinatorInfo gjennomforingId={gjennomforing.id} />
			</section>

			<DeltakerOversiktTabell deltakere={deltakere} />
		</div>
	)
}
