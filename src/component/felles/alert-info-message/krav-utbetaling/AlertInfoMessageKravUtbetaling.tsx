import { Alert, BodyShort, Heading, Link } from '@navikt/ds-react'
import styles from './AlertInfoMessageKravUtbetaling.module.scss'
import useSessionStorage from '../../../../hooks/useSessionStorage'

export const AlertInfoMessageKravUtbetaling = () => {
  const [ hideAlertMessage, setHideAlertMessage ] = useSessionStorage(
    'alert-message-krav-utbetaling-2-hide',
    false
  )

  if (hideAlertMessage) {
    return <></>
  }

  return (
    <Alert variant="info" size="small" closeButton className={styles.alert} onClose={() => setHideAlertMessage(true)}>
      <Heading size="xsmall" level="2">Krav om utbetaling skal sendes inn i ny digital løsning fra november</Heading>
      <BodyShort as="span" size="small" className={styles.text}>
        <Link href="https://www.nav.no/samarbeidspartner/ny-losning-tilsagn-utbetalinger-tiltaksarrangorer">Les mer om løsningen for tilsagn og utbetaling på nav.no</Link>
      </BodyShort>
    </Alert>
)
}
