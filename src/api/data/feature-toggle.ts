import { z } from 'zod'

export const featureToggleSchema =  z.map(z.string(), z.boolean())

export type FeatureToggles = z.infer<typeof featureToggleSchema>

