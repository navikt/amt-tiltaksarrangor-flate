import { z } from 'zod'
import { deltakerStatusAarsakSchema } from './endringsmelding'
import { historikkForslagSchema, HistorikkType } from './forslag'
import { deltakelsesinnholdSchema, innholdSchema } from './deltaker'
import { dateSchema, nullableDateSchema } from '../utils'

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
    ReaktiverDeltakelse = 'ReaktiverDeltakelse'
}

export enum ArrangorEndringsType {
    LeggTilOppstartsdato = 'LeggTilOppstartsdato'
}

export const endreBakgrunnsinformasjonSchema = z.object({
    type: z.literal(EndringType.EndreBakgrunnsinformasjon),
    bakgrunnsinformasjon: z.string().nullable()
})

export const endreInnholdSchema = z.object({
    type: z.literal(EndringType.EndreInnhold),
    innhold: z.array(innholdSchema)
})

export const endreDeltakelsesmengdeSchema = z.object({
    type: z.literal(EndringType.EndreDeltakelsesmengde),
    deltakelsesprosent: z.number().nullable(),
    dagerPerUke: z.number().nullable(),
    begrunnelse: z.string().nullable()
})

export const endreStartdatoSchema = z.object({
    type: z.literal(EndringType.EndreStartdato),
    startdato: dateSchema,
    sluttdato: dateSchema,
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
    reaktiverDeltakelseSchema
])

const arrangorLeggTilOppstartSchema = z.object({
    type: z.literal(ArrangorEndringsType.LeggTilOppstartsdato),
    startdato: dateSchema,
    sluttdato: dateSchema
})

const arrangorEndringSchema = z.discriminatedUnion('type', [
    arrangorLeggTilOppstartSchema
])

export const vedtakSchema = z.object({
    type: z.literal(HistorikkType.Vedtak),
    fattet: nullableDateSchema,
    bakgrunnsinformasjon: z.string().nullable(),
    fattetAvNav: z.boolean(),
    deltakelsesinnhold: deltakelsesinnholdSchema,
    opprettetAv: z.string(),
    opprettetAvEnhet: z.string(),
    opprettet: dateSchema
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

export const deltakerHistorikkSchema = z.discriminatedUnion('type', [
    vedtakSchema,
    deltakerEndringSchema,
    historikkForslagSchema,
    endringFraArrangorSchema
])

export const deltakerHistorikkListeSchema = z.array(deltakerHistorikkSchema)

export type Endring = z.infer<typeof endringSchema>
export type ArrangorEndring = z.infer<typeof arrangorEndringSchema>
export type DeltakerEndring = z.infer<typeof deltakerEndringSchema>
export type DeltakerEndringFraArrangor = z.infer<
    typeof endringFraArrangorSchema
>
export type Vedtak = z.infer<typeof vedtakSchema>
export type DeltakerHistorikk = z.infer<typeof deltakerHistorikkSchema>
export type DeltakerHistorikkListe = z.infer<
    typeof deltakerHistorikkListeSchema
>
