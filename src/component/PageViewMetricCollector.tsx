import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { loggSidevisning } from '../utils/amplitude-utils'

export const PageViewMetricCollector = (): React.ReactElement | null => {
	const location = useLocation()

	useEffect(() => {
		loggSidevisning(location.pathname)
	}, [ location ])

	return null
}