import { AxiosPromise } from 'axios'

import { appUrl } from '../utils/url-utils'
import { AuthInfo, authInfoSchema, SessionInfo, sessionInfoSchema } from './data/auth'
import { axiosInstance, logAndThrowError, parse } from './utils'

export const hentAuthInfo = (): AxiosPromise<AuthInfo> => {
	const url = appUrl('/auth/info')
	return axiosInstance
		.get(url)
		.then(parse(authInfoSchema))
		.catch((error) => logAndThrowError(error, url))
}

export const hentSessionInfo = (): AxiosPromise<SessionInfo> => {
	const url = appUrl('/oauth2/session')
	return axiosInstance
		.get(url)
		.then(parse(sessionInfoSchema))
		.catch((error) => logAndThrowError(error, url))
}


export const refreshToken = (): AxiosPromise<SessionInfo> => {
	const url = appUrl('/oauth2/session/refresh')
	return axiosInstance
		.post(url)
		.then(parse(sessionInfoSchema))
		.catch((error) => logAndThrowError(error, url))
}

