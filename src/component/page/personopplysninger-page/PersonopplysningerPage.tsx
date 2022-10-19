import { BodyLong, Heading } from '@navikt/ds-react'
import React from 'react'

import globalStyles from '../../../globals.module.scss'
import { useTabTitle } from '../../../hooks/use-tab-title'
import { HOVED_PAGE_ROUTE, INFORMASJON_PAGE_ROUTE } from '../../../navigation'
import { useAuthStore } from '../../../store/data-store'
import { Card } from '../../felles/card/Card'
import { Tilbakelenke } from '../../felles/tilbakelenke/Tilbakelenke'
import styles from './PersonopplysningerPage.module.scss'

export const PersonopplysningerPage = (): React.ReactElement => {
	useTabTitle('Behandling av dine personopplysninger')
	const { erInnlogget } = useAuthStore()


	return (
		<main className={styles.page}>
			<div className={styles.content}>

				<Tilbakelenke to={erInnlogget ? INFORMASJON_PAGE_ROUTE : HOVED_PAGE_ROUTE} />

				<Card className={styles.contentCard}>
					<Heading size="large" level="1" className={globalStyles.blokkXxs}>Behandling av dine personopplysninger</Heading>
					<BodyLong size="small" className={globalStyles.blokkM}>
						Du som jobber hos en tiltaksarrangør, får i tjenesten “Deltakeroversikt” se deltakere som deltar på et arbeidsmarkedstiltak hos dere.
					</BodyLong>
					<Heading size="xsmall" level="2" className={globalStyles.blokkXxs}>Hvordan behandler NAV opplysninger om deg som jobber hos en tiltaksarrangør?  </Heading>
					<BodyLong size="small" className={globalStyles.blokkM}>
						For å avgjøre om du skal ha tilgang til tjenesten behandler NAV fødselsnummeret ditt når du logger inn med ID-porten. Når du logger deg inn og du har tilgang til tjenesten gjennom Altinn så lagres fødselsnummeret og navnet ditt.
					</BodyLong>
					<BodyLong size="small" className={globalStyles.blokkM}>
						Når du legger til en deltakerliste, vises navnet ditt til andre som har lagt til samme deltakerliste.
					</BodyLong>
					<Heading size="xsmall" level="2" className={globalStyles.blokkXxs}>Logging av bruk</Heading>
					<BodyLong size="small">
						Din bruk av tjenesten logges og kan spores i ettertid. Tiltaksdeltakere har rett til å få innsyn i slike logger dersom de ber om det, jf. personopplysningsloven artikkel 15.
					</BodyLong>

				</Card>
			</div>

		</main>
	)
}
