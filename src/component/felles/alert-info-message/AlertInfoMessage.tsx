import { Alert, BodyShort, Heading, Link } from '@navikt/ds-react'
import useLocalStorage from '../../../hooks/useLocalStorage'
import styles from './AlertInfoMessage.module.scss'

export const AlertInfoMessage = () => {
  const alertMessage = 'Den 19. november får Nav-veiledere ny løsning for påmelding til tiltakene avklaring, arbeidsrettet rehabilitering og oppfølging. Dette påvirker også deltakeroversikten. '
  const [ lastMessage, setLastMessage ] = useLocalStorage(
    'alert-message-last-message',
    alertMessage
  )
  const [ hideAlertMessage, setHideAlertMessage ] = useLocalStorage(
    'alert-message-hide',
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
      <Heading size="xsmall" level="2">19. november kan flere arrangører sende forslag om endringer direkte til Nav-veileder</Heading>
      <BodyShort as="span" size="small" className={styles.text}>
        {alertMessage}
      </BodyShort>
      <BodyShort as="span" size="small" className={styles.text}>
        <Link href="https://www.nav.no/nytt-i-deltakeroversikten">Les mer på nav.no her.</Link>
      </BodyShort>
    </Alert>
    : <></>
}
