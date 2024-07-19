import constate from 'constate'
import { useState } from 'react'

import { DeltakersDeltakerliste } from '../../../../api/data/deltaker'

export const [DeltakerlisteStoreProvider, useDeltakerlisteStore] = constate(
  (props: { deltakerliste: DeltakersDeltakerliste }) => {
    const [deltakerliste] = useState<DeltakersDeltakerliste>(
      props.deltakerliste
    )

    return {
      deltakerliste
    }
  }
)
