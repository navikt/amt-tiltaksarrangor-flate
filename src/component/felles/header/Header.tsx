import { BodyShort, Button, Heading } from '@navikt/ds-react'
import React from 'react'

import globalStyles from '../../../globals.module.scss'
import navLogo from '../../../ikoner/nav-logo.svg'
import { useAuthStore } from '../../../store/data-store'
import { useTilbakelenkeStore } from '../../../store/tilbakelenke-store'
import toggle from '../../../utils/toggle'
import { appUrl } from '../../../utils/url-utils'
import { Tilbakelenke } from '../tilbakelenke/Tilbakelenke'
import styles from './Header.module.scss'

export const Header = (): React.ReactElement => {
	const { innloggetAnsatt } = useAuthStore()
	const { tilbakeTilUrl } = useTilbakelenkeStore()

	if(!innloggetAnsatt) return <></>

	if (!toggle.navDekoratorEnabled) {
		return (
			<header className={styles.banner}>
				<div />

				<div className={styles.logoAndTitleSection}>
					<img src={navLogo} className={globalStyles.blokkXs} alt="NAV logo" />
					<Heading size="medium" level="1">Deltakeroversikt</Heading>
				</div>


				<div>
					<BodyShort className={globalStyles.blokkXxs}>{`${innloggetAnsatt.fornavn} ${innloggetAnsatt.etternavn}`}</BodyShort>

					<Button
						onClick={()=> window.location.href = appUrl('/oauth2/logout')}
						variant="secondary"
						size="small"
					>
						Logg ut
					</Button>
				</div>
			</header>
		)
	}

	return (
		<nav className={styles.header}>
			<div className={styles.headerContent}>
				<div className={styles.titleWrapper}>
					{ tilbakeTilUrl && <Tilbakelenke to={tilbakeTilUrl}/> }
				</div>
				<Heading size="medium" level="1" className={styles.title}>Deltakeroversikt</Heading>
			</div>
		</nav>
	)
}
