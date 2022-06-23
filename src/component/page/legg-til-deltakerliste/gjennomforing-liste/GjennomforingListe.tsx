import { Heading } from '@navikt/ds-react'
import { AxiosResponse } from 'axios'
import React, { useMemo } from 'react'

import { Gjennomforing } from '../../../../api/data/tiltak'
import { fetchTilgjengeligGjennomforinger, fetchTiltakGjennomforinger } from '../../../../api/tiltak-api'
import globalStyles from '../../../../globals.module.scss'
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

	const gjennomforingerPaVirksomhet = useMemo(() => {
		const sorterteGjennomforinger = (fetchTilgjengeligGjennomforingerPromise.result?.data || [])
			.sort((g1, g2) => sortAlphabeticAsc(g1.navn, g2.navn))

		const gjennomforingerPaVirksomhet: { [virksomhetNavn: string]: Gjennomforing[] } = {}

		sorterteGjennomforinger.forEach(g => {
			if (gjennomforingerPaVirksomhet[g.arrangor.virksomhetNavn] === undefined) {
				gjennomforingerPaVirksomhet[g.arrangor.virksomhetNavn] = []
			}

			gjennomforingerPaVirksomhet[g.arrangor.virksomhetNavn].push(g)
		})

		return gjennomforingerPaVirksomhet
	}, [ fetchTilgjengeligGjennomforingerPromise.result ])

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

	const erAlleredeLagtTil = (gjennomforingId: string): boolean => gjennomforingIderAlleredeLagtTil.includes(gjennomforingId)

	return (
		<>
			{ Object.entries(gjennomforingerPaVirksomhet).map(([ virksomhetNavn, gjennomforinger ]) => {
				return (
					<div key={virksomhetNavn} className={globalStyles.blokkM}>
						<Heading size="small" level="3" spacing>{virksomhetNavn}</Heading>
						<ul className={styles.list}>
							{gjennomforinger.map(g => {
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
							})}
						</ul>
					</div>
				)
			})}
		</>
	)
}
