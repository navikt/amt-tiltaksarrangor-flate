import { Alert, BodyShort, Heading, Link } from '@navikt/ds-react'
import useLocalStorage from '../../../../hooks/useLocalStorage'
import styles from './AlertInfoMessageSoktInnVurderes.module.scss'

export const AlertInfoMessageSoktInnVurderes = () => {
  const alertMessage = 'Forslag til endringer på Gruppe-AMO, Fag- og yrkesopplæring og Jobbklubb sendes direkte til Nav-veileder. '
  const [ hideAlertMessage, setHideAlertMessage ] = useLocalStorage(
    'alert-message-sokt-inn-hide',
    false
  )

  const shouldShowAlertMessage = !hideAlertMessage

  return shouldShowAlertMessage ?
    <Alert variant="info" size="small" closeButton className={styles.alert} onClose={() => setHideAlertMessage(true)}>
      <Heading size="xsmall" level="2">“Endre deltakelse” blir til “forslag om endring” 3. juni</Heading>
      <BodyShort as="span" size="small" className={styles.text}>
        {alertMessage} {' '}<Link href="https://www.nav.no/samarbeidspartner/nytt-i-deltakeroversikten">Les mer på nav.no.</Link>
      </BodyShort>
    </Alert>
    : <></>
}
