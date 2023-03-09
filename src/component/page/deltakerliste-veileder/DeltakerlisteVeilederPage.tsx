import React from 'react'
import { useTabTitle } from '../../../hooks/use-tab-title'
import { fetchDeltakerlisteVeileder } from '../../../api/tiltak-api'
import { isNotStartedOrPending, isRejected, usePromise } from '../../../utils/use-promise'
import { AxiosResponse } from 'axios'
import { VeiledersDeltaker } from '../../../api/data/deltaker'
import { SpinnerPage } from '../../felles/spinner-page/SpinnerPage'
import { AlertPage } from '../../felles/alert-page/AlertPage'
import styles from './DeltakerlisteVeilederPage.module.scss'
import { DeltakerlisteVeilederTabell } from './DeltakerlisteVeilederTabell'
import { Heading } from '@navikt/ds-react'
import globalStyles from '../../../globals.module.scss'
import { FilterMeny } from '../gjennomforing-detaljer/FilterMeny'
import {
	getAntallVeiledersDeltakerePerStatus,
	getDeltakerePerDeltakerliste,
	getDeltakerePerVeilederType
} from '../../../utils/deltakerliste-utils'
import { FilterMenyDeltakerliste } from './FilterMenyDeltakerliste'
import { FilterMenyVeiledertype } from './FilterMenyVeiledertype'

export const DeltakerlisteVeilederPage = (): React.ReactElement => {
	useTabTitle('Deltakerliste')

	const fetchDeltakerlisteVeilederPromise = usePromise<AxiosResponse<VeiledersDeltaker[]>>(
		() => fetchDeltakerlisteVeileder()
	)

	if (isNotStartedOrPending(fetchDeltakerlisteVeilederPromise)) {
		return <SpinnerPage />
	}

	if (isRejected(fetchDeltakerlisteVeilederPromise)) {
		return <AlertPage variant="error" tekst="Noe gikk galt" />
	}

	const deltakerlisteVeileder = fetchDeltakerlisteVeilederPromise.result.data

	const deltakerePerStatus = getAntallVeiledersDeltakerePerStatus(deltakerlisteVeileder)
	
	const deltakerePerDeltakerliste = getDeltakerePerDeltakerliste(deltakerlisteVeileder)

	const deltakerePerVeilederType = getDeltakerePerVeilederType(deltakerlisteVeileder)

	return (
		<div className={styles.deltakerlisteVeileder} data-testid="deltakerliste-veileder-page">
			<section className={styles.infoSection}>
				<Heading size="xsmall" level="2" className={globalStyles.blokkXs}>Veileder:</Heading>
				<Heading size="medium" level="2" className={globalStyles.blokkXs}>Mine deltakere</Heading>
				<FilterMeny statusMap={deltakerePerStatus} className={globalStyles.blokkXs} />
				{ deltakerePerDeltakerliste.size > 1 && <FilterMenyDeltakerliste deltakerlisteMap={deltakerePerDeltakerliste} className={globalStyles.blokkXs} /> }
				<FilterMenyVeiledertype erMedveilederMap={deltakerePerVeilederType} className={globalStyles.blokkXs} />
			</section>
			<DeltakerlisteVeilederTabell deltakerliste={deltakerlisteVeileder} />
		</div>
	)
}