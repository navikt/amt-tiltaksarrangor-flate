import { Alert, Heading } from '@navikt/ds-react'
import { AxiosResponse } from 'axios'
import React, { useMemo } from 'react'

import { Gjennomforing } from '../../../../api/data/tiltak'
import { fetchTilgjengeligGjennomforinger, fetchTiltakGjennomforinger } from '../../../../api/tiltak-api'
import globalStyles from '../../../../globals.module.scss'
import { sortAlphabeticAsc } from '../../../../utils/sortering-utils'
import { isNotStartedOrPending, isRejected, usePromise } from '../../../../utils/use-promise'
import { AlertPage } from '../../../felles/alert-page/AlertPage'
import { Show } from '../../../felles/Show'
import { SpinnerPage } from '../../../felles/spinner-page/SpinnerPage'
import { GjennomforingerPaVirksomhetListe } from './GjennomforingerPaVirksomhetListe'

export const GjennomforingListe = () => {
	const fetchGjennomforingerPromise = usePromise<AxiosResponse<Gjennomforing[]>>(
		() => fetchTiltakGjennomforinger()
	)

	const fetchTilgjengeligGjennomforingerPromise = usePromise<AxiosResponse<Gjennomforing[]>>(
		() => fetchTilgjengeligGjennomforinger()
	)

	const gjennomforingerPaOrganisasjon = useMemo(() => {
		const gjennomforinger = (fetchTilgjengeligGjennomforingerPromise.result?.data || [])

		const gjennomforingerPaOrganisasjon: {
			[organisasjonNavn: string]: { [virksomhetNavn: string]: Gjennomforing[] }
		} = {}

		gjennomforinger.forEach(g => {
			const orgnavn = g.arrangor.organisasjonNavn ?? g.arrangor.virksomhetNavn
			if (gjennomforingerPaOrganisasjon[orgnavn] === undefined) {
				gjennomforingerPaOrganisasjon[orgnavn] = {}
			}
			if (gjennomforingerPaOrganisasjon[orgnavn][g.arrangor.virksomhetNavn] === undefined) {
				gjennomforingerPaOrganisasjon[orgnavn][g.arrangor.virksomhetNavn] = []
			}
			gjennomforingerPaOrganisasjon[orgnavn][g.arrangor.virksomhetNavn].push(g)
		})

		return gjennomforingerPaOrganisasjon
	}, [ fetchTilgjengeligGjennomforingerPromise.result ])


	if (
		isNotStartedOrPending(fetchGjennomforingerPromise) ||
		isNotStartedOrPending(fetchTilgjengeligGjennomforingerPromise)
	) {
		return <SpinnerPage />
	}

	if (
		isRejected(fetchGjennomforingerPromise) ||
		isRejected(fetchTilgjengeligGjennomforingerPromise)
	) {
		return <AlertPage variant="error" tekst="Noe gikk galt" />
	}

	const gjennomforingIderAlleredeLagtTil = fetchGjennomforingerPromise.result.data.map(g => g.id)

	const erAlleredeLagtTil = (gjennomforingId: string): boolean => gjennomforingIderAlleredeLagtTil.includes(gjennomforingId)

	return (
		<>
			<Show if={Object.keys(gjennomforingerPaOrganisasjon).length === 0}>
				<Alert variant="info">Det finnes ingen aktive deltakerlister hos din virksomhet.</Alert>
			</Show>

			{Object.keys(gjennomforingerPaOrganisasjon).sort(sortAlphabeticAsc).map((orgnavn) => {
				return (
					<div key={orgnavn} className={globalStyles.blokkM} >
						<Heading size="medium" level="3" spacing>{orgnavn}</Heading>
						{Object.keys(gjennomforingerPaOrganisasjon[orgnavn]).sort(sortAlphabeticAsc).map((virksomhetNavn) => {
							return <GjennomforingerPaVirksomhetListe
								gjennomforinger={gjennomforingerPaOrganisasjon[orgnavn][virksomhetNavn]}
								erAlleredeLagtTil={erAlleredeLagtTil}
								key={virksomhetNavn}
							/>
						})}
					</div>
				)
			})}
		</>
	)
}
