import { useEffect, useState } from 'react'

import { FeatureToggles } from '../api/data/feature-toggle'
import { fetchToggles, TOGGLES } from '../api/feature-toggle-api'

export const useFeatureToggle = () => {
	const defaultToggles = new Map(TOGGLES.map(toggleNavn => [ toggleNavn, false ]))
	const [ toggles, setToggles ] = useState<FeatureToggles>(defaultToggles)

	useEffect(() => {
		fetchToggles()
			.then((result) => setToggles(result.data))
	}, [])

	return {
		toggles
	}
}