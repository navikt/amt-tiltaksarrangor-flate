import { BodyShort, Button, Heading } from '@navikt/ds-react'
import React from 'react'

import globalStyles from '../../../globals.module.scss'
import navLogo from '../../../ikoner/nav-logo.svg'
import { useAuthStore } from '../../../store/data-store'
import { appUrl } from '../../../utils/url-utils'
import styles from './Banner.module.scss'

export const Banner = (): React.ReactElement => {
	const { innloggetAnsatt } = useAuthStore()

	if(!innloggetAnsatt) return <></>

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
