import { z } from 'zod'
import { dateSchema, nullableDateSchema } from '../utils'
import { deltakerStatusAarsakSchema } from './endringsmelding'
import { historikkForslagSchema, HistorikkType } from './forslag'
import { deltakelsesinnholdSchema, innholdSchema } from './innhold'

export enum EndringType {
  EndreStartdato = 'EndreStartdato',
  EndreSluttdato = 'EndreSluttdato',
  EndreDeltakelsesmengde = 'EndreDeltakelsesmengde',
  EndreBakgrunnsinformasjon = 'EndreBakgrunnsinformasjon',
  EndreInnhold = 'EndreInnhold',
  IkkeAktuell = 'IkkeAktuell',
  ForlengDeltakelse = 'ForlengDeltakelse',
  AvsluttDeltakelse = 'AvsluttDeltakelse',
  EndreSluttarsak = 'EndreSluttarsak',
  ReaktiverDeltakelse = 'ReaktiverDeltakelse',
  FjernOppstartsdato = 'FjernOppstartsdato'
}

export enum ArrangorEndringsType {
  LeggTilOppstartsdato = 'LeggTilOppstartsdato'
}

export enum DeltakerHistorikkStatus {
  KLADD = 'KLADD',
  UTKAST_TIL_PAMELDING = 'UTKAST_TIL_PAMELDING',
  AVBRUTT_UTKAST = 'AVBRUTT_UTKAST',
  VENTER_PA_OPPSTART = 'VENTER_PA_OPPSTART',
  DELTAR = 'DELTAR',
  HAR_SLUTTET = 'HAR_SLUTTET',
  IKKE_AKTUELL = 'IKKE_AKTUELL',
  FEILREGISTRERT = 'FEILREGISTRERT',
  SOKT_INN = 'SOKT_INN',
  VURDERES = 'VURDERES',
  VENTELISTE = 'VENTELISTE',
  AVBRUTT = 'AVBRUTT',
  FULLFORT = 'FULLFORT',
  PABEGYNT_REGISTRERING = 'PABEGYNT_REGISTRERING'
}

export enum Vurderingstype {
  OPPFYLLER_KRAVENE = 'OPPFYLLER_KRAVENE',
  OPPFYLLER_IKKE_KRAVENE = 'OPPFYLLER_IKKE_KRAVENE'
}

export enum TiltakskoordinatorEndringsType {
  DelMedArrangor = 'DelMedArrangor',
  SettPaaVenteliste = 'SettPaaVenteliste'
}

export const vurderingstypeSchema = z.nativeEnum(Vurderingstype)

export const endreBakgrunnsinformasjonSchema = z.object({
  type: z.literal(EndringType.EndreBakgrunnsinformasjon),
  bakgrunnsinformasjon: z.string().nullable()
})

export const endreInnholdSchema = z.object({
  type: z.literal(EndringType.EndreInnhold),
  ledetekst: z.string().nullable(),
  innhold: z.array(innholdSchema)
})

export const endreDeltakelsesmengdeSchema = z.object({
  type: z.literal(EndringType.EndreDeltakelsesmengde),
  deltakelsesprosent: z.number().nullable(),
  dagerPerUke: z.number().nullable(),
  begrunnelse: z.string().nullable(),
  gyldigFra: dateSchema.nullable()
})

export const endreStartdatoSchema = z.object({
  type: z.literal(EndringType.EndreStartdato),
  startdato: dateSchema,
  sluttdato: nullableDateSchema,
  begrunnelse: z.string().nullable()
})

export const endreSluttdatoSchema = z.object({
  type: z.literal(EndringType.EndreSluttdato),
  sluttdato: dateSchema,
  begrunnelse: z.string().nullable()
})

export const forlengDeltakelseSchema = z.object({
  type: z.literal(EndringType.ForlengDeltakelse),
  sluttdato: dateSchema,
  begrunnelse: z.string().nullable()
})

export const ikkeAktuellSchema = z.object({
  type: z.literal(EndringType.IkkeAktuell),
  aarsak: deltakerStatusAarsakSchema,
  begrunnelse: z.string().nullable()
})

export const avsluttDeltakelseSchema = z.object({
  type: z.literal(EndringType.AvsluttDeltakelse),
  aarsak: deltakerStatusAarsakSchema,
  sluttdato: dateSchema,
  begrunnelse: z.string().nullable()
})

export const endreSluttarsakSchema = z.object({
  type: z.literal(EndringType.EndreSluttarsak),
  aarsak: deltakerStatusAarsakSchema,
  begrunnelse: z.string().nullable()
})

export const reaktiverDeltakelseSchema = z.object({
  type: z.literal(EndringType.ReaktiverDeltakelse),
  reaktivertDato: dateSchema,
  begrunnelse: z.string()
})

export const fjerneOppstartsdatoSchema = z.object({
  type: z.literal(EndringType.FjernOppstartsdato),
  begrunnelse: z.string().nullable()
})

const endringSchema = z.discriminatedUnion('type', [
  endreBakgrunnsinformasjonSchema,
  endreInnholdSchema,
  endreDeltakelsesmengdeSchema,
  endreStartdatoSchema,
  endreSluttdatoSchema,
  forlengDeltakelseSchema,
  ikkeAktuellSchema,
  avsluttDeltakelseSchema,
  endreSluttarsakSchema,
  reaktiverDeltakelseSchema,
  fjerneOppstartsdatoSchema
])

const arrangorLeggTilOppstartSchema = z.object({
  type: z.literal(ArrangorEndringsType.LeggTilOppstartsdato),
  startdato: dateSchema,
  sluttdato: nullableDateSchema
})

const arrangorEndringSchema = z.discriminatedUnion('type', [
  arrangorLeggTilOppstartSchema
])

const tiltakskoordinatorDelMedArrangorSchema = z.object({
  type: z.literal(TiltakskoordinatorEndringsType.DelMedArrangor)
})

const tiltakskoordinatorSettPaVentelisteSchema = z.object({
  type: z.literal(TiltakskoordinatorEndringsType.SettPaaVenteliste)
})

const tiltakskoordinatorEndringSchema = z.discriminatedUnion('type', [
  tiltakskoordinatorDelMedArrangorSchema,
  tiltakskoordinatorSettPaVentelisteSchema
])

export const vedtakSchema = z.object({
  type: z.literal(HistorikkType.Vedtak),
  fattet: nullableDateSchema,
  bakgrunnsinformasjon: z.string().nullable(),
  dagerPerUke: z.number().nullable(),
  deltakelsesprosent: z.number().nullable(),
  fattetAvNav: z.boolean(),
  deltakelsesinnhold: deltakelsesinnholdSchema,
  opprettetAv: z.string(),
  opprettetAvEnhet: z.string(),
  opprettet: dateSchema
})

export const soktInnSchema = z.object({
  type: z.literal(HistorikkType.InnsokPaaFellesOppstart),
  innsokt: nullableDateSchema,
  innsoktAv: z.string(),
  innsoktAvEnhet: z.string(),
  deltakelsesinnholdVedInnsok: deltakelsesinnholdSchema.nullable(),
  utkastDelt: nullableDateSchema,
  utkastGodkjentAvNav: z.boolean()
})

export const deltakerEndringSchema = z.object({
  type: z.literal(HistorikkType.Endring),
  endring: endringSchema,
  endretAv: z.string(),
  endretAvEnhet: z.string(),
  endret: dateSchema,
  forslag: historikkForslagSchema.nullable()
})

export const endringFraArrangorSchema = z.object({
  type: z.literal(HistorikkType.EndringFraArrangor),
  id: z.string().uuid(),
  opprettet: dateSchema,
  arrangorNavn: z.string(),
  endring: arrangorEndringSchema
})

export const deltakerHistorikkStatusSchema = z.object({
  type: z.nativeEnum(DeltakerHistorikkStatus),
  aarsak: deltakerStatusAarsakSchema.nullable()
})

export const importertFraArenaSchema = z.object({
  type: z.literal(HistorikkType.ImportertFraArena),
  importertDato: dateSchema,
  startdato: nullableDateSchema,
  sluttdato: nullableDateSchema,
  deltakelsesprosent: z.number().nullable(),
  dagerPerUke: z.number().nullable(),
  status: deltakerHistorikkStatusSchema
})

export const vurderingFraArrangorSchema = z.object({
  type: z.literal(HistorikkType.VurderingFraArrangor),
  vurderingstype: vurderingstypeSchema,
  begrunnelse: z.string().nullable(),
  opprettetDato: dateSchema,
  endretAv: z.string()
})

export const endringFraTiltakskoordinatorSchema = z.object({
  type: z.literal(HistorikkType.EndringFraTiltakskoordinator),
  endring: tiltakskoordinatorEndringSchema,
  endret: dateSchema,
  endretAv: z.string(),
  endretAvEnhet: z.string().nullable().optional()
})

export const deltakerHistorikkSchema = z.discriminatedUnion('type', [
  vedtakSchema,
  soktInnSchema,
  deltakerEndringSchema,
  historikkForslagSchema,
  endringFraArrangorSchema,
  importertFraArenaSchema,
  vurderingFraArrangorSchema,
  endringFraTiltakskoordinatorSchema
])

export const deltakerHistorikkListeSchema = z.array(deltakerHistorikkSchema)

export type Endring = z.infer<typeof endringSchema>
export type ArrangorEndring = z.infer<typeof arrangorEndringSchema>
export type DeltakerEndring = z.infer<typeof deltakerEndringSchema>
export type DeltakerEndringFraArrangor = z.infer<
  typeof endringFraArrangorSchema
>
export type Vedtak = z.infer<typeof vedtakSchema>
export type InnsokPaaFellesOppstart = z.infer<typeof soktInnSchema>
export type importertFraArena = z.infer<typeof importertFraArenaSchema>
export type DeltakerHistorikk = z.infer<typeof deltakerHistorikkSchema>
export type DeltakerHistorikkListe = z.infer<
  typeof deltakerHistorikkListeSchema
>
export type VurderingFraArrangor = z.infer<typeof vurderingFraArrangorSchema>
export type EndringerFraTiltakskoordinator = z.infer<
  typeof endringFraTiltakskoordinatorSchema
>
export type TiltakskoordinatorEndring = z.infer<
  typeof tiltakskoordinatorEndringSchema
>
