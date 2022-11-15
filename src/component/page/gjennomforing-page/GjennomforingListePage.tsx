import { Add, Information } from '@navikt/ds-icons'
import { AxiosResponse } from 'axios'
import React from 'react'

import { Gjennomforing } from '../../../api/data/tiltak'
import { fetchTiltakGjennomforinger } from '../../../api/tiltak-api'
import { useTabTitle } from '../../../hooks/use-tab-title'
import { INFORMASJON_PAGE_ROUTE, LEGG_TIL_DELTAKERLISTE_PAGE_ROUTE } from '../../../navigation'
import { sortAlphabeticAsc } from '../../../utils/sortering-utils'
import { isNotStartedOrPending, isRejected, usePromise } from '../../../utils/use-promise'
import { AlertPage } from '../../felles/alert-page/AlertPage'
import { IkonLenke } from '../../felles/ikon-lenke/IkonLenke'
import { SpinnerPage } from '../../felles/spinner-page/SpinnerPage'
import { GjennomforingListe } from './gjennomforing-liste/GjennomforingListe'
import styles from './GjennomforingListePage.module.scss'

export const GjennomforingListePage = (): React.ReactElement => {
	useTabTitle('Deltakeroversikt')

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
		<main className={styles.page} data-testid="gjennomforing-oversikt-page">
			<GjennomforingListe gjennomforinger={gjennomforinger} />

			<IkonLenke
				to={LEGG_TIL_DELTAKERLISTE_PAGE_ROUTE}
				className={styles.leggTilDeltakerlisteWrapper}
				ikon={<Add />}
				text="Legg til deltakerliste"
			/>

			<IkonLenke
				to={INFORMASJON_PAGE_ROUTE}
				className={styles.informasjonLenkeWrapper}
				ikon={<Information title="Informasjon" />}
				text="Info om deltakeroversikten"
			/>
		</main>
	)
}
