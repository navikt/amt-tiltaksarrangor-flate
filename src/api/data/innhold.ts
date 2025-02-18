import { z } from "zod"

export const innholdSchema = z.object({
    tekst: z.string(),
    innholdskode: z.string(),
    beskrivelse: z.string().nullable()
})

export const deltakelsesinnholdSchema = z.object({
    ledetekst: z.string(),
    innhold: z.array(innholdSchema)
})


export type Deltakelsesinnhold = z.infer<typeof deltakelsesinnholdSchema>