import { z } from 'zod'

import { dateSchema, nullableDateSchema } from '../utils'
import {
  deltakerStatusAarsakSchema,
  endringsmeldingSchema
} from './endringsmelding'
import { aktivtForslagSchema, historikkForslagSchema } from './forslag'
import { deltakerEndringSchema } from './historikk'
import { deltakelsesinnholdSchema } from './innhold'
import {
  Tiltakskode,
  koordinatorListSchema,
  tiltakGjennomforingStatusSchema,
  tiltakstypeSchema
} from './tiltak'
import { veilederMedTypeSchema, veiledertypeSchema } from './veileder'

export enum Hendelser {
  VenterPaSvarFraNav = 'VenterPaSvarFraNav',
  SvarFraNav = 'SvarFraNav'
}

export enum KursDeltakerStatuser {
  VURDERES = 'VURDERES',
  VENTER_PA_OPPSTART = 'VENTER_PA_OPPSTART',
  DELTAR = 'DELTAR',
  FULLFORT = 'FULLFORT',
  AVBRUTT = 'AVBRUTT'
}

export enum IndividuellDeltakerStatus {
  VURDERES = 'VURDERES',
  VENTER_PA_OPPSTART = 'VENTER_PA_OPPSTART',
  DELTAR = 'DELTAR',
  HAR_SLUTTET = 'HAR_SLUTTET',
  IKKE_AKTUELL = 'IKKE_AKTUELL'
}

export enum Adressetype {
  KONTAKTADRESSE = 'KONTAKTADRESSE',
  OPPHOLDSADRESSE = 'OPPHOLDSADRESSE',
  BOSTEDSADRESSE = 'BOSTEDSADRESSE'
}

export enum Vurderingstype {
  OPPFYLLER_KRAVENE = 'OPPFYLLER_KRAVENE',
  OPPFYLLER_IKKE_KRAVENE = 'OPPFYLLER_IKKE_KRAVENE'
}

export const TiltakDeltakerStatus = {
  ...KursDeltakerStatuser,
  ...IndividuellDeltakerStatus
}

export enum AktivEndringsType {
  Forslag = 'Forslag',
  Endringsmelding = 'Endringsmelding'
}

export enum AktivEndring {
  LeggTilOppstartsDato = 'LeggTilOppstartsDato',
  ForlengDeltakelse = 'ForlengDeltakelse',
  IkkeAktuell = 'IkkeAktuell',
  AvsluttDeltakelse = 'AvsluttDeltakelse',
  Deltakelsesmengde = 'Deltakelsesmengde',
  Sluttdato = 'Sluttdato',
  Startdato = 'Startdato',
  Sluttarsak = 'Sluttarsak',
  FjernOppstartsdato = 'FjernOppstartsdato'
}

export enum UlestEndringType {
  DeltakelsesEndring = 'DeltakelsesEndring',
  AvvistForslag = 'AvvistForslag'
}

const tiltakDeltakerStatusSchema = z.nativeEnum(TiltakDeltakerStatus)

export const deltakerStatusSchema = z.object({
  type: tiltakDeltakerStatusSchema,
  endretDato: dateSchema,
  aarsak: deltakerStatusAarsakSchema.nullable()
})

export const navVeilederSchema = z.object({
  navn: z.string(),
  telefon: z.string().nullable(),
  epost: z.string().nullable()
})

export const navInformasjonSchema = z.object({
  navkontor: z.string().nullable(),
  navVeileder: navVeilederSchema.nullable()
})

export const vurderingSchema = z.object({
  vurderingstype: z.nativeEnum(Vurderingstype),
  begrunnelse: z.string().nullable(),
  gyldigFra: nullableDateSchema,
  gyldigTil: nullableDateSchema.nullable()
})

export const aktivEndringSchema = z.object({
  endingsType: z.nativeEnum(AktivEndring),
  type: z.nativeEnum(AktivEndringsType),
  sendt: dateSchema
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
  navKontor: z.string().nullable(),
  gjeldendeVurderingFraArrangor: vurderingSchema.nullable(),
  adressebeskyttet: z.boolean(),
  erVeilederForDeltaker: z.boolean(),
  aktivEndring: aktivEndringSchema.nullable(),
  svarFraNav: z.boolean(),
  oppdateringFraNav: z.boolean()
})

export const deltakersDeltakerlisteSchema = z.object({
  id: z.string().uuid(),
  startDato: nullableDateSchema,
  sluttDato: nullableDateSchema,
  erKurs: z.boolean(),
  tiltakstype: z.nativeEnum(Tiltakskode)
})

export const adresseSchema = z.object({
  adressetype: z.nativeEnum(Adressetype),
  postnummer: z.string(),
  poststed: z.string(),
  tilleggsnavn: z.string().nullable(),
  adressenavn: z.string().nullable()
})

export const deltakelsesmengdeSchema = z.object({
  deltakelsesprosent: z.number(),
  dagerPerUke: z.number().nullable(),
  gyldigFra: dateSchema
})

export const deltakelsesmengderSchema = z.object({
  nesteDeltakelsesmengde: deltakelsesmengdeSchema.nullable(),
  sisteDeltakelsesmengde: deltakelsesmengdeSchema.nullable()
})

const ulestEndrinDeltakelsesEndringSchema = z.object({
  type: z.literal(UlestEndringType.DeltakelsesEndring),
  endring: deltakerEndringSchema
})

const ulestEndrinForslagSchema = z.object({
  type: z.literal(UlestEndringType.AvvistForslag),
  forslag: historikkForslagSchema
})

export const ulestEndringSchema = z.object({
  id: z.string().uuid(),
  deltakerId: z.string().uuid(),
  oppdatering: z.discriminatedUnion('type', [
    ulestEndrinDeltakelsesEndringSchema,
    ulestEndrinForslagSchema,
  ])
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
  dagerPerUke: z.number().nullable(),
  soktInnPa: z.string(),
  soktInnDato: dateSchema,
  tiltakskode: tiltakstypeSchema,
  bestillingTekst: z.string().nullable(),
  innhold: deltakelsesinnholdSchema.nullable(),
  fjernesDato: nullableDateSchema,
  navInformasjon: navInformasjonSchema,
  veiledere: z.array(veilederMedTypeSchema),
  aktiveForslag: z.array(aktivtForslagSchema),
  ulesteEndringer: z.array(ulestEndringSchema),
  aktiveEndringsmeldinger: z.array(endringsmeldingSchema),
  historiskeEndringsmeldinger: z.array(endringsmeldingSchema).nullable(),
  adresse: adresseSchema.nullable(),
  gjeldendeVurderingFraArrangor: vurderingSchema.nullable(),
  adressebeskyttet: z.boolean(),
  deltakelsesmengder: deltakelsesmengderSchema.nullable()
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
  aktiveEndringsmeldinger: z.array(endringsmeldingSchema),
  aktivEndring: aktivEndringSchema.nullable(),
  sistEndret: dateSchema,
  adressebeskyttet: z.boolean(),
  svarFraNav: z.boolean(),
  oppdateringFraNav: z.boolean()
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
  erKurs: z.boolean(),
  tiltakType: tiltakstypeSchema
})

export type NavVeileder = z.infer<typeof navVeilederSchema>

export type DeltakersDeltakerliste = z.infer<
  typeof deltakersDeltakerlisteSchema
>

export type TiltakDeltaker = z.infer<typeof tiltakDeltakerSchema>

export type Deltaker = z.infer<typeof deltakerSchema>

export type Adresse = z.infer<typeof adresseSchema>

export type DeltakerStatus = z.infer<typeof deltakerStatusSchema>

export type VeilederFor = z.infer<typeof veilederForSchema>

export type Deltakerliste = z.infer<typeof deltakerlisteSchema>

export type KoordinatorForDeltakerliste = z.infer<
  typeof koordinatorForDeltakerlisteSchema
>

export type MineDeltakerlister = z.infer<typeof mineDeltakerlisterSchema>

export type VeiledersDeltaker = z.infer<typeof veiledersDeltakerSchema>

export type KoordinatorsDeltakerliste = z.infer<
  typeof koordinatorsDeltakerlisteSchema
>

export type AktivEndringForDeltaker = z.infer<typeof aktivEndringSchema>

export type Vurdering = z.infer<typeof vurderingSchema>

export type Deltakelsesmengder = z.infer<typeof deltakelsesmengderSchema>
export type Deltakelsesmengde = z.infer<typeof deltakelsesmengdeSchema>

export type UlestEndring = z.infer<typeof ulestEndringSchema>
