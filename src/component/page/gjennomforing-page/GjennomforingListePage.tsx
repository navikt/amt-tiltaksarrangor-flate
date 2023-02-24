import { Add, ExternalLink } from '@navikt/ds-icons'
import { AxiosResponse } from 'axios'
import React, { useEffect } from 'react'

import { Gjennomforing } from '../../../api/data/tiltak'
import { fetchTiltakGjennomforinger } from '../../../api/tiltak-api'
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

	if (isNotStartedOrPending(fetchGjennomforingerPromise)) {
		return <SpinnerPage />
	}

	if (isRejected(fetchGjennomforingerPromise)) {
		return <AlertPage variant="error" tekst="Noe gikk galt" />
	}

	const alleGjennomforinger = fetchGjennomforingerPromise.result.data

	const gjennomforinger = alleGjennomforinger
		.sort((g1, g2) => sortAlphabeticAsc(g1.navn, g2.navn))

	return (
		<div className={styles.page} data-testid="gjennomforing-oversikt-page">
			<GjennomforingListe gjennomforinger={gjennomforinger} />

			<IkonLenke
				to={LEGG_TIL_DELTAKERLISTE_PAGE_ROUTE}
				className={styles.leggTilDeltakerlisteWrapper}
				ikon={<Add />}
				text="Legg til deltakerliste"
			/>

			<Link target="_blank" rel="noopener noreferrer" href="https://www.nav.no/samarbeidspartner/deltakeroversikt" className={styles.informasjonLenkeWrapper}>
				<BodyShort>Info om deltakeroversikten</BodyShort>
				<ExternalLink />
			</Link>
		</div>
	)
}
