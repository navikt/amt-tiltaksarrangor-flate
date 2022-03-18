import { z } from 'zod'

import { dateSchema, nullableDateSchema } from '../utils'
import { GjennomforingDto } from './tiltak'

export enum TiltakDeltakerStatus {
	VENTER_PA_OPPSTART = 'VENTER_PA_OPPSTART',
	DELTAR = 'DELTAR',
	HAR_SLUTTET = 'HAR_SLUTTET',
	IKKE_AKTUELL = 'IKKE_AKTUELL'
}

const tiltakDeltakerStatusSchema = z.nativeEnum(TiltakDeltakerStatus)

export const deltakerStatusSchema = z.object({
	type: tiltakDeltakerStatusSchema,
	endretDato: dateSchema,
})

export const tiltakDeltakerSchema = z.object({
	id: z.string().uuid(),
	fornavn: z.string(),
	mellomnavn: z.string().nullable(),
	etternavn: z.string(),
	fodselsnummer: z.string(),
	startDato: nullableDateSchema,
	sluttDato: nullableDateSchema,
	status: deltakerStatusSchema,
	registrertDato: dateSchema
})

export const tiltakDeltakerDetaljerSchema = z.object({
	id: z.string().uuid(),
	fornavn: z.string(),
	mellomnavn: z.string().nullable(),
	etternavn: z.string(),
	fodselsnummer: z.string(),
	startDato: nullableDateSchema,
	sluttDato: nullableDateSchema,
	status: deltakerStatusSchema,
	registrertDato: dateSchema,
	epost: z.string().email().nullable(),
	telefonnummer: z.string().nullable(),
	navKontor: z.custom<NavKontorDto>().nullable(),
	navVeileder: z.custom<NavVeilederDto>().nullable(),
	gjennomforing: z.custom<GjennomforingDto>()
})

export const navKontorSchema = z.object({
	navn: z.string(),
})

export const navVeilederSchema = z.object({
	navn: z.string(),
	telefon: z.string(),
	epost: z.string(),
})

export const tiltakDeltakereSchema = z.array(tiltakDeltakerSchema)

export type NavVeilederDto = z.infer<typeof navVeilederSchema>

export type NavKontorDto = z.infer<typeof navKontorSchema>

export type TiltakDeltakerDto = z.infer<typeof tiltakDeltakerSchema>

export type TiltakDeltakerDetaljerDto = z.infer<typeof tiltakDeltakerDetaljerSchema>

export type DeltakerStatusDto = z.infer<typeof deltakerStatusSchema>
