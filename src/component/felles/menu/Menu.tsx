import styles from './Menu.module.less';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import React from 'react';
import cls from 'classnames';
import { useDataStore } from '../../../store/data-store';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import navLogo from './nav-logo.svg';
import { VirksomhetVelger } from './virksomhet-velger/VirksomhetVelger';

export const Menu = () => {
	const { innloggetAnsatt } = useDataStore();

	return (
		<header className={styles.menu}>
			<div className={styles.pilotInfoSection}>
				<AlertStripeInfo>
					Dette er en ny tjeneste som ikke er ferdig.
					Ta kontakt med oss her hvis du har noen tilbakemeldinger.
				</AlertStripeInfo>
			</div>

			<div className={styles.logoAndTitleSection}>
				<img src={navLogo} className="blokk-xs" alt="NAV logo"/>
				<Systemtittel>Oversikt for tiltaksarrangører</Systemtittel>
			</div>

			<div>
				<Normaltekst className="blokk-xxs">{`${innloggetAnsatt.fornavn} ${innloggetAnsatt.etternavn}`}</Normaltekst>

				<VirksomhetVelger className="blokk-xxs" />

				<a
					href="/auth-proxy/oauth2/logout?redirect_uri=https://nav.no"
					className={cls('knapp', 'knapp--standard', styles.logoutBtn)}
				>
					Logg ut
				</a>
			</div>
		</header>
	);
};
