import { Add } from '@navikt/ds-icons'
import { AxiosResponse } from 'axios'
import React, { useEffect } from 'react'

import { fetchDeltakeroversikt } from '../../../api/tiltak-api'
import { useTabTitle } from '../../../hooks/use-tab-title'
import {
	LEGG_TIL_DELTAKERLISTE_PAGE_ROUTE
} from '../../../navigation'
import { useTilbakelenkeStore } from '../../../store/tilbakelenke-store'
import { isNotStartedOrPending, isRejected, usePromise } from '../../../utils/use-promise'
import { AlertPage } from '../../felles/alert-page/AlertPage'
import { IkonLenke } from '../../felles/ikon-lenke/IkonLenke'
import { SpinnerPage } from '../../felles/spinner-page/SpinnerPage'
import styles from './GjennomforingListePage.module.scss'
import { Alert, BodyShort, Link } from '@navikt/ds-react'
import { DeltakerOversikt } from '../../../api/data/deltaker'
import { DeltakerListe } from './gjennomforing-liste/DeltakerListe'
import { MineDeltakerePanel } from './minedeltakere/MineDeltakerePanel'
import toggle from '../../../utils/toggle'
import globalStyles from '../../../globals.module.scss'

export const GjennomforingListePage = (): React.ReactElement => {
	const { setTilbakeTilUrl } = useTilbakelenkeStore()

	useTabTitle('Deltakeroversikt')

	useEffect(() => {
		setTilbakeTilUrl(null)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const fetchDeltakerOversiktPromise = usePromise<AxiosResponse<DeltakerOversikt>>(
		() => fetchDeltakeroversikt()
	)

	if (isNotStartedOrPending(fetchDeltakerOversiktPromise)) {
		return <SpinnerPage />
	}

	if (isRejected(fetchDeltakerOversiktPromise)) {
		return <AlertPage variant="error" tekst="Noe gikk galt" />
	}
	
	const deltakerOversikt = fetchDeltakerOversiktPromise.result.data

	if (deltakerOversikt.koordinatorInfo) {
		return (
			<div className={styles.page} data-testid="gjennomforing-oversikt-page">
				{ toggle.veilederEnabled && deltakerOversikt.veilederInfo && <MineDeltakerePanel veileder={deltakerOversikt.veilederInfo}/> }
				<DeltakerListe deltakerliste={deltakerOversikt.koordinatorInfo.deltakerlister}/>

				<IkonLenke
					to={LEGG_TIL_DELTAKERLISTE_PAGE_ROUTE}
					className={styles.leggTilDeltakerlisteWrapper}
					ikon={<Add/>}
					text="Legg til deltakerliste"
				/>

				<Link href="https://www.nav.no/samarbeidspartner/deltakeroversikt" className={styles.informasjonLenkeWrapper}>
					<BodyShort>Info om deltakeroversikten</BodyShort>
				</Link>
			</div>
		)
	} else {
		return <Alert variant="info" className={globalStyles.blokkM}>For å se deltakere må du legge til en deltakerliste.</Alert>
	}
}
