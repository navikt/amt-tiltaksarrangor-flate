import { useEffect, useState } from 'react'

import { FeatureToggles, VIS_DRIFTSMELDING_TOGGLE_NAVN } from '../api/data/feature-toggle'
import { fetchToggles } from '../api/feature-toggle-api'

let cachedFeatureToggles: FeatureToggles | undefined = undefined

export const useFeatureToggle = () => {
	const [ toggles, setToggles ] = useState<FeatureToggles>()

	useEffect(() => {
		if(cachedFeatureToggles) {
			setToggles(cachedFeatureToggles)
			return
		}
		fetchToggles()
			.then((result) => {
				setToggles(result.data)
				cachedFeatureToggles = result.data
			})

	}, [])

	return {
		visDriftsmelding: toggles? toggles[VIS_DRIFTSMELDING_TOGGLE_NAVN] : false,
	}
}