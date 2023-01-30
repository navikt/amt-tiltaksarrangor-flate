import { AxiosPromise } from 'axios'

import { appUrl } from '../utils/url-utils'
import { FeatureToggles, featureToggleSchema, TOGGLES } from './data/feature-toggle'
import { axiosInstance, logAndThrowError, parse } from './utils'


export const fetchToggles = (): AxiosPromise<FeatureToggles> => {
	const features = TOGGLES.map(feature => `feature=${feature}`).join('&')
	const url = appUrl(`/unleash/api/feature?${features}`)
	return axiosInstance
		.get(url)
		.then(parse(featureToggleSchema))
		.catch((error) => logAndThrowError(error, url))
}