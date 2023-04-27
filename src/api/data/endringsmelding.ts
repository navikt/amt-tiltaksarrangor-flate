import { z } from 'zod'

import { dateSchema, nullableDateSchema } from '../utils'

export enum EndringsmeldingType {
    LEGG_TIL_OPPSTARTSDATO = 'LEGG_TIL_OPPSTARTSDATO',
    ENDRE_OPPSTARTSDATO = 'ENDRE_OPPSTARTSDATO',
    FORLENG_DELTAKELSE = 'FORLENG_DELTAKELSE',
    AVSLUTT_DELTAKELSE = 'AVSLUTT_DELTAKELSE',
    DELTAKER_IKKE_AKTUELL = 'DELTAKER_IKKE_AKTUELL',
	ENDRE_DELTAKELSE_PROSENT = 'ENDRE_DELTAKELSE_PROSENT',
	TILBY_PLASS = 'TILBY_PLASS',
	SETT_PAA_VENTELISTE = 'SETT_PAA_VENTELISTE',
	ENDRE_SLUTTDATO = 'ENDRE_SLUTTDATO'


}

export enum DeltakerStatusAarsakType {
    SYK = 'SYK',
    FATT_JOBB = 'FATT_JOBB',
    TRENGER_ANNEN_STOTTE = 'TRENGER_ANNEN_STOTTE',
    FIKK_IKKE_PLASS = 'FIKK_IKKE_PLASS',
    UTDANNING = 'UTDANNING',
    FERDIG = 'FERDIG',
    AVLYST_KONTRAKT = 'AVLYST_KONTRAKT',
    IKKE_MOTT = 'IKKE_MOTT',
    FEILREGISTRERT = 'FEILREGISTRERT',
    ANNET = 'ANNET'
}

export const deltakerStatusAarsakSchema = z.object({
	type: z.nativeEnum(DeltakerStatusAarsakType),
	beskrivelse: z.string().nullable()
})

export const endringsmeldingBaseSchema = z.object({
	id: z.string().uuid(),
})

export const leggTilOppstartsdatoEndringsmeldingSchema = z.intersection(endringsmeldingBaseSchema, z.object({
	type: z.literal(EndringsmeldingType.LEGG_TIL_OPPSTARTSDATO),
	innhold: z.object({ oppstartsdato: dateSchema }),
}))

export const endreOppstartsdatoEndringsmeldingSchema = z.intersection(endringsmeldingBaseSchema, z.object({
	type: z.literal(EndringsmeldingType.ENDRE_OPPSTARTSDATO),
	innhold: z.object({ oppstartsdato: dateSchema }),
}))

export const forlengDeltakelseEndringsmeldingSchema = z.intersection(endringsmeldingBaseSchema, z.object({
	id: z.string().uuid(),
	type: z.literal(EndringsmeldingType.FORLENG_DELTAKELSE),
	innhold: z.object({ sluttdato: dateSchema }),
}))

export const avsluttDeltakelseEndringsmeldingSchema = z.intersection(endringsmeldingBaseSchema, z.object({
	id: z.string().uuid(),
	type: z.literal(EndringsmeldingType.AVSLUTT_DELTAKELSE),
	innhold: z.object({ sluttdato: dateSchema, aarsak: deltakerStatusAarsakSchema }),
}))

export const deltakerIkkeAktuellEndringsmeldingSchema = z.intersection(endringsmeldingBaseSchema, z.object({
	id: z.string().uuid(),
	type: z.literal(EndringsmeldingType.DELTAKER_IKKE_AKTUELL),
	innhold: z.object({ aarsak: deltakerStatusAarsakSchema }),
}))

export const deltakelseProsentEndringmeldingSchema = z.intersection(endringsmeldingBaseSchema, z.object({
	id: z.string().uuid(),
	type: z.literal(EndringsmeldingType.ENDRE_DELTAKELSE_PROSENT),
	innhold: z.object({ deltakelseProsent: z.number().nullable(), gyldigFraDato: nullableDateSchema }),
}))

export const tilbyPlassEndringmeldingSchema = z.intersection(endringsmeldingBaseSchema, z.object({
	id: z.string().uuid(),
	type: z.literal(EndringsmeldingType.TILBY_PLASS),
}))

export const settPaaVentelisteEndringmeldingSchema = z.intersection(endringsmeldingBaseSchema, z.object({
	id: z.string().uuid(),
	type: z.literal(EndringsmeldingType.SETT_PAA_VENTELISTE),
}))

export const endreSluttdatoEndringmeldingSchema = z.intersection(endringsmeldingBaseSchema, z.object({
	id: z.string().uuid(),
	type: z.literal(EndringsmeldingType.ENDRE_SLUTTDATO),
	innhold: z.object({ sluttdato: dateSchema }),

}))
export const endringsmeldingSchema = z.union([
	leggTilOppstartsdatoEndringsmeldingSchema,
	endreOppstartsdatoEndringsmeldingSchema,
	forlengDeltakelseEndringsmeldingSchema,
	avsluttDeltakelseEndringsmeldingSchema,
	deltakerIkkeAktuellEndringsmeldingSchema,
	deltakelseProsentEndringmeldingSchema,
	tilbyPlassEndringmeldingSchema,
	settPaaVentelisteEndringmeldingSchema,
	endreSluttdatoEndringmeldingSchema

])

export const endringsmeldingerSchema = z.array(endringsmeldingSchema)

export type Endringsmelding = z.infer<typeof endringsmeldingSchema>

export type DeltakerStatusAarsak = z.infer<typeof deltakerStatusAarsakSchema>

export type LeggTilOppstartsdatoEndringsmelding = z.infer<typeof leggTilOppstartsdatoEndringsmeldingSchema>

export type EndreOppstartsdatoEndringsmelding = z.infer<typeof endreOppstartsdatoEndringsmeldingSchema>

export type ForlengDeltakelseEndringsmelding = z.infer<typeof forlengDeltakelseEndringsmeldingSchema>

export type AvsluttDeltakelseEndringsmelding = z.infer<typeof avsluttDeltakelseEndringsmeldingSchema>

export type DeltakerIkkeAktuellEndringsmelding = z.infer<typeof deltakerIkkeAktuellEndringsmeldingSchema>
