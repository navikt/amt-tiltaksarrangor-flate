import constate from 'constate'
import { useState } from 'react'

export const [ KoordinatorsDeltakerlisterStoreProvider, useKoordinatorsDeltakerlisterStore ] = constate(() => {
	const [ koordinatorsDeltakerlister, setKoordinatorsDeltakerlister ] = useState<string[]>([])

	return {
		koordinatorsDeltakerlister,
		setKoordinatorsDeltakerlister
	}
})
