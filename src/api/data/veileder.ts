import { z } from 'zod'

export enum Veiledertype {
	VEILEDER = 'VEILEDER',
	MEDVEILEDER = 'MEDVEILEDER'
}

export const veiledertypeSchema = z.nativeEnum(Veiledertype)

export const veilederMedTypeSchema = z.object({
	ansattId: z.string().uuid(),
	deltakerId: z.string().uuid(),
	veiledertype: veiledertypeSchema,
	fornavn: z.string(),
	mellomnavn: z.string().nullable(),
	etternavn: z.string(),
})

export const veilederSchema = z.object({
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

export const tilgjengeligeVeiledereSchema = z.array(tilgjengeligVeilederSchema)

export type Veileder = z.infer<typeof veilederSchema>
export type VeilederMedType = z.infer<typeof veilederMedTypeSchema>
export type TilgjengeligVeileder = z.infer<typeof tilgjengeligVeilederSchema>
