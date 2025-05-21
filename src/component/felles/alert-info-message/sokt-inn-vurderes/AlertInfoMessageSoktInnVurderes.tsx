import { Alert, BodyShort, Heading, Link } from '@navikt/ds-react'
import useLocalStorage from '../../../../hooks/useLocalStorage'
import styles from './AlertInfoMessageSoktInnVurderes.module.scss'

export const AlertInfoMessageSoktInnVurderes = () => {
  const alertMessage = 'I overgangen til ny løsning vil knappen “Endre deltakelse” ikke være tilgjengelig fra 28. mai - 2. juni. Fra 3. juni vil du kunne sende forslag om endring direkte til NAV-veilederen.'
  const [ hideAlertMessage, setHideAlertMessage ] = useLocalStorage(
    'alert-message-sokt-inn-hide',
    false
  )

  const shouldShowAlertMessage = !hideAlertMessage

  return shouldShowAlertMessage ?
    <Alert variant="info" size="small" closeButton className={styles.alert} onClose={() => setHideAlertMessage(true)}>
      <Heading size="xsmall" level="2">Ny påmeldingsløsning for NAV-veileder kommer 3. juni for tiltakene gruppe-AMO, gruppe fag- og yrkesopplæring og jobbklubb</Heading>
      <BodyShort as="span" size="small" className={styles.text}>
        {alertMessage} {' '}<Link href="https://www.nav.no/samarbeidspartner/nytt-i-deltakeroversikten">Les mer om endringene i deltakeroversikten på nav.no her.</Link>
      </BodyShort>
    </Alert>
    : <></>
}
