import { BodyShort, Heading } from '@navikt/ds-react'
import React, { useEffect } from 'react'

import globalStyles from '../../../globals.module.scss'
import { useTabTitle } from '../../../hooks/use-tab-title'
import { GJENNOMFORING_LISTE_PAGE_ROUTE } from '../../../navigation'
import { useTilbakelenkeStore } from '../../../store/tilbakelenke-store'
import toggle from '../../../utils/toggle'
import { Tilbakelenke } from '../../felles/tilbakelenke/Tilbakelenke'
import { GjennomforingListe } from './gjennomforing-liste/GjennomforingListe'
import styles from './LeggTilDeltakerliset.module.scss'


export const LeggTilDeltakerlistePage = () => {
	const { setTilbakeTilUrl } = useTilbakelenkeStore()

	useTabTitle('Legg til og fjern deltakerlister')

	useEffect(() => {
		setTilbakeTilUrl(GJENNOMFORING_LISTE_PAGE_ROUTE)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className={styles.page} data-testid="legg-til-liste-page">
			{ !toggle.navDekoratorEnabled && <Tilbakelenke to={GJENNOMFORING_LISTE_PAGE_ROUTE} className={globalStyles.blokkM}/> }

			<Heading size="large" level="2" className={globalStyles.blokkM}>Legg til og fjern deltakerlister</Heading>

			<BodyShort className={globalStyles.blokkM}>
				Hvilke deltakerlister koordinerer du? Det er viktig at du kun legger til deltakerlister som du er koordinator for.
			</BodyShort>

			<GjennomforingListe />
		</div>
	)
}
