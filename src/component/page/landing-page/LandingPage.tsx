import { Information } from '@navikt/ds-icons'
import { Alert, Heading } from '@navikt/ds-react'
import cls from 'classnames'
import React from 'react'

import globalStyles from '../../../globals.module.scss'
import { PERSONOPPLYSNINGER_PAGE_ROUTE } from '../../../navigation'
import { loginUrl } from '../../../utils/url-utils'
import { IkonLenke } from '../../felles/ikon-lenke/IkonLenke'
import { Show } from '../../felles/Show'
import styles from './LandingPage.module.scss'

export enum LandingPageView {
	LOGIN = 'LOGIN',
	IKKE_TILGANG = 'IKKE_TILGANG'
}

interface LandingPageProps {
	view: LandingPageView
}

export const LandingPage = (props: LandingPageProps): React.ReactElement => {

	return (
		<main className={styles.landingPage}>
			<Heading size="xlarge" className={cls(styles.title, styles.mainTitle, globalStyles.blokkM)}>Deltakeroversikt</Heading>
			<Heading size="small" className={cls(styles.title, globalStyles.blokkM)}>Pilot for tiltaksarrangør</Heading>

			<div className={cls(styles.infoBoks, globalStyles.blokkM)}>
				NAV lager digitale løsninger for tiltaksarrangører, deltakere i tiltakene og NAV.
				Les om&nbsp;
				<a href="https://www.nav.no/no/samarbeidspartner/tiltaksarrangorer/nye-digitale-verktoy-for-tiltaksarrangorer">
					nye digitale verktøy til tiltaksarrangører.
				</a>
			</div>

			<Alert variant="warning" className={cls(styles.alertstripe, globalStyles.blokkM)}>
				Denne tjenesten er en pilot og er under utvikling. Nå i førsteomgang er det bare de
				som har en avtale om bruk som har tilgang.
			</Alert>

			<Show if={props.view === LandingPageView.IKKE_TILGANG}>
				<Alert variant="error" className={cls(styles.alertstripe)}>
					Du har ikke tilgang til tjenesten.
				</Alert>
			</Show>

			<Show if={props.view === LandingPageView.LOGIN}>
				<a className={cls('navds-button', 'navds-button--primary', 'navds-button--medium')} href={loginUrl()}>Logg inn</a>
			</Show>
			<IkonLenke
				to={PERSONOPPLYSNINGER_PAGE_ROUTE}
				className={styles.informasjonLenkeWrapper}
				ikon={<Information title="Informasjon" />}
				text="Slik behandles personopplysningene dine når du bruker deltakeroversikten"
			/>

		</main>
	)
}
