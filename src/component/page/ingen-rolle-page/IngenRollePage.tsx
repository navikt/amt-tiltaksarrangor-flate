import { ExternalLink, Information } from '@navikt/ds-icons'
import { Alert, BodyLong, Heading, Link, Panel } from '@navikt/ds-react'
import React from 'react'

import globalStyles from '../../../globals.module.scss'
import { INFORMASJON_PAGE_ROUTE } from '../../../navigation'
import { IkonLenke } from '../../felles/ikon-lenke/IkonLenke'
import styles from './IngenRollePage.module.scss'

export const IngenRollePage = (): React.ReactElement => {
	return (
		<main className={styles.page}>
			<Alert className={globalStyles.blokkS} variant="warning">Du har ikke tilgang til Deltakeroversikten for
				tiltaksarrangører.</Alert>

			<Panel className={globalStyles.blokkM}>
				<Heading level="2" size="xsmall" spacing>Hvordan få tilgang til Deltakeroversikten?</Heading>
				<section>
					<BodyLong spacing>
						For å få tilgang må arbeidsgiveren din tildele nødvendig Altinn-rettighet til deg.
						Daglig leder er ofte administrator for delegering av rettigheter i Altinn,
						men det kan også være andre roller.
					</BodyLong>

					<BodyLong spacing>
						Enkeltrettigheten i Altinn heter “Tiltaksarrangør koordinator - NAV Deltakeroversikt”.
					</BodyLong>
				</section>

				<Link target="_blank" rel="noopener noreferrer" href="https://www.altinn.no/hjelp/profil/roller-og-rettigheter" className={styles.eksternLenke}>Les
					mer om roller og rettigheter på Altinn.no <ExternalLink/></Link>

			</Panel>

			<IkonLenke
				to={INFORMASJON_PAGE_ROUTE}
				className={styles.informasjonLenkeWrapper}
				ikon={<Information title="Informasjon"/>}
				text="Info om deltakeroversikten"
			/>
		</main>
	)
}
