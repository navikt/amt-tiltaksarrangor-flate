import { ExternalLink, Information } from '@navikt/ds-icons'
import { Alert, BodyLong, Heading, Link, Panel } from '@navikt/ds-react'
import React from 'react'

import globalStyles from '../../../globals.module.scss'
import { INFORMASJON_PAGE_ROUTE } from '../../../navigation'
import { IkonLenke } from '../../felles/ikon-lenke/IkonLenke'
import styles from './IngenRollePage.module.scss'

export const IngenRollePage = (): React.ReactElement => {
	return (
		<div className={styles.page}>
			<Alert className={globalStyles.blokkS} variant="warning">Du har ikke tilgang til Deltakeroversikten for
				tiltaksarrangører.
			</Alert>

			<Panel className={globalStyles.blokkM}>
				<Heading level="2" size="xsmall" spacing>For å få tilgang må arbeidsgiveren din tildele Altinn-rettighet til deg på riktig organisasjonsnummer.</Heading>
				<BodyLong>
					Enkeltrettigheten i Altinn heter “Tiltaksarrangør koordinator - NAV Deltakeroversikt”, og rettigheten gis på underenhetens organisasjonsnummer.
					<br />
					<br />
					Hvis du er usikker på hvilket organisasjonsnummer som er riktig for deltakerlisten du jobber med, så ta kontakt med den som er ansvarlig for avtalen i egen virksomhet eller i NAV.
					<br />
					<br />
					Les mer om <Link target="_blank" rel="noopener noreferrer" href="https://www.altinn.no/starte-og-drive/starte/registrering/organisasjonsnummer/" className={styles.eksternLenke}>underenhet og organisasjonsnummer her. <ExternalLink /></Link>
					<br />
					<br />
					Delegering av rettigheter i Altinn gjøres av daglig leder eller en annen person med myndighet til å administrere tilganger. Les mer om roller og rettigheter på <Link target="_blank" rel="noopener noreferrer" href="https://www.altinn.no/hjelp/profil/roller-og-rettigheter" className={styles.eksternLenke}>Altinn.no <ExternalLink /></Link>
				</BodyLong>
			</Panel>

			<IkonLenke
				to={INFORMASJON_PAGE_ROUTE}
				className={styles.informasjonLenkeWrapper}
				ikon={<Information title="Informasjon" />}
				text="Info om deltakeroversikten"
			/>
		</div>
	)
}
