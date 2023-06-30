import constate from 'constate'
import { useEffect, useState } from 'react'
import { MineDeltakerlister } from '../api/data/deltaker'
import { fetchDeltakeroversikt } from '../api/tiltak-api'
import { isResolved, usePromise } from '../utils/use-promise'
import { AxiosResponse } from 'axios'

export const [ KoordinatorsDeltakerlisterStoreProvider, useKoordinatorsDeltakerlisterStore ] = constate(() => {
	const [ koordinatorsDeltakerlister, setKoordinatorsDeltakerlister ] = useState<MineDeltakerlister>()
	const fetchMineDeltakerlisterPromise = usePromise<AxiosResponse<MineDeltakerlister>>()

	const fetchDeltakerlister = () => fetchMineDeltakerlisterPromise.setPromise(fetchDeltakeroversikt)

	useEffect(() => {
		if(isResolved(fetchMineDeltakerlisterPromise)) {
			setKoordinatorsDeltakerlister(fetchMineDeltakerlisterPromise.result.data)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ fetchMineDeltakerlisterPromise.result ])


	return {
		fetchDeltakerlister,
		fetchMineDeltakerlisterPromise,
		koordinatorsDeltakerlister,
		setKoordinatorsDeltakerlister
	}
})
