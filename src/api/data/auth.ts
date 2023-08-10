import { z } from 'zod'

import { nullableDateSchema } from '../utils'

export const authInfoSchema = z.object({
	loggedIn: z.boolean(),
	remainingSeconds: z.number().nullable(),
	expirationTime: nullableDateSchema,
	securityLevel: z.string().nullable(),
})

export const sessionInfoSchema = z.object({
	tokens: z.object({
		expire_at: nullableDateSchema,
		refreshed_at: nullableDateSchema,
		expire_in_seconds: z.number(),
		next_auto_refresh_in_seconds: z.number(),
		refresh_cooldown: z.boolean(),
		refresh_cooldown_seconds: z.number(),
	})
})

export type AuthInfo = z.infer<typeof authInfoSchema>
export type SessionInfo = z.infer<typeof sessionInfoSchema>
