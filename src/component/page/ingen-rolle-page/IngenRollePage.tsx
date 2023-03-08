import { ExternalLink } from '@navikt/ds-icons'
import { Alert, BodyLong, Heading, Link, Panel } from '@navikt/ds-react'
import React from 'react'

import globalStyles from '../../../globals.module.scss'
import styles from './IngenRollePage.module.scss'

export const IngenRollePage = (): React.ReactElement => {
	return (
		<div className={styles.page}>
			<Alert className={globalStyles.blokkS} variant="warning">Du har ikke tilgang til Deltakeroversikten for
				tiltaksarrangører.
			</Alert>

			<Panel className={globalStyles.blokkM}>
				<Heading level="2" size="small" spacing>Skal du ha tilgang til deltakerliste for tiltaksarrangør?</Heading>
				<BodyLong className={styles.bold} spacing>
					For å få tilgang må arbeidsgiveren din tildele Altinn-rettighet til deg på riktig organisasjonsnummer.
				</BodyLong>
				<BodyLong>
					Hvis du er usikker på hvilket organisasjonsnummer som er riktig for deltakerlisten du jobber med, så ta kontakt med den som er ansvarlig for avtalen i egen virksomhet eller i NAV.
					Les mer om <Link target="_blank" rel="noopener noreferrer" href="https://www.altinn.no/starte-og-drive/starte/registrering/organisasjonsnummer/" className={styles.eksternLenke}>underenhet og organisasjonsnummer her. <ExternalLink /></Link>
					<br />
					<br />
					Delegering av rettigheter i Altinn gjøres av daglig leder eller en annen person med myndighet til å administrere tilganger. Les mer om roller og rettigheter på <Link target="_blank" rel="noopener noreferrer" href="https://www.altinn.no/hjelp/profil/roller-og-rettigheter" className={styles.eksternLenke}>Altinn.no <ExternalLink /></Link>
					<br/>
					<br/>
					<header className={styles.bold}>Koordinator</header>
					<p>Ansatte som jobber med koordinerende arbeidsoppgaver får tilgang til tjenesten som koordinator. Enkeltrettigheten i Altinn heter “Tiltaksarrangør koordinator - NAV Deltakeroversikt”.</p>
					<br/>
					<header className={styles.bold}>Veileder (Under arbeid - kommer snart)</header>
					<p>Ansatte som jobber tett på deltakere får rollen som veileder. Enkeltrettigheten i Altinn heter “Tiltaksarrangør veileder - NAV Deltakeroversikt”.</p>
					<p>For at koordinator skal kunne tildele veileder så må veileder først få riktig rettighet i Altinn og deretter ha logget inn i Deltakeroversikten.</p>
					<br/>
					<br/>
					<br/>
					<header className={styles.bold}>Koordinator</header>
					<p>Ansatte som jobber med koordinerende arbeidsoppgaver får tilgang til tjenesten som koordinator. Enkeltrettigheten i Altinn heter “Tiltaksarrangør koordinator - NAV Deltakeroversikt”.</p>
					<br/>
					<header className={styles.bold}>Veileder (Under arbeid - kommer snart)</header>
					<p>Ansatte som jobber tett på deltakere får rollen som veileder. Enkeltrettigheten i Altinn heter “Tiltaksarrangør veileder - NAV Deltakeroversikt”.
						For at koordinator skal kunne tildele veileder så må veileder først få riktig rettighet i Altinn og deretter ha logget inn i Deltakeroversikten.</p>
				</BodyLong>
			</Panel>
		</div>
	)
}
