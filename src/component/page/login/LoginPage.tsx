import React from 'react';
import cls from 'classnames';
import { Systemtittel } from 'nav-frontend-typografi';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import styles from './LoginPage.module.less';

export const LoginPage = () => {
	const currentLocation = window.location.href;
	const loginUrl = `/auth-proxy/login?redirect_uri=${currentLocation}`;

	return (
		<main className={styles.loginPage}>
			<Systemtittel className={cls('blokk-xl', styles.title)}>Hei koordinator hos tiltaksarrangør!</Systemtittel>

			<AlertStripeAdvarsel className="blokk-xl">
				Dette er en første løsning til pilot.
				Kun de som har avtalt med Team KOMET og har riktig innstilling gjennom Altinn vil kunne få tilgang til tjenesten.
			</AlertStripeAdvarsel>

			<a className="knapp knapp--hoved" href={loginUrl}>Logg inn</a>
		</main>
	);
};