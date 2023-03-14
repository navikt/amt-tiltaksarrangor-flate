import { AxiosResponse } from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'

import { TiltakDeltakerDetaljer } from '../../../api/data/deltaker'
import { fetchTiltakDeltakerDetaljer } from '../../../api/tiltak-api'
import globalStyles from '../../../globals.module.scss'
import { useTabTitle } from '../../../hooks/use-tab-title'
import { isNotStartedOrPending, isRejected, usePromise } from '../../../utils/use-promise'
import { useStyle } from '../../../utils/use-style'
import { AlertPage } from '../../felles/alert-page/AlertPage'
import { SpinnerPage } from '../../felles/spinner-page/SpinnerPage'
import { GjennomforingStoreProvider } from './deltaker-detaljer/gjennomforing-store'
import { DeltakerDetaljer } from './DeltakerDetaljer'
import { DeltakerDetaljerHeader } from './DeltakerDetaljerHeader'

export const DeltakerDetaljerPage = (props: { ansattRoller: string[] }): React.ReactElement => {
	const params = useParams<{ brukerId: string }>()
	const brukerId = params.brukerId || ''

	useTabTitle('Deltakerdetaljer')
	useStyle(globalStyles.whiteBackground, 'html')

	const fetchTiltakDeltagerDetaljerPromise = usePromise<AxiosResponse<TiltakDeltakerDetaljer>>(
		() => fetchTiltakDeltakerDetaljer(brukerId), [ brukerId ]
	)

	if (isNotStartedOrPending(fetchTiltakDeltagerDetaljerPromise)) {
		return <SpinnerPage />
	}

	if (isRejected(fetchTiltakDeltagerDetaljerPromise)) {
		return <AlertPage variant="error" tekst="En feil oppstod" />
	}

	const deltaker = fetchTiltakDeltagerDetaljerPromise.result.data

	return (
		<div data-testid="bruker-detaljer-page">
			<DeltakerDetaljerHeader
				gjennomforingId={deltaker.gjennomforing.id}
				fornavn={deltaker.fornavn}
				mellomnavn={deltaker.mellomnavn}
				etternavn={deltaker.etternavn}
				fodselsnummer={deltaker.fodselsnummer}
				telefonnummer={deltaker.telefonnummer}
				epost={deltaker.epost}
			/>
			<GjennomforingStoreProvider gjennomforing={deltaker.gjennomforing}>
				<DeltakerDetaljer deltaker={deltaker} ansattRoller={props.ansattRoller} />
			</GjennomforingStoreProvider>
		</div>
	)
}
