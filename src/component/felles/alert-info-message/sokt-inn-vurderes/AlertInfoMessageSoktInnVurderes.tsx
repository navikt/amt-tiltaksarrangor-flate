import { Alert, BodyShort, Heading, Link } from '@navikt/ds-react'
import useLocalStorage from '../../../../hooks/useLocalStorage'
import styles from './AlertInfoMessageSoktInnVurderes.module.scss'

export const AlertInfoMessageSoktInnVurderes = () => {
  const alertMessage = ''
  const [ lastMessage, setLastMessage ] = useLocalStorage<string | null>(
    'alert-message-sokt-inn-last-message',
    null
  )
  const [ hideAlertMessage, setHideAlertMessage ] = useLocalStorage(
    'alert-message-sokt-inn-hide',
    false
  )

  const shouldShowAlertMessage = alertMessage === lastMessage
    ? !hideAlertMessage : true

  if (alertMessage !== lastMessage) {
    setLastMessage(alertMessage)
    setHideAlertMessage(false)
  }

  return shouldShowAlertMessage ?
    <Alert variant="info" size="small" closeButton className={styles.alert} onClose={() => setHideAlertMessage(true)}>
      <Heading size="xsmall" level="2">Fra 3. juni kan du sende forslag om endring direkte til Nav-veilederen</Heading>
      <BodyShort as="span" size="small" className={styles.text}>
        <Link href="https://www.nav.no/samarbeidspartner/nytt-i-deltakeroversikten">Les mer om endringene i deltakeroversikten på nav.no her.</Link>
      </BodyShort>
    </Alert>
    : <></>
}
