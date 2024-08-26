import { z } from 'zod'
import { dateSchema } from '../utils'

export enum EndringFraArrangorType {
  LeggTilOppstartsdato = 'LeggTilOppstartsdato'
}

const leggTilOppstartsdatoSchema = z.object({
  type: z.literal(EndringFraArrangorType.LeggTilOppstartsdato),
  startdato: dateSchema,
  sluttdato: dateSchema.nullable()
})

const endringFraArrangorSchema = z.discriminatedUnion('type', [
  leggTilOppstartsdatoSchema
])

export type EndringFraArrangor = z.infer<typeof endringFraArrangorSchema>
