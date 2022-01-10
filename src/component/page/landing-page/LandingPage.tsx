import { Alert } from '@navikt/ds-react'
import cls from 'classnames'
import { Systemtittel } from 'nav-frontend-typografi'
import React from 'react'

import globalStyles from '../../../globals.module.less'
import { Show } from '../../felles/Show'
import styles from './LandingPage.module.less'

export enum LandingPageView {
	LOGIN = 'LOGIN',
	IKKE_TILGANG = 'IKKE_TILGANG'
}

interface LandingPageProps {
	view: LandingPageView
}

export const LandingPage = (props: LandingPageProps): React.ReactElement => {
	const currentLocation = window.location.href
	const loginUrl = `/oauth2/login?redirect=${currentLocation}`

	return (
		<main className={styles.landingPage}>
			<Systemtittel className={cls(styles.title, globalStyles.blokkM)}>Pilot for tiltaksarrangør</Systemtittel>

			<div className={cls(styles.infoBoks, globalStyles.blokkM)}>
				NAV lager digitale løsninger for tiltaksarrangører, deltakere i tiltakene og NAV.
				Les om&nbsp;
				<a href="https://www.nav.no/no/samarbeidspartner/tiltaksarrangorer/nye-digitale-verktoy-for-tiltaksarrangorer">
					nye digitale verktøy til tiltaksarrangører.
				</a>
			</div>

			<Alert variant="warning" className={cls(styles.alertstripe, globalStyles.blokkM)}>
				Denne tjenesten er en pilot og er under utvikling. Nå i førsteomgang er det bare de
				som har en avtale om bruk som har tilgang til tjenesten.
			</Alert>

			<Show if={props.view === LandingPageView.IKKE_TILGANG}>
				<Alert variant="error" className={cls(styles.alertstripe)}>
					Du har ikke tilgang til tjenesten.
				</Alert>
			</Show>

			<Show if={props.view === LandingPageView.LOGIN}>
				<a className={cls('knapp', 'knapp--hoved', globalStyles.lenkeKnapp)} href={loginUrl}>Logg inn</a>
			</Show>
		</main>
	)
}