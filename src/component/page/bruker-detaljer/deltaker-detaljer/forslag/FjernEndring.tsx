
import {
  Box,
  Button
} from '@navikt/ds-react'
import { settSvarFraNavSomLest } from '../../../../../api/endring-api'
import {
  usePromise
} from '../../../../../utils/use-promise'
import styles from './AktivtForslagPanel.module.scss'

export interface Props {
  endringId: string
  deltakerId: string
  onMarkertSomLest: (endringId: string) => void
}

export const FjernEndring = ({
  endringId,
  deltakerId,
  onMarkertSomLest
}: Props) => {
  const markerSomLestPromise = usePromise<void>()


  const handleLestForslag = () => {
    markerSomLestPromise.setPromise(
      settSvarFraNavSomLest(deltakerId, endringId)
        .then(() => onMarkertSomLest(endringId))
    )
  }

  return (
    <Box
      background="surface-action-subtle"
      className={styles.marker_som_lest_box}
      borderRadius="0 0 medium medium"
    >
      <div className={styles.marker_som_lest_knapp_wrapper}>
        <Button size="small" onClick={handleLestForslag}>Marker som lest</Button>
      </div>
    </Box>
  )
}
