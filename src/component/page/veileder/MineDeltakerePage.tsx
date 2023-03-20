import React, { useEffect } from 'react'
import { useTabTitle } from '../../../hooks/use-tab-title'
import { fetchMineDeltakere } from '../../../api/tiltak-api'
import { isNotStartedOrPending, isRejected, usePromise } from '../../../utils/use-promise'
import { AxiosResponse } from 'axios'
import { VeiledersDeltaker } from '../../../api/data/deltaker'
import { SpinnerPage } from '../../felles/spinner-page/SpinnerPage'
import { AlertPage } from '../../felles/alert-page/AlertPage'
import styles from './MineDeltakerePage.module.scss'
import { MineDeltakereTabell } from './MineDeltakereTabell'
import { Detail, Heading } from '@navikt/ds-react'
import globalStyles from '../../../globals.module.scss'
import { FilterMenyStatus } from '../deltakerliste-detaljer/FilterMenyStatus'
import {
	getAntallVeiledersDeltakerePerStatus,
	getDeltakerePerDeltakerliste,
	getDeltakerePerVeilederType
} from '../../../utils/deltakerliste-utils'
import { FilterMenyDeltakerliste } from './FilterMenyDeltakerliste'
import { FilterMenyVeiledertype } from './FilterMenyVeiledertype'
import { useStyle } from '../../../utils/use-style'
import { useTilbakelenkeStore } from '../../../store/tilbakelenke-store'
import { MINE_DELTAKERLISTER_PAGE_ROUTE } from '../../../navigation'
import { useInnloggetBrukerStore } from '../../../store/innlogget-bruker-store'
import { isKoordinatorAndVeileder } from '../../../utils/rolle-utils'

export const MineDeltakerePage = (): React.ReactElement => {
	const { setTilbakeTilUrl } = useTilbakelenkeStore()
	const { roller } = useInnloggetBrukerStore()

	useTabTitle('Mine deltakere')

	useStyle(globalStyles.whiteBackground, 'html')

	useEffect(() => {
		if (isKoordinatorAndVeileder(roller)) {
			setTilbakeTilUrl(MINE_DELTAKERLISTER_PAGE_ROUTE)
		} else {
			setTilbakeTilUrl(null)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ roller ])

	const fetchMineDeltakerePromise = usePromise<AxiosResponse<VeiledersDeltaker[]>>(
		() => fetchMineDeltakere()
	)

	if (isNotStartedOrPending(fetchMineDeltakerePromise)) {
		return <SpinnerPage/>
	}

	if (isRejected(fetchMineDeltakerePromise)) {
		return <AlertPage variant="error" tekst="Noe gikk galt"/>
	}

	const mineDeltakere = fetchMineDeltakerePromise.result.data

	const deltakerePerStatus = getAntallVeiledersDeltakerePerStatus(mineDeltakere)

	const deltakerePerDeltakerliste = getDeltakerePerDeltakerliste(mineDeltakere)

	const deltakerePerVeilederType = getDeltakerePerVeilederType(mineDeltakere)

	return (
		<div className={styles.deltakerlisteVeileder} data-testid="deltakerliste-veileder-page">
			<section className={styles.infoSection}>
				<Detail><b>Veileder:</b></Detail>
				<Heading size="medium" level="2" className={globalStyles.blokkXs}>Mine deltakere</Heading>
				<FilterMenyStatus statusMap={deltakerePerStatus} className={globalStyles.blokkXs} />
				{ deltakerePerDeltakerliste.size > 1 && <FilterMenyDeltakerliste deltakerlisteMap={deltakerePerDeltakerliste} className={globalStyles.blokkXs} /> }
				<FilterMenyVeiledertype veiledertypeMap={deltakerePerVeilederType} className={globalStyles.blokkXs} />
			</section>
			<MineDeltakereTabell mineDeltakere={mineDeltakere} />
		</div>
	)
}
