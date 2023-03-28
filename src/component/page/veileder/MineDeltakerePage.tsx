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
import { useStyle } from '../../../utils/use-style'
import { useTilbakelenkeStore } from '../../../store/tilbakelenke-store'
import { MINE_DELTAKERLISTER_PAGE_ROUTE } from '../../../navigation'
import { useInnloggetBrukerStore } from '../../../store/innlogget-bruker-store'
import { isKoordinatorAndVeileder } from '../../../utils/rolle-utils'
import { VeilederFiltermenyStatus } from './table-filters/VeilederFiltermenyStatus'
import { VeilederTableFilterStore } from './store/veileder-table-filter-store'
import { VeilederFiltermenyVeilederType } from './table-filters/VeilederFiltermenyVeilederType'
import { VeilederFiltermenyDeltakerliste } from './table-filters/VeilederFiltermenyDeltakerliste'

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

	const showDeltakerlisteFilter = mineDeltakere
		.map((deltaker) => deltaker.deltakerliste.id)
		.filter((item, i, ar) => ar.indexOf(item) === i)
		.length > 1

	return (
		<VeilederTableFilterStore>
			<div className={styles.deltakerlisteVeileder} data-testid="deltakerliste-veileder-page">
				<section className={styles.infoSection}>
					<Detail><b>Veileder:</b></Detail>
					<Heading size="medium" level="2" className={globalStyles.blokkXs}>Mine deltakere</Heading>
					<VeilederFiltermenyStatus deltakere={mineDeltakere}/>
					{showDeltakerlisteFilter &&
						<VeilederFiltermenyDeltakerliste deltakere={mineDeltakere}/>}
					<VeilederFiltermenyVeilederType deltakere={mineDeltakere}/>
				</section>
				<MineDeltakereTabell mineDeltakere={mineDeltakere}/>
			</div>
		</VeilederTableFilterStore>
	)
}
