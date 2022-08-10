import { AxiosPromise } from 'axios'

import { appUrl } from '../utils/url-utils'
import { AuthInfo, authInfoSchema } from './data/auth'
import { axiosInstance, logAndThrowError, parse } from './utils'

export const hentAuthInfo = (): AxiosPromise<AuthInfo> => {
	return axiosInstance
		.get(appUrl('/auth/info'))
		.then(parse(authInfoSchema))
		.catch(logAndThrowError)
}