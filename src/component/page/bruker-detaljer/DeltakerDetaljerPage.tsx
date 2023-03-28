import { AxiosResponse } from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'

import { Deltaker } from '../../../api/data/deltaker'
import { fetchDeltaker } from '../../../api/tiltak-api'
import globalStyles from '../../../globals.module.scss'
import { useTabTitle } from '../../../hooks/use-tab-title'
import { isNotStartedOrPending, isRejected, usePromise } from '../../../utils/use-promise'
import { useStyle } from '../../../utils/use-style'
import { AlertPage } from '../../felles/alert-page/AlertPage'
import { SpinnerPage } from '../../felles/spinner-page/SpinnerPage'
import { DeltakerlisteStoreProvider } from './deltaker-detaljer/deltakerliste-store'
import { DeltakerDetaljer } from './DeltakerDetaljer'
import { DeltakerDetaljerHeader } from './DeltakerDetaljerHeader'
import { isKoordinator } from '../../../utils/rolle-utils'
import { useInnloggetBrukerStore } from '../../../store/innlogget-bruker-store'

export const DeltakerDetaljerPage = (): React.ReactElement => {
	const params = useParams<{ brukerId: string }>()
	const { roller } = useInnloggetBrukerStore()

	const brukerId = params.brukerId || ''

	useTabTitle('Deltakerdetaljer')
	useStyle(globalStyles.whiteBackground, 'html')

	const fetchDeltakerPromise = usePromise<AxiosResponse<Deltaker>>(
		() => fetchDeltaker(brukerId), [ brukerId ]
	)

	if (isNotStartedOrPending(fetchDeltakerPromise)) {
		return <SpinnerPage/>
	}

	if (isRejected(fetchDeltakerPromise)) {
		return <AlertPage variant="error" tekst="En feil oppstod"/>
	}

	const deltaker = fetchDeltakerPromise.result.data

	return (
		<div data-testid="bruker-detaljer-page">
			<DeltakerDetaljerHeader
				deltakerlisteId={deltaker.deltakerliste.id}
				fornavn={deltaker.fornavn}
				mellomnavn={deltaker.mellomnavn}
				etternavn={deltaker.etternavn}
				fodselsnummer={deltaker.fodselsnummer}
				telefonnummer={deltaker.telefonnummer}
				epost={deltaker.epost}
			/>
			<DeltakerlisteStoreProvider deltakerliste={deltaker.deltakerliste}>
				<DeltakerDetaljer deltaker={deltaker} visTildeling={isKoordinator(roller)}/>
			</DeltakerlisteStoreProvider>
		</div>
	)
}
