import { z } from 'zod'

import { nullableDateSchema } from '../utils'

export enum TiltakGjennomforingStatus {
	IKKE_STARTET = 'IKKE_STARTET',
	GJENNOMFORES = 'GJENNOMFORES',
	AVSLUTTET = 'AVSLUTTET'
}

const tiltakGjennomforingStatusSchema = z.nativeEnum(TiltakGjennomforingStatus)

export const tiltakSchema = z.object({
	tiltakskode: z.string(),
	tiltaksnavn: z.string(),
})

export const arrangorSchema = z.object({
	virksomhetNavn: z.string(),
	organisasjonNavn: z.string().nullable()
})

export const gjennomforingSchema = z.object({
	id: z.string(),
	navn: z.string(),
	startDato: nullableDateSchema,
	sluttDato: nullableDateSchema,
	status: tiltakGjennomforingStatusSchema,
	tiltak: tiltakSchema,
	arrangor: arrangorSchema
})

export const endringsmeldingSchema = z.object({
	id: z.string().uuid(),
	startDato: nullableDateSchema,
	sluttDato: nullableDateSchema,
	aktiv: z.boolean()
})

export const koordinatorSchema = z.object({
	fornavn: z.string(),
	mellomnavn: z.string().nullable(),
	etternavn: z.string()
})

export const koordinatorListSchema = z.array(koordinatorSchema)

export const gjennomforingerSchema = z.array(gjennomforingSchema)

export type Gjennomforing = z.infer<typeof gjennomforingSchema>

export type Tiltak = z.infer<typeof tiltakSchema>

export type Arrangor = z.infer<typeof arrangorSchema>

export type Koordinator = z.infer<typeof koordinatorSchema>

export const endringsmeldingerSchema = z.array(endringsmeldingSchema)

export type Endringsmelding = z.infer<typeof endringsmeldingSchema>
