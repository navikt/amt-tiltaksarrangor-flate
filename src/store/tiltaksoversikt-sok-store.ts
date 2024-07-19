import constate from 'constate'
import { useState } from 'react'
import { Sortering } from '../utils/sortering-utils'

export const [TiltaksoversiktSokStoreProvider, useTiltaksoversiktSokStore] =
  constate(() => {
    const [deltakerSortering, setDeltakerSortering] = useState<Sortering>()

    return {
      deltakerSortering,
      setDeltakerSortering
    }
  })
