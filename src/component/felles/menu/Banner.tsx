import cls from 'classnames'
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi'
import React from 'react'

import globalStyles from '../../../globals.module.less'
import { useDataStore } from '../../../store/data-store'
import styles from './Banner.module.less'
import navLogo from './nav-logo.svg'
import { VirksomhetVelger } from './virksomhet-velger/VirksomhetVelger'


export const Banner = (): React.ReactElement => {
	const { innloggetAnsatt } = useDataStore()

	return (
		<header className={styles.banner}>
			<div />

			<div className={styles.logoAndTitleSection}>
				<img src={navLogo} className={globalStyles.blokkXs} alt="NAV logo"/>
				<Systemtittel tag="h1">Oversikt for tiltaksarrangører</Systemtittel>
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
	)
}
