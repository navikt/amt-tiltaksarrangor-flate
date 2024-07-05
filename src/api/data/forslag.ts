import { z } from 'zod'

import { dateSchema } from '../utils'

export enum ForslagStatusType {
	VenterPaSvar = 'VenterPaSvar',
}

export enum ForslagEndringType {
	ForlengDeltakelse = 'ForlengDeltakelse',
}


const forlengDeltakelseSchema = z.object({
	type: z.literal(ForslagEndringType.ForlengDeltakelse),
	sluttdato: dateSchema,
})

const endringSchema = z.discriminatedUnion('type', [
	forlengDeltakelseSchema,
])

const venterPaSvarSchema = z.object({
	type: z.literal(ForslagStatusType.VenterPaSvar),
})

const statusSchema = z.discriminatedUnion('type', [
	venterPaSvarSchema,
])

export const aktivtForslagSchema = z.object({
	id: z.string().uuid(),
	opprettet: dateSchema,
	begrunnelse: z.string().nullable(),
	endring: endringSchema,
	status: statusSchema.default({ type: ForslagStatusType.VenterPaSvar }),
})

export type AktivtForslag = z.infer<typeof aktivtForslagSchema>
export type ForslagEndring = z.infer<typeof endringSchema>

