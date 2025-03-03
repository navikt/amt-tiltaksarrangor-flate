import { z } from 'zod'
import { deltakerEndringSchema } from './historikk'
import { historikkForslagSchema } from './forslag'
import { dateSchema } from '../utils'

export enum UlestEndringType {
  DeltakelsesEndring = 'DeltakelsesEndring',
  AvvistForslag = 'AvvistForslag',
  NavBrukerEndring = 'NavBrukerEndring',
  NavEndring = 'NavEndring'
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

export const ulestEndringSchema = z.object({
  id: z.string().uuid(),
  deltakerId: z.string().uuid(),
  oppdatering: z.discriminatedUnion('type', [
    ulestEndrinDeltakelsesEndringSchema,
    ulestEndringForslagSchema,
    ulestEndringNavBrukerSchema,
    ulestEndringNavSchema
  ])
})

export type UlestEndring = z.infer<typeof ulestEndringSchema>
export type UlestEndringOppdateringNavBruker = z.infer<typeof ulestEndringNavBrukerSchema>
export type UlestEndringOppdateringNav = z.infer<typeof ulestEndringNavSchema>
