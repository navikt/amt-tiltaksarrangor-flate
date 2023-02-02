import environment from './environment'

export const appUrl = (path: string): string => {
	const strippedPath = path.startsWith('/') ? path.substring(1) : path
	return `${environment.baseUrl}${strippedPath}`
}

export const loginUrl = (redirect: string) => appUrl(`/oauth2/login?redirect=${redirect}`)

