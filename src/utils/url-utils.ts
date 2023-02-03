import environment from './environment'

const stripPath = (path: string) => path.startsWith('/') ? path.substring(1) : path

export const appUrl = (path: string): string => {
	const strippedPath = stripPath(path)
	return `${environment.baseUrl}${strippedPath}`
}

export const absolutePath = (path: string) => {
	const strippedPath = stripPath(path)
	return `${window.location.origin}/${strippedPath}`
}

export const loginUrl = (redirect: string) => appUrl(`/oauth2/login?redirect=${redirect}`)

