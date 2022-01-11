import { BodyShort, Heading } from '@navikt/ds-react'
import cls from 'classnames'
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
				<Heading size="medium" level="1">Oversikt for tiltaksarrangører</Heading>
			</div>

			<div>
				<BodyShort className={globalStyles.blokkXxs}>{`${innloggetAnsatt.fornavn} ${innloggetAnsatt.etternavn}`}</BodyShort>

				<VirksomhetVelger className={globalStyles.blokkXxs} />

				<a
					href="/oauth2/logout"
					className={cls('navds-button', 'navds-button--secondary', 'navds-button--small')}
				>
					Logg ut
				</a>
			</div>
		</header>
	)
}
