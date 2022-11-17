import { AxiosResponse } from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'

import { TiltakDeltakerDetaljer } from '../../../api/data/deltaker'
import { fetchTiltakDeltagerDetaljer } from '../../../api/tiltak-api'
import globalStyles from '../../../globals.module.scss'
import { useTabTitle } from '../../../hooks/use-tab-title'
import { isNotStartedOrPending, isRejected, usePromise } from '../../../utils/use-promise'
import { useStyle } from '../../../utils/use-style'
import { AlertPage } from '../../felles/alert-page/AlertPage'
import { SpinnerPage } from '../../felles/spinner-page/SpinnerPage'
import { DeltakerDetaljer } from './DeltakerDetaljer'
import { DeltakerDetaljerHeader } from './DeltakerDetaljerHeader'

export const DeltakerDetaljerPage = (): React.ReactElement => {
	const params = useParams<{ brukerId: string }>()
	const brukerId = params.brukerId || ''

	useTabTitle('Deltakerdetaljer')
	useStyle(globalStyles.whiteBackground, 'html')

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
			<DeltakerDetaljerHeader gjennomforingId={bruker.gjennomforing.id} fornavn={bruker.fornavn} etternavn={bruker.etternavn} fodselsnummer={bruker.fodselsnummer} telefonnummer={bruker.telefonnummer} epost={bruker.epost}/>
			<DeltakerDetaljer bruker={bruker} />
		</main>
	)
}
