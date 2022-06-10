import { z } from 'zod'

import { dateSchema, nullableDateSchema } from '../utils'
import { Gjennomforing } from './tiltak'

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
	erSkjermetPerson: z.boolean(),
	epost: z.string().email().nullable(),
	telefonnummer: z.string().nullable(),
	navEnhet: z.custom<NavEnhet>().nullable(),
	navVeileder: z.custom<NavVeileder>().nullable(),
	gjennomforing: z.custom<Gjennomforing>(),
	fjernesDato: nullableDateSchema,
})

export const navEnhetSchema = z.object({
	navn: z.string(),
})

export const navVeilederSchema = z.object({
	navn: z.string(),
	telefon: z.string(),
	epost: z.string(),
})

export const tiltakDeltakereSchema = z.array(tiltakDeltakerSchema)

export type NavVeileder = z.infer<typeof navVeilederSchema>

export type NavEnhet = z.infer<typeof navEnhetSchema>

export type TiltakDeltaker = z.infer<typeof tiltakDeltakerSchema>

export type TiltakDeltakerDetaljer = z.infer<typeof tiltakDeltakerDetaljerSchema>

export type DeltakerStatus = z.infer<typeof deltakerStatusSchema>
