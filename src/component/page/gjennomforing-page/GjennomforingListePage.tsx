import { Add } from '@navikt/ds-icons'
import { AxiosResponse } from 'axios'
import React, { useEffect } from 'react'

import { Gjennomforing } from '../../../api/data/tiltak'
import { fetchDeltakeroversikt, fetchTiltakGjennomforinger } from '../../../api/tiltak-api'
import { useTabTitle } from '../../../hooks/use-tab-title'
import {
	LEGG_TIL_DELTAKERLISTE_PAGE_ROUTE
} from '../../../navigation'
import { useTilbakelenkeStore } from '../../../store/tilbakelenke-store'
import { sortAlphabeticAsc } from '../../../utils/sortering-utils'
import { isNotStartedOrPending, isRejected, usePromise } from '../../../utils/use-promise'
import { AlertPage } from '../../felles/alert-page/AlertPage'
import { IkonLenke } from '../../felles/ikon-lenke/IkonLenke'
import { SpinnerPage } from '../../felles/spinner-page/SpinnerPage'
import { GjennomforingListe } from './gjennomforing-liste/GjennomforingListe'
import styles from './GjennomforingListePage.module.scss'
import { BodyShort, Link } from '@navikt/ds-react'
import { DeltakerOversikt } from '../../../api/data/deltaker'
import env from '../../../utils/environment'
import { IngenRollePage } from '../ingen-rolle-page/IngenRollePage'
import { DeltakerListe } from './gjennomforing-liste/DeltakerListe'

export const GjennomforingListePage = (): React.ReactElement => {
	const { setTilbakeTilUrl } = useTilbakelenkeStore()

	useTabTitle('Deltakeroversikt')

	useEffect(() => {
		setTilbakeTilUrl(null)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const fetchGjennomforingerPromise = usePromise<AxiosResponse<Gjennomforing[]>>(
		() => fetchTiltakGjennomforinger()
	)

	const fetchDeltakerOversiktPromise = usePromise<AxiosResponse<DeltakerOversikt>>(
		() => fetchDeltakeroversikt()
	)

	if (
		isNotStartedOrPending(fetchGjennomforingerPromise)
		|| isNotStartedOrPending(fetchDeltakerOversiktPromise)
	) {
		return <SpinnerPage />
	}

	if (
		isRejected(fetchGjennomforingerPromise)
		|| isRejected(fetchDeltakerOversiktPromise)
	) {
		return <AlertPage variant="error" tekst="Noe gikk galt" />
	}

	const alleGjennomforinger = fetchGjennomforingerPromise.result.data
	
	const deltakerOversikt = fetchDeltakerOversiktPromise.result.data

	const gjennomforinger = alleGjennomforinger
		.sort((g1, g2) => sortAlphabeticAsc(g1.navn, g2.navn))
	
	if (env.isProd) {
		return (
			<div className={styles.page} data-testid="gjennomforing-oversikt-page">
				<GjennomforingListe gjennomforinger={gjennomforinger}/>

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
		if (deltakerOversikt.koordinator && deltakerOversikt.koordinator?.deltakerlister.length > 0) {
			return (
				<div className={styles.page} data-testid="gjennomforing-oversikt-page">
					<DeltakerListe deltakerliste={deltakerOversikt.koordinator.deltakerlister}/>

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
			return <IngenRollePage />
		}
	}
}
