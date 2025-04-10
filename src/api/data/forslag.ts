import { z } from 'zod'

import { dateSchema } from '../utils'

export enum HistorikkType {
  Vedtak = 'Vedtak',
  InnsokPaaFellesOppstart = 'InnsokPaaFellesOppstart',
  Endring = 'Endring',
  Forslag = 'Forslag',
  EndringFraArrangor = 'EndringFraArrangor',
  ImportertFraArena = 'ImportertFraArena',
  VurderingFraArrangor = 'VurderingFraArrangor',
  EndringFraTiltakskoordinator = 'EndringFraTiltakskoordinator'
}

export enum ForslagStatusType {
  VenterPaSvar = 'VenterPaSvar',
  Avvist = 'Avvist',
  Godkjent = 'Godkjent',

  Tilbakekalt = 'Tilbakekalt',
  Erstattet = 'Erstattet'
}

export enum ForslagEndringType {
  ForlengDeltakelse = 'ForlengDeltakelse',
  IkkeAktuell = 'IkkeAktuell',
  AvsluttDeltakelse = 'AvsluttDeltakelse',
  Deltakelsesmengde = 'Deltakelsesmengde',
  Sluttdato = 'Sluttdato',
  Startdato = 'Startdato',
  Sluttarsak = 'Sluttarsak',
  FjernOppstartsdato = 'FjernOppstartsdato'
}

export enum ForslagEndringAarsakType {
  Syk = 'Syk',
  FattJobb = 'FattJobb',
  TrengerAnnenStotte = 'TrengerAnnenStotte',
  Utdanning = 'Utdanning',
  IkkeMott = 'IkkeMott',
  Annet = 'Annet'
}

const Syk = z.object({ type: z.literal(ForslagEndringAarsakType.Syk) })
const FattJobb = z.object({
  type: z.literal(ForslagEndringAarsakType.FattJobb)
})
const TrengerAnnenStotte = z.object({
  type: z.literal(ForslagEndringAarsakType.TrengerAnnenStotte)
})
const Utdanning = z.object({
  type: z.literal(ForslagEndringAarsakType.Utdanning)
})
const IkkeMott = z.object({
  type: z.literal(ForslagEndringAarsakType.IkkeMott)
})
const Annet = z.object({
  type: z.literal(ForslagEndringAarsakType.Annet),
  beskrivelse: z.string()
})

const endringAarsakSchema = z.discriminatedUnion('type', [
  Syk,
  FattJobb,
  TrengerAnnenStotte,
  Utdanning,
  IkkeMott,
  Annet
])

const forlengDeltakelseSchema = z.object({
  type: z.literal(ForslagEndringType.ForlengDeltakelse),
  sluttdato: dateSchema
})

const avsluttDeltakelseSchema = z.object({
  type: z.literal(ForslagEndringType.AvsluttDeltakelse),
  sluttdato: dateSchema.nullable(),
  aarsak: endringAarsakSchema,
  harDeltatt: z.boolean().nullable()
})

const ikkeAktuellSchema = z.object({
  type: z.literal(ForslagEndringType.IkkeAktuell),
  aarsak: endringAarsakSchema
})

const deltakelsesmengdeSchema = z.object({
  type: z.literal(ForslagEndringType.Deltakelsesmengde),
  deltakelsesprosent: z.number(),
  dagerPerUke: z.number().nullable(),
  gyldigFra: dateSchema.nullable()
})

const sluttdatoSchema = z.object({
  type: z.literal(ForslagEndringType.Sluttdato),
  sluttdato: dateSchema
})

const startdatoSchema = z.object({
  type: z.literal(ForslagEndringType.Startdato),
  startdato: dateSchema,
  sluttdato: dateSchema.nullable()
})

const sluttarsakSchema = z.object({
  type: z.literal(ForslagEndringType.Sluttarsak),
  aarsak: endringAarsakSchema
})

const fjernOppstartsdatoSchema = z.object({
  type: z.literal(ForslagEndringType.FjernOppstartsdato)
})

const endringSchema = z.discriminatedUnion('type', [
  forlengDeltakelseSchema,
  ikkeAktuellSchema,
  avsluttDeltakelseSchema,
  deltakelsesmengdeSchema,
  sluttdatoSchema,
  startdatoSchema,
  sluttarsakSchema,
  fjernOppstartsdatoSchema
])

const venterPaSvarSchema = z.object({
  type: z.literal(ForslagStatusType.VenterPaSvar)
})
const godkjentSchema = z.object({
  type: z.literal(ForslagStatusType.Godkjent),
  godkjent: dateSchema
})
const avvistSchema = z.object({
  type: z.literal(ForslagStatusType.Avvist),
  avvistAv: z.string(),
  avvistAvEnhet: z.string(),
  avvist: dateSchema,
  begrunnelseFraNav: z.string()
})
const tilbakekaltSchema = z.object({
  type: z.literal(ForslagStatusType.Tilbakekalt),
  tilbakekalt: dateSchema
})
const erstattetSchema = z.object({
  type: z.literal(ForslagStatusType.Erstattet),
  erstattet: dateSchema
})

const statusSchema = z.discriminatedUnion('type', [
  venterPaSvarSchema,
  godkjentSchema,
  avvistSchema,
  tilbakekaltSchema,
  erstattetSchema
])

export const aktivtForslagSchema = z.object({
  id: z.string().uuid(),
  opprettet: dateSchema,
  begrunnelse: z.string().nullable(),
  endring: endringSchema,
  status: statusSchema.default({ type: ForslagStatusType.VenterPaSvar })
})

export const historikkForslagSchema = z.object({
  id: z.string().uuid(),
  type: z.literal(HistorikkType.Forslag),
  opprettet: dateSchema,
  begrunnelse: z.string().nullable(),
  arrangorNavn: z.string(),
  endring: endringSchema,
  status: statusSchema
})

export type HistorikkForslag = z.infer<typeof historikkForslagSchema>
export type AktivtForslag = z.infer<typeof aktivtForslagSchema>
export type ForslagEndring = z.infer<typeof endringSchema>
export type EndringAarsak = z.infer<typeof endringAarsakSchema>
