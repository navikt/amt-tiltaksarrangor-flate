import { z } from 'zod'

import { dateSchema } from '../utils'

export enum EndringsmeldingType {
    LEGG_TIL_OPPSTARTSDATO = 'LEGG_TIL_OPPSTARTSDATO',
    ENDRE_OPPSTARTSDATO = 'ENDRE_OPPSTARTSDATO',
    FORLENG_DELTAKELSE = 'FORLENG_DELTAKELSE',
    AVSLUTT_DELTAKELSE = 'AVSLUTT_DELTAKELSE',
    DELTAKER_IKKE_AKTUELL = 'DELTAKER_IKKE_AKTUELL',
}

export const endringsmeldingBaseSchema = z.object({
	id: z.string().uuid(),
})

export const leggTilOppstartsdatoEndringsmeldingSchema = z.intersection(endringsmeldingBaseSchema, z.object({
	type: z.literal(EndringsmeldingType.LEGG_TIL_OPPSTARTSDATO),
	innhold: z.object({ oppstartsdato: dateSchema }),
}))

export const avsluttDeltakelseEndringsmeldingSchema = z.intersection(endringsmeldingBaseSchema, z.object({
	id: z.string().uuid(),
	type: z.literal(EndringsmeldingType.AVSLUTT_DELTAKELSE),
	innhold: z.object({ sluttdato: dateSchema, aarsak: z.string() }),
}))


export const endringsmeldingSchema = z.union([ leggTilOppstartsdatoEndringsmeldingSchema, avsluttDeltakelseEndringsmeldingSchema ])

export const endringsmeldingerSchema = z.array(endringsmeldingSchema)

export type Endringsmelding = z.infer<typeof endringsmeldingSchema>

export type LeggTilOppstartsdatoEndringsmelding = z.infer<typeof leggTilOppstartsdatoEndringsmeldingSchema>

export type AvsluttDeltakelseEndringsmelding = z.infer<typeof avsluttDeltakelseEndringsmeldingSchema>
