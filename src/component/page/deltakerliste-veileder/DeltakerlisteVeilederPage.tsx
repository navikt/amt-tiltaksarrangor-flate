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

	return (
		// her må det legges til filter (egen oppgave)
		<div className={styles.deltakerlisteVeileder} data-testid="deltakerliste-veileder-page">
			<DeltakerlisteVeilederTabell deltakerliste={deltakerlisteVeileder} />
		</div>
	)
}