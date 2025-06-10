import { z } from 'zod'
import { deltakerEndringSchema } from './historikk'
import { historikkForslagSchema } from './forslag'
import { dateSchema } from '../utils'
import { deltakerStatusAarsakSchema } from './deltakerStatusArsak'

export enum UlestEndringType {
  DeltakelsesEndring = 'DeltakelsesEndring',
  AvvistForslag = 'AvvistForslag',
  NavBrukerEndring = 'NavBrukerEndring',
  NavEndring = 'NavEndring',
  NyDeltaker = 'NyDeltaker',
  TildeltPlass = 'TildeltPlass',
  DeltMedArrangor = 'DeltMedArrangor',
	Avslag = 'Avslag'
}

const ulestEndrinDeltakelsesEndringSchema = z.object({
  type: z.literal(UlestEndringType.DeltakelsesEndring),
  endring: deltakerEndringSchema
})

const ulestEndringForslagSchema = z.object({
  type: z.literal(UlestEndringType.AvvistForslag),
  forslag: historikkForslagSchema
})

const ulestEndringNavBrukerSchema = z.object({
    type: z.literal(UlestEndringType.NavBrukerEndring),
    telefonnummer: z.string().nullable(),
    epost: z.string().nullable(),
    oppdatert: dateSchema
})

const ulestEndringNavSchema = z.object({
    type: z.literal(UlestEndringType.NavEndring),
    nyNavVeileder: z.boolean().nullable(),
    navVeilederNavn: z.string().nullable(),
    navEnhet: z.string().nullable(),
    navVeilederTelefonnummer: z.string().nullable(),
    navVeilederEpost: z.string().nullable(),
    oppdatert: dateSchema
})

const nyDeltakerSchema = z.object({
  type: z.literal(UlestEndringType.NyDeltaker),
  opprettet: dateSchema,
  opprettetAvNavn: z.string().nullable(),
  opprettetAvEnhet: z.string().nullable()
})

const deltMedArrangorSchema = z.object({
  type: z.literal(UlestEndringType.DeltMedArrangor),
  delt: dateSchema,
  deltAvNavn: z.string().nullable(),
  deltAvEnhet: z.string().nullable()
})

const tildeltPlassSchema = z.object({
  type: z.literal(UlestEndringType.TildeltPlass),
  tildeltPlass: dateSchema,
  tildeltPlassAvNavn: z.string().nullable(),
  tildeltPlassAvEnhet: z.string().nullable(),
  erNyDeltaker: z.boolean()
})

const avslagSchema = z.object({
	type: z.literal(UlestEndringType.Avslag),
	endret: dateSchema,
	endretAv: z.string(),
	endretAvEnhet: z.string(),
	aarsak: deltakerStatusAarsakSchema,
	begrunnelse: z.string().nullable(),
})

export const ulestEndringSchema = z.object({
  id: z.string().uuid(),
  deltakerId: z.string().uuid(),
  oppdatering: z.discriminatedUnion('type', [
    ulestEndrinDeltakelsesEndringSchema,
    ulestEndringForslagSchema,
    ulestEndringNavBrukerSchema,
    ulestEndringNavSchema,
    nyDeltakerSchema,
    deltMedArrangorSchema,
    tildeltPlassSchema,
		avslagSchema
  ])
})

export type UlestEndring = z.infer<typeof ulestEndringSchema>
export type UlestEndringOppdateringNavBruker = z.infer<typeof ulestEndringNavBrukerSchema>
export type UlestEndringOppdateringNav = z.infer<typeof ulestEndringNavSchema>
export type UlestEndringOppdateringNyDeltaker = z.infer<typeof nyDeltakerSchema>
export type UlestEndringOppdateringDeltMedArrangor = z.infer<typeof deltMedArrangorSchema>
export type UlestEndringOppdateringTildeltPlass = z.infer<typeof tildeltPlassSchema>
export type UlestEndringOppdateringAvslag = z.infer<typeof avslagSchema>

