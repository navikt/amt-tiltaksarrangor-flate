import { z } from 'zod'

import { nullableDateSchema } from '../utils'

export const authInfoSchema = z.object({
	loggedIn: z.boolean(),
	remainingSeconds: z.number().nullable(),
	expirationTime: nullableDateSchema,
	securityLevel: z.string().nullable(),
})

export type AuthInfo = z.infer<typeof authInfoSchema>
