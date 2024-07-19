import { useEffect, useState } from 'react'

import {
  FeatureToggles,
  KOMET_DELTAKERE_TOGGLE_NAVN,
  VIS_DRIFTSMELDING_TOGGLE_NAVN
} from '../api/data/feature-toggle'
import { fetchToggles } from '../api/feature-toggle-api'
import { Tiltakskode } from '../api/data/tiltak'

let cachedFeatureToggles: FeatureToggles | undefined = undefined

const tiltakstyperMedForslag = [Tiltakskode.ARBFORB]

export const useFeatureToggle = () => {
  const [toggles, setToggles] = useState<FeatureToggles>()

  useEffect(() => {
    if (cachedFeatureToggles) {
      setToggles(cachedFeatureToggles)
      return
    }
    fetchToggles().then((result) => {
      setToggles(result.data)
      cachedFeatureToggles = result.data
    })
  }, [])

  const erForslagEnabledForTiltak = (tiltakstype: Tiltakskode) => {
    if (
      toggles?.[KOMET_DELTAKERE_TOGGLE_NAVN] &&
      tiltakstyperMedForslag.includes(tiltakstype)
    )
      return true
    return false
  }

  return {
    visDriftsmelding: toggles ? toggles[VIS_DRIFTSMELDING_TOGGLE_NAVN] : false,
    erKometDeltakereEnabled: toggles
      ? toggles[KOMET_DELTAKERE_TOGGLE_NAVN]
      : false,
    erForslagEnabledForTiltak: erForslagEnabledForTiltak
  }
}
