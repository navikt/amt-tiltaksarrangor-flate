import { BodyShort, Heading } from '@navikt/ds-react'
import cls from 'classnames'
import React from 'react'

import globalStyles from '../../../globals.module.scss'
import navLogo from '../../../ikoner/nav-logo.svg'
import { useDataStore } from '../../../store/data-store'
import { appUrl } from '../../../utils/url-utils'
import styles from './Banner.module.scss'

export const Banner = (): React.ReactElement => {
	const { innloggetAnsatt } = useDataStore()

	return (
		<header className={styles.banner}>
			<div />

			<div className={styles.logoAndTitleSection}>
				<img src={navLogo} className={globalStyles.blokkXs} alt="NAV logo"/>
				<Heading size="medium" level="1">Deltakeroversikt</Heading>
			</div>

			<div>
				<BodyShort className={globalStyles.blokkXxs}>{`${innloggetAnsatt.fornavn} ${innloggetAnsatt.etternavn}`}</BodyShort>

				<a
					href={appUrl('/oauth2/logout')}
					className={cls('navds-button', 'navds-button--secondary', 'navds-button--small')}
				>
					Logg ut
				</a>
			</div>
		</header>
	)
}
