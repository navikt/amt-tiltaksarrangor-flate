import { XMarkIcon } from '@navikt/aksel-icons'
import {
  Button,
  Tooltip
} from '@navikt/ds-react'
import { tilbakekallForslag } from '../../../../../api/forslag-api'
import {
  isPending,
  isResolved,
  usePromise
} from '../../../../../utils/use-promise'
import styles from './AktivtForslagPanel.module.scss'

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
  const tilbakekallPromise = usePromise<void>()

  const handleClick = () => {
    tilbakekallPromise.setPromise(
      tilbakekallForslag(deltakerId, forslagId).then(() =>
        onTilbakekalt(forslagId)
      )
    )
  }

  return (
    <Tooltip content="Tilbakekall forslag" className={styles.tooltip}>
      <Button
        icon={<XMarkIcon aria-hidden />}
        loading={
          isPending(tilbakekallPromise) ||
          isResolved(tilbakekallPromise)
        }
        variant="tertiary"
        size="small"
        onClick={handleClick}
        className={styles.closeButton}
        aria-label="Tilbakekall forslag"
      />
    </Tooltip>
  )
}
