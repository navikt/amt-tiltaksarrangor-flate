import dayjs from 'dayjs'

export const mockAuthInfo = {
	expirationTime: dayjs().add(1, 'hour').toISOString(),
	loggedIn: true,
	remainingSeconds: 3600,
	securityLevel: 'Level 4'
}

export const mockSessionInfo = () => {
	return {
		session: {
			created_at: dayjs().subtract(5, 'hours').toISOString(),
			ends_at: dayjs().add(1, 'hours').toISOString(),
			timeout_at: dayjs().add(1, 'hour').toISOString(),
			ends_in_seconds: 14400,
			active: true,
			timeout_in_seconds: 3600
		},
		tokens: {
			expire_at: dayjs().add(1, 'hour').toISOString(),
			refreshed_at: dayjs().toISOString(),
			expire_in_seconds: 3600,
			next_auto_refresh_in_seconds: -1,
			refresh_cooldown: true,
			refresh_cooldown_seconds: 60
		}
	}
}
