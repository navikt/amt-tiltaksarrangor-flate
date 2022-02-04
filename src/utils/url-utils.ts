import environment from './environment'

export const appUrl = (path: string): string => {
	const strippedPath = path.startsWith('/') ? path.substr(1) : path
	return `${environment.publicUrl}/${strippedPath}`
}
