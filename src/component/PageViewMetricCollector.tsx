import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { logSidevisning } from '../utils/amplitude-utils'

export const PageViewMetricCollector = (): React.ReactElement | null => {
	const location = useLocation()

	useEffect(() => {
		logSidevisning(location.pathname)
	}, [ location ])

	return null
}