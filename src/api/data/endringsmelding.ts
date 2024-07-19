import { z } from 'zod'

import { dateSchema, nullableDateSchema } from '../utils'

export enum EndringsmeldingType {
  LEGG_TIL_OPPSTARTSDATO = 'LEGG_TIL_OPPSTARTSDATO',
  ENDRE_OPPSTARTSDATO = 'ENDRE_OPPSTARTSDATO',
  FORLENG_DELTAKELSE = 'FORLENG_DELTAKELSE',
  AVSLUTT_DELTAKELSE = 'AVSLUTT_DELTAKELSE',
  DELTAKER_IKKE_AKTUELL = 'DELTAKER_IKKE_AKTUELL',
  ENDRE_DELTAKELSE_PROSENT = 'ENDRE_DELTAKELSE_PROSENT',
  ENDRE_SLUTTDATO = 'ENDRE_SLUTTDATO',
  ENDRE_SLUTTAARSAK = 'ENDRE_SLUTTAARSAK'
}

export enum DeltakerStatusAarsakType {
  SYK = 'SYK',
  FATT_JOBB = 'FATT_JOBB',
  TRENGER_ANNEN_STOTTE = 'TRENGER_ANNEN_STOTTE',
  FIKK_IKKE_PLASS = 'FIKK_IKKE_PLASS',
  UTDANNING = 'UTDANNING',
  AVLYST_KONTRAKT = 'AVLYST_KONTRAKT',
  IKKE_MOTT = 'IKKE_MOTT',
  ANNET = 'ANNET'
}

export enum EndringsmeldingStatus {
  AKTIV = 'AKTIV',
  TILBAKEKALT = 'TILBAKEKALT',
  UTDATERT = 'UTDATERT',
  UTFORT = 'UTFORT'
}

export const deltakerStatusAarsakSchema = z.object({
  type: z.nativeEnum(DeltakerStatusAarsakType),
  beskrivelse: z.string().nullable()
})

export const endringsmeldingBaseSchema = z.object({
  id: z.string().uuid(),
  sendt: dateSchema,
  status: z.nativeEnum(EndringsmeldingStatus)
})

export const leggTilOppstartsdatoEndringsmeldingSchema = z.intersection(
  endringsmeldingBaseSchema,
  z.object({
    type: z.literal(EndringsmeldingType.LEGG_TIL_OPPSTARTSDATO),
    innhold: z.object({ oppstartsdato: dateSchema })
  })
)

export const endreOppstartsdatoEndringsmeldingSchema = z.intersection(
  endringsmeldingBaseSchema,
  z.object({
    type: z.literal(EndringsmeldingType.ENDRE_OPPSTARTSDATO),
    innhold: z.object({ oppstartsdato: nullableDateSchema })
  })
)

export const forlengDeltakelseEndringsmeldingSchema = z.intersection(
  endringsmeldingBaseSchema,
  z.object({
    type: z.literal(EndringsmeldingType.FORLENG_DELTAKELSE),
    innhold: z.object({ sluttdato: dateSchema })
  })
)

export const avsluttDeltakelseEndringsmeldingSchema = z.intersection(
  endringsmeldingBaseSchema,
  z.object({
    type: z.literal(EndringsmeldingType.AVSLUTT_DELTAKELSE),
    innhold: z.object({
      sluttdato: dateSchema,
      aarsak: deltakerStatusAarsakSchema
    })
  })
)

export const deltakerIkkeAktuellEndringsmeldingSchema = z.intersection(
  endringsmeldingBaseSchema,
  z.object({
    type: z.literal(EndringsmeldingType.DELTAKER_IKKE_AKTUELL),
    innhold: z.object({ aarsak: deltakerStatusAarsakSchema })
  })
)

export const deltakelseProsentEndringmeldingSchema = z.intersection(
  endringsmeldingBaseSchema,
  z.object({
    type: z.literal(EndringsmeldingType.ENDRE_DELTAKELSE_PROSENT),
    innhold: z.object({
      deltakelseProsent: z.number().nullable(),
      dagerPerUke: z.number().nullable(),
      gyldigFraDato: nullableDateSchema
    })
  })
)

export const endreSluttdatoEndringmeldingSchema = z.intersection(
  endringsmeldingBaseSchema,
  z.object({
    type: z.literal(EndringsmeldingType.ENDRE_SLUTTDATO),
    innhold: z.object({ sluttdato: dateSchema })
  })
)

export const endreSluttaarsakEndringmeldingSchema = z.intersection(
  endringsmeldingBaseSchema,
  z.object({
    type: z.literal(EndringsmeldingType.ENDRE_SLUTTAARSAK),
    innhold: z.object({ aarsak: deltakerStatusAarsakSchema })
  })
)

export const endringsmeldingSchema = z.union([
  leggTilOppstartsdatoEndringsmeldingSchema,
  endreOppstartsdatoEndringsmeldingSchema,
  forlengDeltakelseEndringsmeldingSchema,
  avsluttDeltakelseEndringsmeldingSchema,
  deltakerIkkeAktuellEndringsmeldingSchema,
  deltakelseProsentEndringmeldingSchema,
  endreSluttdatoEndringmeldingSchema,
  endreSluttaarsakEndringmeldingSchema
])

export const alleEndringsmeldingerSchema = z.object({
  aktiveEndringsmeldinger: z.array(endringsmeldingSchema),
  historiskeEndringsmeldinger: z.array(endringsmeldingSchema)
})

export const endringsmeldingerSchema = z.array(endringsmeldingSchema)

export type Endringsmelding = z.infer<typeof endringsmeldingSchema>

export type DeltakerStatusAarsak = z.infer<typeof deltakerStatusAarsakSchema>

export type LeggTilOppstartsdatoEndringsmelding = z.infer<
  typeof leggTilOppstartsdatoEndringsmeldingSchema
>

export type EndreOppstartsdatoEndringsmelding = z.infer<
  typeof endreOppstartsdatoEndringsmeldingSchema
>

export type ForlengDeltakelseEndringsmelding = z.infer<
  typeof forlengDeltakelseEndringsmeldingSchema
>

export type AvsluttDeltakelseEndringsmelding = z.infer<
  typeof avsluttDeltakelseEndringsmeldingSchema
>

export type DeltakerIkkeAktuellEndringsmelding = z.infer<
  typeof deltakerIkkeAktuellEndringsmeldingSchema
>

export type EndreSluttaarsakEndringsmelding = z.infer<
  typeof endreSluttaarsakEndringmeldingSchema
>

export type AlleEndringsmeldinger = z.infer<typeof alleEndringsmeldingerSchema>
