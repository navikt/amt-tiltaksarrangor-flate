import { Alert, Heading } from '@navikt/ds-react'
import useLocalStorage from '../../../hooks/useLocalStorage'
import styles from './AlertInfoMessage.module.scss'

export const AlertInfoMessage = () => {
  const alertMessage = 'Dette påvirker deltakeroversikten. Du vil kunne sende forslag om endringer til NAV-veileder. \n Arbeidsforberedende trening er den første tiltakstypen i ny løsning. Les mer på nav.no her.'
  const [ lastMessage ] = useLocalStorage(
    'alert-message-last-message',
    alertMessage
  )
  const [ hideAlertMessage, setHideAlertMessage ] = useLocalStorage(
    'alert-message-hide',
    false
  )
  const shouldShowAlertMessage = alertMessage === lastMessage
    ? !hideAlertMessage : true

  return shouldShowAlertMessage ? <Alert variant="info" size="small" closeButton className={styles.alert} onClose={() => setHideAlertMessage(true)}>
    <Heading size="xsmall" level="2">Ny påmeldingsløsning for NAV-veileder kommer 1.oktober</Heading>
    {alertMessage}
  </Alert>
    : <></>

}
