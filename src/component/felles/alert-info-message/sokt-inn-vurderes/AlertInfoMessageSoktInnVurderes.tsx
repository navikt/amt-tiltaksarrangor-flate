import { Alert, BodyShort, Heading } from '@navikt/ds-react'
import useLocalStorage from '../../../../hooks/useLocalStorage'
import styles from './AlertInfoMessageSoktInnVurderes.module.scss'

export const AlertInfoMessageSoktInnVurderes = () => {
  const alertMessage = 'Status “Søkt inn” tar over for status “Vurderes”. I overgangsfasen skal alle deltakere med status “Søkt inn” eller “Vurderes” gis en vurdering. '
  const [ hideAlertMessage, setHideAlertMessage ] = useLocalStorage(
    'alert-message-sokt-inn-hide',
    false
  )

  const shouldShowAlertMessage = !hideAlertMessage
 
  return shouldShowAlertMessage ?
    <Alert variant="info" size="small" closeButton className={styles.alert} onClose={() => setHideAlertMessage(true)}>
      <Heading size="xsmall" level="2">Vurdering av deltakere er under endring</Heading>
      <BodyShort as="span" size="small" className={styles.text}>
        {alertMessage}
      </BodyShort>
    </Alert>
    : <></>
}
