import { AxiosResponse } from 'axios'
import React from 'react'

import { Gjennomforing } from '../../../../api/data/tiltak'
import { fetchTilgjengeligGjennomforinger, fetchTiltakGjennomforinger } from '../../../../api/tiltak-api'
import { sortAlphabeticAsc } from '../../../../utils/sortering-utils'
import { isNotStartedOrPending, isRejected, usePromise } from '../../../../utils/use-promise'
import { AlertPage } from '../../../felles/alert-page/AlertPage'
import { SpinnerPage } from '../../../felles/spinner-page/SpinnerPage'
import styles from './GjennomforingListe.module.scss'
import { GjennomforingPanel } from './GjennomforingPanel'

export const GjennomforingListe = () => {
	const fetchGjennomforingerPromise = usePromise<AxiosResponse<Gjennomforing[]>>(
		() => fetchTiltakGjennomforinger()
	)

	const fetchTilgjengeligGjennomforingerPromise = usePromise<AxiosResponse<Gjennomforing[]>>(
		() => fetchTilgjengeligGjennomforinger()
	)

	if (
		isNotStartedOrPending(fetchGjennomforingerPromise) ||
		isNotStartedOrPending(fetchTilgjengeligGjennomforingerPromise)
	) {
		return <SpinnerPage/>
	}

	if (
		isRejected(fetchGjennomforingerPromise) ||
		isRejected(fetchTilgjengeligGjennomforingerPromise)
	) {
		return <AlertPage variant="error" tekst="Noe gikk galt"/>
	}

	const gjennomforingIderAlleredeLagtTil = fetchGjennomforingerPromise.result.data.map(g => g.id)

	const tilgjengeligeGjennomforinger = fetchTilgjengeligGjennomforingerPromise.result.data

	const sorterteGjennomforinger = tilgjengeligeGjennomforinger
		.sort((g1, g2) => sortAlphabeticAsc(g1.navn, g2.navn))

	const erAlleredeLagtTil = (gjennomforingId: string): boolean => gjennomforingIderAlleredeLagtTil.includes(gjennomforingId)

	return (
		<ul className={styles.list}>
			{ sorterteGjennomforinger.map(g => {
				return (
					<li key={g.id}>
						<GjennomforingPanel
							gjennomforingId={g.id}
							navn={g.navn}
							tiltaksnavn={g.tiltak.tiltaksnavn}
							arrangorNavn={g.arrangor.virksomhetNavn}
							startDato={g.startDato}
							sluttDato={g.sluttDato}
							alleredeLagtTil={erAlleredeLagtTil(g.id)}
						/>
					</li>
				)
			}) }
		</ul>
	)
}
