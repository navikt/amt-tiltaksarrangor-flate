import { z } from 'zod'

export const veilederSchema = z.object({
	id: z.string().uuid(),
	ansattId: z.string().uuid(),
	deltakerId: z.string().uuid(),
	erMedveileder: z.boolean(),
	fornavn: z.string(),
	mellomnavn: z.string().nullable(),
	etternavn: z.string(),
})

export const tilgjengeligVeilederSchema = z.object({
	ansattId: z.string().uuid(),
	fornavn: z.string(),
	mellomnavn: z.string().nullable(),
	etternavn: z.string(),
})

export type Veileder = z.infer<typeof veilederSchema>
export type TilgjengeligVeileder = z.infer<typeof tilgjengeligVeilederSchema>
