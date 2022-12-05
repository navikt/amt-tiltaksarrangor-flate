import { z } from 'zod'

export const VIS_DRIFTSMELDING_TOGGLE_NAVN = 'amt-tiltaksarrangor-flate.driftsmelding'

export const featureToggleSchema =  z.object({
	[VIS_DRIFTSMELDING_TOGGLE_NAVN]: z.boolean()
})

export const TOGGLES = featureToggleSchema.keyof().options


export type FeatureToggles = z.infer<typeof featureToggleSchema>

