import { BodyShort, Heading } from '@navikt/ds-react'
import React, { useEffect } from 'react'

import globalStyles from '../../../globals.module.scss'
import { useTabTitle } from '../../../hooks/use-tab-title'
import { GJENNOMFORING_LISTE_PAGE_ROUTE } from '../../../navigation'
import { useTilbakelenkeStore } from '../../../store/tilbakelenke-store'
import { GjennomforingListe } from './gjennomforing-liste/GjennomforingListe'
import styles from './LeggTilDeltakerliset.module.scss'
import { AdministrerDeltakerlisterPage } from '../administrer-deltakerlister-page/AdministrerDeltakerlisterPage';


export const LeggTilDeltakerlistePage = () => {
	const { setTilbakeTilUrl } = useTilbakelenkeStore()

	useTabTitle('Legg til og fjern deltakerlister')

	useEffect(() => {
		setTilbakeTilUrl(GJENNOMFORING_LISTE_PAGE_ROUTE)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<AdministrerDeltakerlisterPage/>

			<div className={styles.page} data-testid="legg-til-liste-page">

				<Heading size="large" level="2" className={globalStyles.blokkM}>Legg til og fjern deltakerlister</Heading>

				<BodyShort className={globalStyles.blokkM}>
					Hvilke deltakerlister koordinerer du? Det er viktig at du kun legger til deltakerlister som du er koordinator for.
				</BodyShort>

				<GjennomforingListe />
			</div>
		</>

	)
}
