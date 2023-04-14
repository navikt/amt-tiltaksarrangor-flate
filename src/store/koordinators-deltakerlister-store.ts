import constate from 'constate'
import { useState } from 'react'
import { MineDeltakerlister } from '../api/data/deltaker'

export const [ KoordinatorsDeltakerlisterStoreProvider, useKoordinatorsDeltakerlisterStore ] = constate(() => {
	const [ koordinatorsDeltakerlister, setKoordinatorsDeltakerlister ] = useState<MineDeltakerlister>()

	return {
		koordinatorsDeltakerlister,
		setKoordinatorsDeltakerlister
	}
})
