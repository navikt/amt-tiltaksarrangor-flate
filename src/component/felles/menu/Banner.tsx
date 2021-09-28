import styles from './Banner.module.less';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import React from 'react';
import cls from 'classnames';
import { useDataStore } from '../../../store/data-store';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import navLogo from './nav-logo.svg';
import { VirksomhetVelger } from './virksomhet-velger/VirksomhetVelger';
import globalStyles from '../../../globals.module.less';

export const Banner = () => {
	const { innloggetAnsatt } = useDataStore();

	return (
		<header className={styles.banner}>
			<div className={styles.pilotInfoSection}>
				<AlertStripeInfo>
					Dette er en ny tjeneste som ikke er ferdig.
					Ta kontakt med oss her hvis du har noen tilbakemeldinger.
				</AlertStripeInfo>
			</div>

			<div className={styles.logoAndTitleSection}>
				<img src={navLogo} className={globalStyles.blokkXs} alt="NAV logo"/>
				<Systemtittel>Oversikt for tiltaksarrangører</Systemtittel>
			</div>

			<div>
				<Normaltekst className={globalStyles.blokkXxs}>{`${innloggetAnsatt.fornavn} ${innloggetAnsatt.etternavn}`}</Normaltekst>

				<VirksomhetVelger className={globalStyles.blokkXxs} />

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
