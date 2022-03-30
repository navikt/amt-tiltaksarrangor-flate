import { GuidePanel, Heading } from '@navikt/ds-react'
import cls from 'classnames'
import React from 'react'

import globalStyles from '../../../globals.module.scss'
import navLogo from '../../../ikoner/nav-logo.svg'
import { appUrl } from '../../../utils/url-utils'
import styles from './TilgangInvitasjonLandingPage.module.scss'

export const TilgangInvitasjonLandingPage = (): React.ReactElement => {
	const loginUrl = appUrl(`/oauth2/login?redirect=${window.location.href}`)

	return (
		<main className={styles.page}>
			<img src={navLogo} alt="NAV logo" className={globalStyles.blokkM}/>
			<Heading size="xlarge" className={cls(styles.title, styles.mainTitle, globalStyles.blokkM)}>Deltakeroversikt</Heading>
			<Heading size="small" className={cls(styles.title, globalStyles.blokkXl)}>Tilgang for tiltaksarrangør</Heading>

			<GuidePanel className={globalStyles.blokkXl}>
				Hei!<br/>
				<br/>
				Her kan du be om tilgang til Deltakeroversikten.<br/>
				Logg inn med BankID.
			</GuidePanel>

			<a className={cls('navds-button', 'navds-button--primary', 'navds-button--medium')} href={loginUrl}>Logg inn</a>
		</main>
	)
}
