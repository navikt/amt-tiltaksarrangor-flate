import { ExternalLink } from '@navikt/ds-icons'
import { BodyLong, Heading, Link } from '@navikt/ds-react'
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
					<Heading size="xsmall" level="2" className={globalStyles.blokkXxs}>Hvordan behandler NAV personopplysningene dine?  </Heading>
					<BodyLong size="small" className={globalStyles.blokkM}>
						Som ansatt hos en tiltaksarrangør har du i tjenesten “Deltakeroversikt” tilgang til å se deltakere som er på arbeidsmarkedstiltak hos dere. For at du skal kunne bruke denne tjenesten, må NAV behandle følgende personopplysninger om deg:
						<ul>
							<li>Navn</li>
							<li>Fødselsnummer</li>
							<li>Virksomheten du jobber for</li>
						</ul>
					</BodyLong>

					<BodyLong size="small" className={globalStyles.blokkM}>
						Når du logger inn med ID-porten, behandler NAV ditt fødselsnummer for å sjekke om du skal ha tilgang til tjenesten. Ved bruk av tjenesten lagres ditt navn og fødselsnummer. Disse personopplysningene, sammen organisasjonsnummeret på virksomheten, brukes også for å forhindre uberettiget bruk av tjenesten.
					</BodyLong>

					<BodyLong size="small" className={globalStyles.blokkM}>
						Behandlingen følger av en rettslig forpliktelse som påhviler NAV som behandlingsansvarlig jf. personvernforordningen art. 6 nr. 1 bokstav c. Behandlingen er nødvendig for å oppfylle kravet til personopplysningssikkerhet i personvernforordningen art. 32 og den registrertes rett til innsyn jf. GDPR art. 15 c.
					</BodyLong>

					<Heading size="xsmall" level="2" className={globalStyles.blokkXxs}>Hvem har tilgang til dine personopplysninger?</Heading>
					<BodyLong size="small" className={globalStyles.blokkM}>
						<ul>
							<li>Utviklingsteamet som drifter deltakeroversikten i NAV</li>
							<li>Utviklingsteamet som drifter innsynsloggtjenesten i NAV</li>
							<li>Dersom dere er flere som jobber med samme tiltak, vil dere se hverandres navn tilknyttet deltakerlisten</li>
						</ul>
					</BodyLong>

					<Heading size="xsmall" level="2" className={globalStyles.blokkXxs}>
						Lagring og sletting
					</Heading>
					<BodyLong size="small" className={globalStyles.blokkM}>
						Dine personopplysninger oppbevares så lenge det er nødvendig for å oppnå formålet. Opplysninger vi ikke har en lovpålagt plikt til å oppbevare, vil slettes når behovet faller bort.
					</BodyLong>

					<Heading size="xsmall" level="2" className={globalStyles.blokkXxs}>
						Dine rettigheter
					</Heading>

					<BodyLong size="small" className={globalStyles.blokkM}>
						Du kan kreve innsyn og retting i personopplysningene NAV behandler om deg. I gitte situasjoner har du også rett til sletting av dine personopplysninger. Du kan lese mer om dine rettigheter på <Link href="https://www.datatilsynet.no/" className={styles.eksternLenke}>Datatilsynets nettside <ExternalLink /></Link>.
					</BodyLong>

					<Heading size="xsmall" level="2" className={globalStyles.blokkXxs}>
						Kontaktopplysninger
					</Heading>

					<BodyLong size="small" className={globalStyles.blokkM}>
						For ytterligere spørsmål vedrørende NAVs behandling av dine personopplysninger i forbindelse med denne tjenesten, kan du kontakte oss. Du kan kontakte oss ved å ringe 55&nbsp;55&nbsp;33&nbsp;36.
					</BodyLong>

					<BodyLong size="small" className={globalStyles.blokkM}>
						Dersom du har spørsmål om hvordan NAV behandler personopplysninger, eller du trenger hjelp til å utøve dine personverninteresser kan du kontakte NAVs personvernombud. Her finner du <Link href="https://www.nav.no/no/nav-og-samfunn/om-nav/personvern-i-arbeids-og-velferdsetaten/personvernombudet-i-nav">kontaktinformasjon til personvernombudet</Link>.
					</BodyLong>


				</Card>
			</div>

		</main >
	)
}