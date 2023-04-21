import { z } from 'zod'

import { nullableDateSchema } from '../utils'

export enum Tiltakskode {
	ARBFORB = 'ARBFORB',
	ARBRRHDAG = 'ARBRRHDAG',
	AVKLARAG = 'AVKLARAG',
	INDOPPFAG = 'INDOPPFAG',
	DIGIOPPARB = 'DIGIOPPARB',
	GRUFAGYRKE = 'GRUFAGYRKE',
	VASV = 'VASV',
}


export enum TiltakGjennomforingStatus {
	APENT_FOR_INNSOK = 'APENT_FOR_INNSOK',
	IKKE_STARTET = 'IKKE_STARTET',
	GJENNOMFORES = 'GJENNOMFORES',
	AVSLUTTET = 'AVSLUTTET'
}

export const tiltakGjennomforingStatusSchema = z.nativeEnum(TiltakGjennomforingStatus)

export const tiltakstypeSchema = z.nativeEnum(Tiltakskode)

export const tiltakSchema = z.object({
	tiltakskode: tiltakstypeSchema,
	tiltaksnavn: z.string(),
})

export const arrangorSchema = z.object({
	virksomhetNavn: z.string(),
	virksomhetOrgnr: z.string(),
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

export const adminDeltakerlisteSchema = z.object({
	id: z.string(),
	navn: z.string(),
	tiltaksnavn: z.string(),
	arrangorNavn: z.string(),
	arrangorOrgnummer: z.string(),
	arrangorParentNavn: z.string(),
	startDato: nullableDateSchema,
	sluttDato: nullableDateSchema,
	lagtTil: z.boolean()
})

export const koordinatorSchema = z.object({
	fornavn: z.string(),
	mellomnavn: z.string().nullable(),
	etternavn: z.string()
})

export const koordinatorListSchema = z.array(koordinatorSchema)

export const adminDeltakerlisterSchema = z.array(adminDeltakerlisteSchema)

export type Gjennomforing = z.infer<typeof gjennomforingSchema>

export type AdminDeltakerliste = z.infer<typeof adminDeltakerlisteSchema>

export type Arrangor = z.infer<typeof arrangorSchema>

export type Koordinator = z.infer<typeof koordinatorSchema>
