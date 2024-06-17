import { AxiosResponse } from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'

import { Deltaker } from '../../../api/data/deltaker'
import { fetchDeltaker } from '../../../api/tiltak-api'
import globalStyles from '../../../globals.module.scss'
import { useTabTitle } from '../../../hooks/use-tab-title'
import { useKoordinatorsDeltakerlisterStore } from '../../../store/koordinators-deltakerlister-store'
import { isKoordinatorForDeltakerliste } from '../../../utils/rolle-utils'
import { isNotStartedOrPending, isRejected, usePromise } from '../../../utils/use-promise'
import { useStyle } from '../../../utils/use-style'
import { AlertPage } from '../../felles/alert-page/AlertPage'
import { SpinnerPage } from '../../felles/spinner-page/SpinnerPage'
import { DeltakerDetaljer } from './DeltakerDetaljer'
import { DeltakerDetaljerAdresseBeskyttet } from './DeltakerDetaljerAdresseBeskyttet'
import { DeltakerDetaljerHeader } from './DeltakerDetaljerHeader'
import { DeltakerlisteStoreProvider } from './deltaker-detaljer/deltakerliste-store'

export const DeltakerDetaljerPage = (): React.ReactElement => {
	const params = useParams<{ brukerId: string }>()
	const { koordinatorsDeltakerlister } = useKoordinatorsDeltakerlisterStore()

	const brukerId = params.brukerId || ''

	const fetchDeltakerPromise = usePromise<AxiosResponse<Deltaker>>(
		() => fetchDeltaker(brukerId), [ brukerId ]
	)

	useTabTitle('Deltakerdetaljer')
	useStyle(globalStyles.whiteBackground, 'html')

	if (isNotStartedOrPending(fetchDeltakerPromise)) {
		return <SpinnerPage/>
	}

	if (isRejected(fetchDeltakerPromise)) {
		return <AlertPage variant="error" tekst="En feil oppstod"/>
	}

	const deltaker = fetchDeltakerPromise.result.data
	const visTildeling = isKoordinatorForDeltakerliste( deltaker.deltakerliste.id, koordinatorsDeltakerlister )

	if ( deltaker.adressebeskyttet && deltaker.fodselsnummer === '' ) {
		return <DeltakerDetaljerAdresseBeskyttet deltaker={ deltaker } visTildeling={ visTildeling } />
	}

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
				adresse={deltaker.adresse}
				tiltakskode={deltaker.tiltakskode}
			/>
			<DeltakerlisteStoreProvider deltakerliste={deltaker.deltakerliste}>
				<DeltakerDetaljer
					deltaker={deltaker}
					visTildeling={ visTildeling }
				/>
			</DeltakerlisteStoreProvider>
		</div>
	)
}
