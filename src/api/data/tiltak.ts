import { z } from 'zod'

import { nullableDateSchema } from '../utils'

export enum Pameldingstype {
  DIREKTE_VEDTAK = 'DIREKTE_VEDTAK',
  TRENGER_GODKJENNING = 'TRENGER_GODKJENNING'
}

export enum Tiltakskode {
  ARBEIDSFORBEREDENDE_TRENING = 'ARBEIDSFORBEREDENDE_TRENING',
  ARBEIDSRETTET_REHABILITERING = 'ARBEIDSRETTET_REHABILITERING',
  AVKLARING = 'AVKLARING',
  DIGITALT_OPPFOLGINGSTILTAK = 'DIGITALT_OPPFOLGINGSTILTAK',
  GRUPPE_ARBEIDSMARKEDSOPPLAERING = 'GRUPPE_ARBEIDSMARKEDSOPPLAERING',
  GRUPPE_FAG_OG_YRKESOPPLAERING = 'GRUPPE_FAG_OG_YRKESOPPLAERING',
  JOBBKLUBB = 'JOBBKLUBB',
  OPPFOLGING = 'OPPFOLGING',
  VARIG_TILRETTELAGT_ARBEID_SKJERMET = 'VARIG_TILRETTELAGT_ARBEID_SKJERMET',

  // Enkeltplasser gammel forskrift (kun import fra Arena):
  ENKELTPLASS_ARBEIDSMARKEDSOPPLAERING = 'ENKELTPLASS_ARBEIDSMARKEDSOPPLAERING',
  ENKELTPLASS_FAG_OG_YRKESOPPLAERING = 'ENKELTPLASS_FAG_OG_YRKESOPPLAERING',

  // Enkeltplass ny og gammel forskrift:
  HOYERE_UTDANNING = 'HOYERE_UTDANNING',

  // Enkeltplasser ny forskrift:
  ARBEIDSMARKEDSOPPLAERING = 'ARBEIDSMARKEDSOPPLAERING',
  NORSKOPPLAERING_GRUNNLEGGENDE_FERDIGHETER_FOV = 'NORSKOPPLAERING_GRUNNLEGGENDE_FERDIGHETER_FOV',
  STUDIESPESIALISERING = 'STUDIESPESIALISERING',
  FAG_OG_YRKESOPPLAERING = 'FAG_OG_YRKESOPPLAERING',
  HOYERE_YRKESFAGLIG_UTDANNING = 'HOYERE_YRKESFAGLIG_UTDANNING'
}

export enum TiltakGjennomforingStatus {
  PLANLAGT = 'PLANLAGT',
  GJENNOMFORES = 'GJENNOMFORES',
  AVSLUTTET = 'AVSLUTTET'
}

export const tiltakGjennomforingStatusSchema = z.enum(
  TiltakGjennomforingStatus
)

export const tiltakskodeSchema = z.enum(Tiltakskode)

export const tiltakSchema = z.object({
  tiltakskode: tiltakskodeSchema,
  tiltaksnavn: z.string()
})

export const arrangorSchema = z.object({
  virksomhetNavn: z.string(),
  virksomhetOrgnr: z.string(),
  organisasjonNavn: z.string().nullable()
})

export const gjennomforingSchema = z.object({
  id: z.string(),
  navn: z.string(),
  startDato: nullableDateSchema,
  sluttDato: nullableDateSchema,
  status: tiltakGjennomforingStatusSchema,
  tiltak: tiltakSchema,
  arrangor: arrangorSchema
})

export const adminDeltakerlisteSchema = z.object({
  id: z.string(),
  navn: z.string(),
  tiltaksnavn: z.string(),
  arrangorNavn: z.string(),
  arrangorOrgnummer: z.string(),
  arrangorParentNavn: z.string(),
  startDato: nullableDateSchema,
  sluttDato: nullableDateSchema,
  lagtTil: z.boolean()
})

export const koordinatorSchema = z.object({
  fornavn: z.string(),
  mellomnavn: z.string().nullable(),
  etternavn: z.string()
})

export const koordinatorListSchema = z.array(koordinatorSchema)

export const adminDeltakerlisterSchema = z.array(adminDeltakerlisteSchema)

export type Gjennomforing = z.infer<typeof gjennomforingSchema>

export type AdminDeltakerliste = z.infer<typeof adminDeltakerlisteSchema>

export type Arrangor = z.infer<typeof arrangorSchema>

export type Koordinator = z.infer<typeof koordinatorSchema>
