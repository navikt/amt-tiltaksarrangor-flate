import cls from 'classnames'
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper'
import { Systemtittel } from 'nav-frontend-typografi'
import React from 'react'

import globalStyles from '../../../globals.module.less'
import styles from './LoginPage.module.less'

export const LoginPage = (): React.ReactElement => {
	const currentLocation = window.location.href
	const loginUrl = `/oauth2/login?redirect=${currentLocation}`

	return (
		<main className={styles.loginPage}>
			<Systemtittel className={cls(styles.title, globalStyles.blokkXl)}>Pilot for tiltaksarrangør</Systemtittel>

			<div className={cls(styles.infoBoks, globalStyles.blokkL)}>
				NAV lager digitale løsninger for tiltaksarrangører, deltakere i tiltakene og NAV.
				Les om&nbsp;
				<a href="https://www.nav.no/no/samarbeidspartner/tiltaksarrangorer/nye-digitale-verktoy-for-tiltaksarrangorer">
					nye digitale verktøy til tiltaksarrangører.
				</a>
			</div>

			<AlertStripeAdvarsel className={cls(styles.alertstripe, globalStyles.blokkXl)}>
				Denne tjenesten er en pilot og er under utvikling. Nå i førsteomgang er det bare de
				som har en avtale om bruk som har tilgang til tjenesten.
			</AlertStripeAdvarsel>

			<a className="knapp knapp--hoved" href={loginUrl}>Logg inn</a>
		</main>
	)
}