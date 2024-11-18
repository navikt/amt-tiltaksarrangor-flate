import { Alert, BodyShort, Heading, Link } from '@navikt/ds-react'
import useLocalStorage from '../../../hooks/useLocalStorage'
import styles from './AlertInfoMessage.module.scss'

export const AlertInfoMessage = () => {
  const alertMessage = 'Dette påvirker oppfølging-, avklaring-, ARR- og AFT-tiltak i deltakeroversikten. Når du endrer deltakelse, sendes forslaget direkte til Nav-veilederen. '
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
    <Alert variant="success" size="small" closeButton className={styles.alert} onClose={() => setHideAlertMessage(true)}>
      <Heading size="xsmall" level="2">Nav-veileder har nå ny løsning for flere tiltak</Heading>
      <BodyShort as="span" size="small" className={styles.text}>
        {alertMessage}
      </BodyShort>
      <BodyShort as="span" size="small" className={styles.text}>
        <Link href="https://www.nav.no/nytt-i-deltakeroversikten">Les mer om endringene i deltakeroversikten på nav.no her.</Link>
      </BodyShort>
    </Alert>
    : <></>
}
