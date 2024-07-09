import { z } from 'zod'

import { dateSchema } from '../utils'

export enum ForslagStatusType {
	VenterPaSvar = 'VenterPaSvar',
}

export enum ForslagEndringType {
	ForlengDeltakelse = 'ForlengDeltakelse',
	IkkeAktuell = 'IkkeAktuell',
	AvsluttDeltakelse = 'AvsluttDeltakelse',
}

const Syk = z.object({ type: z.literal('Syk') })
const FattJobb = z.object({ type: z.literal('FattJobb') })
const TrengerAnnenStotte = z.object({ type: z.literal('TrengerAnnenStotte') })
const Utdanning = z.object({ type: z.literal('Utdanning') })
const IkkeMott = z.object({ type: z.literal('IkkeMott') })
const Annet = z.object({
	type: z.literal('Annet'),
	beskrivelse: z.string(),
})

const endringAarsakSchema = z.discriminatedUnion('type', [
	Syk,
	FattJobb,
	TrengerAnnenStotte,
	Utdanning,
	IkkeMott,
	Annet
])

const forlengDeltakelseSchema = z.object({
	type: z.literal(ForslagEndringType.ForlengDeltakelse),
	sluttdato: dateSchema,
})

const avsluttDeltakelseSchema = z.object({
	type: z.literal(ForslagEndringType.AvsluttDeltakelse),
	sluttdato: dateSchema,
	aarsak: endringAarsakSchema,
})

const ikkeAktuellSchema = z.object({
	type: z.literal(ForslagEndringType.IkkeAktuell),
	aarsak: endringAarsakSchema,
})

const endringSchema = z.discriminatedUnion('type', [
	forlengDeltakelseSchema,
	ikkeAktuellSchema,
	avsluttDeltakelseSchema,
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
export type EndringAarsak = z.infer<typeof endringAarsakSchema>

