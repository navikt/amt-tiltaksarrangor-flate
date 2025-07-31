import { z } from 'zod'

export enum DeltakerStatusAarsakType {
  SYK = 'SYK',
  FATT_JOBB = 'FATT_JOBB',
  TRENGER_ANNEN_STOTTE = 'TRENGER_ANNEN_STOTTE',
  FIKK_IKKE_PLASS = 'FIKK_IKKE_PLASS',
  UTDANNING = 'UTDANNING',
  AVLYST_KONTRAKT = 'AVLYST_KONTRAKT',
  IKKE_MOTT = 'IKKE_MOTT',
  ANNET = 'ANNET',
  SAMARBEIDET_MED_ARRANGOREN_ER_AVBRUTT = 'SAMARBEIDET_MED_ARRANGOREN_ER_AVBRUTT',
  KURS_FULLT = 'KURS_FULLT',
  KRAV_IKKE_OPPFYLT = 'KRAV_IKKE_OPPFYLT'
}

export const deltakerStatusAarsakSchema = z.object({
  type: z.enum(DeltakerStatusAarsakType),
  beskrivelse: z.string().nullable()
})

export type DeltakerStatusAarsak = z.infer<typeof deltakerStatusAarsakSchema>

