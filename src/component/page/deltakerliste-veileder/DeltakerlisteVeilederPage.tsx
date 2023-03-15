import React, { useEffect } from 'react'
import { useTabTitle } from '../../../hooks/use-tab-title'
import { fetchDeltakerlisteVeileder } from '../../../api/tiltak-api'
import { isNotStartedOrPending, isRejected, usePromise } from '../../../utils/use-promise'
import { AxiosResponse } from 'axios'
import { VeiledersDeltaker } from '../../../api/data/deltaker'
import { SpinnerPage } from '../../felles/spinner-page/SpinnerPage'
import { AlertPage } from '../../felles/alert-page/AlertPage'
import styles from './DeltakerlisteVeilederPage.module.scss'
import { DeltakerlisteVeilederTabell } from './DeltakerlisteVeilederTabell'
import { Detail, Heading } from '@navikt/ds-react'
import globalStyles from '../../../globals.module.scss'
import { FilterMenyStatus } from '../gjennomforing-detaljer/FilterMenyStatus'
import {
	getAntallVeiledersDeltakerePerStatus,
	getDeltakerePerDeltakerliste,
	getDeltakerePerVeilederType
} from '../../../utils/deltakerliste-utils'
import { FilterMenyDeltakerliste } from './FilterMenyDeltakerliste'
import { FilterMenyVeiledertype } from './FilterMenyVeiledertype'
import { useStyle } from '../../../utils/use-style'
import { useTilbakelenkeStore } from '../../../store/tilbakelenke-store'
import { GJENNOMFORING_LISTE_PAGE_ROUTE } from '../../../navigation'
import { useInnloggetBrukerStore } from '../../../store/innlogget-bruker-store'
import { isKoordinatorAndVeileder } from '../../../utils/rolle-utils'

export const DeltakerlisteVeilederPage = (): React.ReactElement => {
	const { setTilbakeTilUrl } = useTilbakelenkeStore()
	const { roller } = useInnloggetBrukerStore()

	useTabTitle('Mine deltakere')

	useStyle(globalStyles.whiteBackground, 'html')

	useEffect(() => {
		if (isKoordinatorAndVeileder(roller)) {
			setTilbakeTilUrl(GJENNOMFORING_LISTE_PAGE_ROUTE)
		} else {
			setTilbakeTilUrl(null)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ roller ])

	const fetchDeltakerlisteVeilederPromise = usePromise<AxiosResponse<VeiledersDeltaker[]>>(
		() => fetchDeltakerlisteVeileder()
	)

	if (isNotStartedOrPending(fetchDeltakerlisteVeilederPromise)) {
		return <SpinnerPage/>
	}

	if (isRejected(fetchDeltakerlisteVeilederPromise)) {
		return <AlertPage variant="error" tekst="Noe gikk galt"/>
	}

	const deltakerlisteVeileder = fetchDeltakerlisteVeilederPromise.result.data

	const deltakerePerStatus = getAntallVeiledersDeltakerePerStatus(deltakerlisteVeileder)

	const deltakerePerDeltakerliste = getDeltakerePerDeltakerliste(deltakerlisteVeileder)

	const deltakerePerVeilederType = getDeltakerePerVeilederType(deltakerlisteVeileder)

	return (
		<div className={styles.deltakerlisteVeileder} data-testid="deltakerliste-veileder-page">
			<section className={styles.infoSection}>
				<Detail><b>Veileder:</b></Detail>
				<Heading size="medium" level="2" className={globalStyles.blokkXs}>Mine deltakere</Heading>
				<FilterMenyStatus statusMap={deltakerePerStatus} className={globalStyles.blokkXs} />
				{ deltakerePerDeltakerliste.size > 1 && <FilterMenyDeltakerliste deltakerlisteMap={deltakerePerDeltakerliste} className={globalStyles.blokkXs} /> }
				<FilterMenyVeiledertype veiledertypeMap={deltakerePerVeilederType} className={globalStyles.blokkXs} />
			</section>
			<DeltakerlisteVeilederTabell deltakerliste={deltakerlisteVeileder} />
		</div>
	)
}
