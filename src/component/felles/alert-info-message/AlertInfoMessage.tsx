import { Alert, BodyShort, Heading, Link } from '@navikt/ds-react'
import useLocalStorage from '../../../hooks/useLocalStorage'
import styles from './AlertInfoMessage.module.scss'

export const AlertInfoMessage = () => {
  const alertMessage = 'Dette påvirker i første omgang kun AFT-tiltak i deltakeroversikten. I overgangen til ny løsning vil knappen “Endre deltakelse” ikke være tilgjengelig fra 11. - 14. okt. Fra 15. okt. vil du kunne sende forslag om endring direkte til NAV-veilederen.'
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

  return shouldShowAlertMessage ? <Alert variant="info" size="small" closeButton className={styles.alert} onClose={() => setHideAlertMessage(true)}>
    <Heading size="xsmall" level="2">Ny påmeldingsløsning for NAV-veileder kommer 15. oktober for Arbeidsforberedende trening (AFT)</Heading>
    <BodyShort size="small" className={styles.text}>
      {alertMessage}
    </BodyShort>
    <BodyShort size="small" className={styles.text}>
      <Link href="https://www.nav.no/nytt-i-deltakeroversikten">Les mer om endringene i deltakeroversikten på nav.no her.</Link>
    </BodyShort>
  </Alert>
    : <></>

}
