import environment from './environment'

export const appUrl = (path: string): string => {
	const strippedPath = path.startsWith('/') ? path.substring(1) : path
	return `${environment.baseUrl}${strippedPath}`
}

export const loginUrl = () => appUrl(`/oauth2/login?redirect=${window.location.href}`)

