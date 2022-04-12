import { AxiosResponse } from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'

import { TiltakDeltakerDetaljer } from '../../../api/data/deltaker'
import { fetchTiltakDeltagerDetaljer } from '../../../api/tiltak-api'
import { isNotStartedOrPending, isRejected, usePromise } from '../../../utils/use-promise'
import { AlertPage } from '../../felles/alert-page/AlertPage'
import { SpinnerPage } from '../../felles/spinner-page/SpinnerPage'
import { BrukerPaaTiltakDetaljer } from './BrukerPaaTiltakDetaljer'

export const BrukerDetaljerPage = (): React.ReactElement => {
	const params = useParams<{ brukerId: string }>()
	const brukerId = params.brukerId || ''

	const fetchTiltakDeltagerDetaljerPromise = usePromise<AxiosResponse<TiltakDeltakerDetaljer>>(
		() => fetchTiltakDeltagerDetaljer(brukerId), [ brukerId ]
	)

	if (isNotStartedOrPending(fetchTiltakDeltagerDetaljerPromise)) {
		return <SpinnerPage />
	}

	if (isRejected(fetchTiltakDeltagerDetaljerPromise)) {
		return <AlertPage variant="error" tekst="En feil oppstod"/>
	}

	const bruker = fetchTiltakDeltagerDetaljerPromise.result.data

	return (
		<main data-testid="bruker-detaljer-page">
			<BrukerPaaTiltakDetaljer bruker={bruker} />
		</main>
	)
}
