import { AxiosPromise } from 'axios'

import { appUrl } from '../utils/url-utils'
import { FeatureToggles, featureToggleSchema } from './data/feature-toggle'
import { axiosInstance, logAndThrowError, parse } from './utils'

export const VIS_DRIFTSMELDING_TOGGLE_NAVN = 'amt-tiltaksarrangor-flate.driftsmelding'
export const TOGGLES = [ VIS_DRIFTSMELDING_TOGGLE_NAVN ]

export const fetchToggles = (): AxiosPromise<FeatureToggles> => {
	const features = TOGGLES.map(feature => `feature=${feature}`).join('&')

	return axiosInstance
		.get(appUrl(`/unleash/api/feature?${features}`))
		.then(parse(featureToggleSchema))
		.catch(logAndThrowError)
}