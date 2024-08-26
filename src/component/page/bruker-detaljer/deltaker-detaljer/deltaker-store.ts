import constate from 'constate'
import { useState } from 'react'
import { Deltaker } from '../../../../api/data/deltaker'

export const [DeltakerStoreProvider, useDeltakerStore] = constate(
  (props: { deltaker: Deltaker }) => {
    const [deltaker, setDeltaker] = useState<Deltaker>(props.deltaker)

    return {
      deltaker,
      setDeltaker
    }
  }
)
