import { z } from 'zod'

import { dateSchema, nullableDateSchema } from '../utils'
import { endringsmeldingSchema } from './endringsmelding'
import { koordinatorListSchema, tiltakGjennomforingStatusSchema, tiltakstypeSchema } from './tiltak'
import { veilederMedTypeSchema, veiledertypeSchema } from './veileder'

export enum KursDeltakerStatuser {
	VURDERES = 'VURDERES',
	VENTER_PA_OPPSTART = 'VENTER_PA_OPPSTART',
	DELTAR = 'DELTAR',
	FULLFORT = 'FULLFORT',
	AVBRUTT = 'AVBRUTT',
	IKKE_AKTUELL = 'IKKE_AKTUELL',

}

export enum IndividuellDeltakerStatus {
	VENTER_PA_OPPSTART = 'VENTER_PA_OPPSTART',
	DELTAR = 'DELTAR',
	HAR_SLUTTET = 'HAR_SLUTTET',
	IKKE_AKTUELL = 'IKKE_AKTUELL',

}
export const TiltakDeltakerStatus = { ...KursDeltakerStatuser, ...IndividuellDeltakerStatus }

const tiltakDeltakerStatusSchema = z.nativeEnum(TiltakDeltakerStatus)

export const deltakerStatusSchema = z.object({
	type: tiltakDeltakerStatusSchema,
	endretDato: dateSchema,
})

export const navVeilederSchema = z.object({
	navn: z.string(),
	telefon: z.string().nullable(),
	epost: z.string().nullable(),
})

export const navInformasjonSchema = z.object({
	navkontor: z.string().nullable(),
	navVeileder: navVeilederSchema.nullable()
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
	soktInnDato: dateSchema,
	aktiveEndringsmeldinger: z.array(endringsmeldingSchema),
	veiledere: z.array(veilederMedTypeSchema),
})

export const deltakersDeltakerlisteSchema = z.object({
	id: z.string().uuid(),
	startDato: nullableDateSchema,
	sluttDato: nullableDateSchema,
	erKurs: z.boolean()
})

export const deltakerSchema = z.object({
	id: z.string().uuid(),
	deltakerliste: deltakersDeltakerlisteSchema,
	fornavn: z.string(),
	mellomnavn: z.string().nullable(),
	etternavn: z.string(),
	fodselsnummer: z.string(),
	telefonnummer: z.string().nullable(),
	epost: z.string().nullable(),
	status: deltakerStatusSchema,
	startDato: nullableDateSchema,
	sluttDato: nullableDateSchema,
	deltakelseProsent: z.number().nullable(),
	soktInnPa: z.string(),
	soktInnDato: dateSchema,
	tiltakskode: tiltakstypeSchema,
	bestillingTekst: z.string().nullable(),
	fjernesDato: nullableDateSchema,
	navInformasjon: navInformasjonSchema,
	veiledere: z.array(veilederMedTypeSchema),
	aktiveEndringsmeldinger: z.array(endringsmeldingSchema)
})

export const veilederForSchema = z.object({
	veilederFor: z.number(),
	medveilederFor: z.number()
})

export const deltakerlisteSchema = z.object({
	id: z.string().uuid(),
	type: z.string(),
	navn: z.string()
})

export const koordinatorForDeltakerlisteSchema = z.object({
	id: z.string().uuid(),
	type: z.string(),
	navn: z.string(),
	startdato: nullableDateSchema,
	sluttdato: nullableDateSchema,
	erKurs: z.boolean()
})

export const koordinatorForSchema = z.object({
	deltakerlister: z.array(koordinatorForDeltakerlisteSchema)
})

export const mineDeltakerlisterSchema = z.object({
	veilederFor: veilederForSchema.nullable(),
	koordinatorFor: koordinatorForSchema.nullable()
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
	veiledertype: veiledertypeSchema,
	aktiveEndringsmeldinger: z.array(endringsmeldingSchema)
})

export const deltakerlisteVeilederSchema = z.array(veiledersDeltakerSchema)

export const tiltakDeltakereSchema = z.array(tiltakDeltakerSchema)

export const koordinatorsDeltakerlisteSchema = z.object({
	id: z.string(),
	navn: z.string(),
	tiltaksnavn: z.string(),
	arrangorNavn: z.string(),
	startDato: nullableDateSchema,
	sluttDato: nullableDateSchema,
	status: tiltakGjennomforingStatusSchema,
	koordinatorer: koordinatorListSchema,
	deltakere: tiltakDeltakereSchema,
	erKurs: z.boolean()
})

export type NavVeileder = z.infer<typeof navVeilederSchema>

export type DeltakersDeltakerliste = z.infer<typeof deltakersDeltakerlisteSchema>

export type TiltakDeltaker = z.infer<typeof tiltakDeltakerSchema>

export type Deltaker = z.infer<typeof deltakerSchema>

export type DeltakerStatus = z.infer<typeof deltakerStatusSchema>

export type VeilederFor = z.infer<typeof veilederForSchema>

export type Deltakerliste = z.infer<typeof deltakerlisteSchema>

export type KoordinatorForDeltakerliste = z.infer<typeof koordinatorForDeltakerlisteSchema>

export type MineDeltakerlister = z.infer<typeof mineDeltakerlisterSchema>

export type VeiledersDeltaker = z.infer<typeof veiledersDeltakerSchema>

export type KoordinatorsDeltakerliste = z.infer<typeof koordinatorsDeltakerlisteSchema>