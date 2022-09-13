import { z } from 'zod'

export const virksomhetSchema = z.object({
	id: z.string().uuid(),
	overordnetEnhetOrganisasjonsnummer: z.string().nullable(),
	overordnetEnhetNavn: z.string().nullable(),
	organisasjonsnummer: z.string(),
	navn: z.string(),
	roller: z.array(z.string()),
})

export const innloggetAnsattSchema = z.object({
	fornavn: z.string(),
	etternavn: z.string(),
	arrangorer: z.array(virksomhetSchema),
})

export type InnloggetAnsatt = z.infer<typeof innloggetAnsattSchema>

export type Virksomhet = z.infer<typeof virksomhetSchema>
