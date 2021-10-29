import { AxiosResponse } from 'axios'
import { AlertStripeFeil } from 'nav-frontend-alertstriper'
import React from 'react'
import { useParams } from 'react-router-dom'

import { fetchTiltakDeltagerDetaljer } from '../../../api/tiltak-api'
import { TiltakDeltagerDetaljer } from '../../../domeneobjekter/deltager'
import { isNotStartedOrPending, isRejected, usePromise } from '../../../utils/use-promise'
import { Spinner } from '../../felles/spinner/Spinner'
import { BrukerPaaTiltakDetaljer } from './BrukerPaaTiltakDetaljer'

export const BrukerDetaljerPage = () => {
	const params = useParams<{ brukerId: string }>()

	const fetchTiltakDeltagerDetaljerPromise = usePromise<AxiosResponse<TiltakDeltagerDetaljer>>(
		() => fetchTiltakDeltagerDetaljer(params.brukerId), [ params.brukerId ]
	)

	if (isNotStartedOrPending(fetchTiltakDeltagerDetaljerPromise)) {
		return <Spinner />
	}

	if (isRejected(fetchTiltakDeltagerDetaljerPromise)) {
		return <AlertStripeFeil>En feil oppstod</AlertStripeFeil>
	}

	const bruker = fetchTiltakDeltagerDetaljerPromise.result.data

	return (
		<main>
			<BrukerPaaTiltakDetaljer bruker={bruker} />
		</main>
	)
}
