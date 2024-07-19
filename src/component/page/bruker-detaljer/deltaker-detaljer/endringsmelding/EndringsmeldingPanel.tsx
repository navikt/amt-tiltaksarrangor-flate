import { XMarkIcon } from '@navikt/aksel-icons'
import { Alert, Button, Panel, Tooltip } from '@navikt/ds-react'
import React, { ReactElement } from 'react'

import { Endringsmelding } from '../../../../../api/data/endringsmelding'
import { tilbakekallEndringsmelding } from '../../../../../api/tiltak-api'
import {
  isPending,
  isRejected,
  isResolved,
  usePromise
} from '../../../../../utils/use-promise'
import { EndringTypeIkon } from '../EndringTypeIkon'
import styles from './EndringsmeldingPanel.module.scss'
import { mapTilEndringType } from './uitls'

export interface EndringsmeldingPanelProps {
  endringsmelding: Endringsmelding
  onEndringsmeldingTilbakekalt: () => void
  children: ReactElement
}

export const EndringsmeldingPanel = ({
  endringsmelding,
  onEndringsmeldingTilbakekalt,
  children
}: EndringsmeldingPanelProps) => {
  const tilbakekallEndringsmeldingPromise = usePromise<void>()

  const handleClick = () => {
    tilbakekallEndringsmeldingPromise.setPromise(
      tilbakekallEndringsmelding(endringsmelding.id).then(
        onEndringsmeldingTilbakekalt
      )
    )
  }

  if (isRejected(tilbakekallEndringsmeldingPromise)) {
    return (
      <Alert className={styles.alert} role="status" variant="error">
        Meldingen ble ikke tilbakekalt. En annen person har gjort at meldingen
        er utdatert.
      </Alert>
    )
  }

  return (
    <Panel
      border
      className={styles.panel}
      aria-label="Endringsmelding sendt til nav"
    >
      <div className={styles.innholdWrapper}>
        <EndringTypeIkon type={mapTilEndringType(endringsmelding.type)} />
        <div className={styles.innhold}>{children}</div>
      </div>
      <Tooltip content="Tilbakekall melding" className={styles.tooltip}>
        <Button
          icon={<XMarkIcon aria-hidden />}
          loading={
            isPending(tilbakekallEndringsmeldingPromise) ||
            isResolved(tilbakekallEndringsmeldingPromise)
          }
          variant="tertiary"
          size="small"
          onClick={handleClick}
          className={styles.closeButton}
          aria-label="Tilbakekall melding"
        />
      </Tooltip>
    </Panel>
  )
}
