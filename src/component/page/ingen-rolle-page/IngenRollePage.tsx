import { ExternalLinkIcon } from '@navikt/aksel-icons'
import { Alert, BodyLong, Heading, Link, Panel } from '@navikt/ds-react'
import React from 'react'

import globalStyles from '../../../globals.module.scss'
import styles from './IngenRollePage.module.scss'

export const IngenRollePage = (): React.ReactElement => {
  return (
    <div className={styles.page}>
      <Alert className={globalStyles.blokkS} variant="warning">
        Du har ikke tilgang til Deltakeroversikten for tiltaksarrangører.
      </Alert>

      <Panel className={globalStyles.blokkM}>
        <Heading level="2" size="small" spacing>
          Skal du ha tilgang til deltakerliste for tiltaksarrangør?
        </Heading>
        <BodyLong className={styles.bold} spacing>
          For å få tilgang må arbeidsgiveren din tildele Altinn-rettighet til
          deg på riktig organisasjonsnummer.
        </BodyLong>
        <p>
          Hvis du er usikker på hvilket organisasjonsnummer som er riktig for
          deltakerlisten du jobber med, så ta kontakt med den som er ansvarlig
          for avtalen i egen virksomhet eller i Nav. Les mer om{' '}
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.altinn.no/starte-og-drive/starte/registrering/organisasjonsnummer/"
            className={styles.eksternLenke}
          >
            underenhet og organisasjonsnummer her. <ExternalLinkIcon />
          </Link>
        </p>
        <p>
          Delegering av rettigheter i Altinn gjøres av daglig leder eller en
          annen person med myndighet til å administrere tilganger. Les mer om
          roller og rettigheter på{' '}
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.altinn.no/hjelp/profil/roller-og-rettigheter/"
            className={styles.eksternLenke}
          >
            Altinn.no <ExternalLinkIcon />
          </Link>
        </p>
        <header className={styles.bold}>Koordinator</header>
        <p>
          Ansatte som jobber med koordinerende arbeidsoppgaver får tilgang til
          tjenesten som koordinator. Enkeltrettigheten i Altinn heter
          “Tiltaksarrangør koordinator - Nav Deltakeroversikt”.
        </p>
        <header className={styles.bold}>Veileder</header>
        <p>
          Ansatte som jobber tett på deltakere får rollen som veileder.
          Enkeltrettigheten i Altinn heter “Tiltaksarrangør veileder - Nav
          Deltakeroversikt”.
        </p>
        <p>
          For at koordinator skal kunne tildele veileder så må veileder først få
          riktig rettighet i Altinn og deretter ha logget inn i
          Deltakeroversikten.
        </p>
      </Panel>
    </div>
  )
}
