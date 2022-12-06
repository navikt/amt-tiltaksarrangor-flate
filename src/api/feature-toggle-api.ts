import { AxiosPromise } from 'axios'

import { appUrl } from '../utils/url-utils'
import { FeatureToggles, featureToggleSchema, TOGGLES } from './data/feature-toggle'
import { axiosInstance, logAndThrowError, parse } from './utils'


export const fetchToggles = (): AxiosPromise<FeatureToggles> => {
	const features = TOGGLES.map(feature => `feature=${feature}`).join('&')

	return axiosInstance
		.get(appUrl(`/unleash/api/feature?${features}`))
		.then(parse(featureToggleSchema))
		.catch(logAndThrowError)
}