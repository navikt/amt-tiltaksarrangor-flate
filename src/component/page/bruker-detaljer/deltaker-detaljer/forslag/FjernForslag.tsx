import { BodyLong, Button, HStack, LocalAlert } from '@navikt/ds-react'
import { useState } from 'react'
import { tilbakekallForslag } from '../../../../../api/forslag-api'
import {
  isPending,
  isRejected,
  usePromise
} from '../../../../../utils/use-promise'
import { BaseModal } from '../../../../felles/base-modal/BaseModal'
import styles from './FjernForslag.module.scss'

export interface Props {
  forslagId: string
  deltakerId: string
  onTilbakekalt: (forslagId: string) => void
}

export const FjernForslag = ({
  forslagId,
  deltakerId,
  onTilbakekalt
}: Props) => {
  const [bekreftelseApnet, setBekreftelseApnet] = useState(false)
  const tilbakekallPromise = usePromise<void>()

  const handleOpen = () => {
    tilbakekallPromise.reset()
    setBekreftelseApnet(true)
  }

  const handleClose = () => {
    if (!isPending(tilbakekallPromise)) {
      setBekreftelseApnet(false)
    }
  }

  const handleConfirm = () => {
    tilbakekallPromise.setPromise(
      tilbakekallForslag(deltakerId, forslagId).then(() => {
        setBekreftelseApnet(false)
        onTilbakekalt(forslagId)
      })
    )
  }

  return (
    <>
      <Button variant="secondary" size="small" onClick={handleOpen}>
        Tilbakekall forslag
      </Button>
      <BaseModal
        tittel="Vil du tilbakekalle forslaget?"
        open={bekreftelseApnet}
        onClose={handleClose}
        contentClassName={styles.modalContent}
      >
        <BodyLong className={styles.modalText}>
          Forslaget blir trukket tilbake fra Nav.
        </BodyLong>
        {isRejected(tilbakekallPromise) && (
          <LocalAlert status="error" className={styles.modalError}>
            <LocalAlert.Content>
              Kunne ikke tilbakekalle forslaget. Prøv igjen.
            </LocalAlert.Content>
          </LocalAlert>
        )}
        <HStack justify="end" gap="space-8">
          <Button
            variant="secondary"
            size="small"
            onClick={handleClose}
            disabled={isPending(tilbakekallPromise)}
          >
            Nei, avbryt
          </Button>
          <Button
            variant="danger"
            size="small"
            onClick={handleConfirm}
            loading={isPending(tilbakekallPromise)}
          >
            Ja tilbakekall
          </Button>
        </HStack>
      </BaseModal>
    </>
  )
}
