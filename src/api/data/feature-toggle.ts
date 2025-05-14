import { z } from 'zod'

export const VIS_DRIFTSMELDING_TOGGLE_NAVN =
  'amt-tiltaksarrangor-flate.driftsmelding'
export const KOMET_DELTAKERE_TOGGLE_NAVN = 'amt.enable-komet-deltakere'

export const featureToggleSchema = z.object({
  [VIS_DRIFTSMELDING_TOGGLE_NAVN]: z.boolean(),
  [ KOMET_DELTAKERE_TOGGLE_NAVN ]: z.boolean()
})

export const TOGGLES = featureToggleSchema.keyof().options

export type FeatureToggles = z.infer<typeof featureToggleSchema>
