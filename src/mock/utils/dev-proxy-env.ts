
export const getDevProxyUrl = (): string => {
	return process.env.REACT_APP_MOCK_DEV_PROXY_URL || ''
}

export function getDevProxyEnabled(): boolean {
	return process.env.REACT_APP_MOCK_DEV_PROXY_ENABLED === 'true'
}

export function getDevProxyCookie(): string {
	return process.env.REACT_APP_MOCK_DEV_PROXY_COOKIE || ''
}
