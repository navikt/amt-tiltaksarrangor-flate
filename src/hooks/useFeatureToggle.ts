import { useEffect, useState } from 'react'

import {
  FeatureToggles,
  KOMET_DELTAKERE_TOGGLE_NAVN,
  VIS_DRIFTSMELDING_TOGGLE_NAVN,
  VIS_INFOMELDING_SOKT_INN_SKAL_VURDERES
} from '../api/data/feature-toggle'
import { fetchToggles } from '../api/feature-toggle-api'
import { Tiltakskode } from '../api/data/tiltak'

let cachedFeatureToggles: FeatureToggles | undefined = undefined

const tiltakstyperKometAlltidErMasterFor = [
  Tiltakskode.ARBFORB,
  Tiltakskode.ARBRRHDAG,
  Tiltakskode.AVKLARAG,
  Tiltakskode.INDOPPFAG,
  Tiltakskode.DIGIOPPARB,
  Tiltakskode.VASV
]

const tiltakstyperKometKanskjeErMasterFor: Tiltakskode[] = [
  Tiltakskode.JOBBK,
  Tiltakskode.GRUFAGYRKE,
  Tiltakskode.GRUPPEAMO,
]

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

  const erKometMasterForTiltak = (tiltakstype: Tiltakskode) => {
    if (
      tiltakstyperKometAlltidErMasterFor.includes(tiltakstype) ||
      (toggles?.[KOMET_DELTAKERE_TOGGLE_NAVN] &&
      tiltakstyperKometKanskjeErMasterFor.includes(tiltakstype))
    )
      return true
    return false
  }

  return {
    visDriftsmelding: toggles ? toggles[VIS_DRIFTSMELDING_TOGGLE_NAVN] : false,
    visInfomeldingSoktInnVurderes: toggles ? toggles[VIS_INFOMELDING_SOKT_INN_SKAL_VURDERES] : false,
    erKometDeltakereEnabled: toggles
      ? toggles[KOMET_DELTAKERE_TOGGLE_NAVN]
      : false,
    erKometMasterForTiltak
  }
}
