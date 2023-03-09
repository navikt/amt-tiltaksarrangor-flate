import { z } from 'zod'

import { dateSchema, nullableDateSchema } from '../utils'
import { endringsmeldingSchema } from './endringsmelding'
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
	registrertDato: dateSchema,
	aktiveEndringsmeldinger: z.array(endringsmeldingSchema)
})

export const tiltakDeltakerDetaljerSchema = z.object({
	id: z.string().uuid(),
	fornavn: z.string(),
	mellomnavn: z.string().nullable(),
	etternavn: z.string(),
	fodselsnummer: z.string(),
	startDato: nullableDateSchema,
	sluttDato: nullableDateSchema,
	deltakelseProsent: z.number().nullable(),
	status: deltakerStatusSchema,
	registrertDato: dateSchema,
	epost: z.string().nullable(),
	telefonnummer: z.string().nullable(),
	navEnhet: z.custom<NavEnhet>().nullable(),
	navVeileder: z.custom<NavVeileder>().nullable(),
	gjennomforing: z.custom<Gjennomforing>(),
	fjernesDato: nullableDateSchema,
	innsokBegrunnelse: z.string().nullable()
})

export const navEnhetSchema = z.object({
	navn: z.string(),
})

export const navVeilederSchema = z.object({
	navn: z.string(),
	telefon: z.string().nullable(),
	epost: z.string().nullable(),
})

export const veilederInfoSchema = z.object({
	veilederFor: z.number(),
	medveilederFor: z.number()
})

export const deltakerlisteSchema = z.object({
	id: z.string().uuid(),
	type: z.string(),
	navn: z.string()
})

export const koordinatorInfoSchema = z.object({
	deltakerlister: z.array(deltakerlisteSchema)
})

export const deltakerOversiktSchema = z.object({
	veilederInfo: veilederInfoSchema.nullable(),
	koordinatorInfo: koordinatorInfoSchema.nullable()
})

export const veiledersDeltakerSchema = z.object({
	id: z.string().uuid(),
	fornavn: z.string(),
	mellomnavn: z.string().nullable(),
	etternavn: z.string(),
	fodselsnummer: z.string(),
	startDato: nullableDateSchema,
	sluttDato: nullableDateSchema,
	status: deltakerStatusSchema,
	deltakerliste: deltakerlisteSchema,
	erMedveilederFor: z.boolean()
})

export const deltakerlisteVeilederSchema = z.array(veiledersDeltakerSchema)

export const tiltakDeltakereSchema = z.array(tiltakDeltakerSchema)

export type NavVeileder = z.infer<typeof navVeilederSchema>

export type NavEnhet = z.infer<typeof navEnhetSchema>

export type TiltakDeltaker = z.infer<typeof tiltakDeltakerSchema>

export type TiltakDeltakerDetaljer = z.infer<typeof tiltakDeltakerDetaljerSchema>

export type DeltakerStatus = z.infer<typeof deltakerStatusSchema>

export type VeilederInfo = z.infer<typeof veilederInfoSchema>

export type Deltakerliste = z.infer<typeof deltakerlisteSchema>

export type DeltakerOversikt = z.infer<typeof deltakerOversiktSchema>

export type VeiledersDeltaker = z.infer<typeof veiledersDeltakerSchema>
