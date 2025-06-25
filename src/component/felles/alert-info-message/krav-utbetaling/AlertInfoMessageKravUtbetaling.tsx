import { Alert, BodyShort, Heading, Link } from '@navikt/ds-react'
import styles from './AlertInfoMessageKravUtbetaling.module.scss'
import useLocalStorage from '../../../../hooks/useLocalStorage'

export const AlertInfoMessageKravUtbetaling = () => {
  const [ hideAlertMessage, setHideAlertMessage ] = useLocalStorage(
    'alert-message-krav-utbetaling-hide',
    false
  )

  if (hideAlertMessage) {
    return <></>
  }

  return (
    <Alert variant="info" size="small" closeButton className={styles.alert} onClose={() => setHideAlertMessage(true)}>
      <Heading size="xsmall" level="2">Krav om utbetalinger for AFT og VTA skal sendes inn i ny digital løsning fra august</Heading>
      <BodyShort as="span" size="small" className={styles.text}>
        <Link href="https://www.nav.no/samarbeidspartner/ny-losning-tilsagn-utbetalinger-tiltaksarrangorer"> Les mer om løsningen for tilsagn og utbetalinger på nav.no</Link>
      </BodyShort>
    </Alert>
)
}
