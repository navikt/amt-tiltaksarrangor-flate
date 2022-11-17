import dayjs from 'dayjs'

export const mockAuthInfo = {
	expirationTime: dayjs().add(1, 'day').toISOString(),
	loggedIn: true,
	remainingSeconds: 3600,
	securityLevel: 'Level 4'
}
