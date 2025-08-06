import { z } from 'zod'

export enum Rolle {
  KOORDINATOR = 'KOORDINATOR',
  VEILEDER = 'VEILEDER'
}

export const virksomhetSchema = z.object({
  id: z.uuid(),
  overordnetEnhetOrganisasjonsnummer: z.string().nullable(),
  overordnetEnhetNavn: z.string().nullable(),
  organisasjonsnummer: z.string(),
  navn: z.string(),
  roller: z.array(z.enum(Rolle))
})

export const innloggetAnsattSchema = z.object({
  fornavn: z.string(),
  etternavn: z.string(),
  arrangorer: z.array(virksomhetSchema)
})

export type InnloggetAnsatt = z.infer<typeof innloggetAnsattSchema>

export type Virksomhet = z.infer<typeof virksomhetSchema>
