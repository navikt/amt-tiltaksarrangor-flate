import { AxiosPromise } from 'axios'

import { appUrl } from '../utils/url-utils'
import { AuthInfo, authInfoSchema } from './data/auth'
import { axiosInstance, logAndThrowError, parse } from './utils'

export const hentAuthInfo = (): AxiosPromise<AuthInfo> => {
	const url = appUrl('/auth/info')
	return axiosInstance
		.get(url)
		.then(parse(authInfoSchema))
		.catch((error) => logAndThrowError(error, url))
}