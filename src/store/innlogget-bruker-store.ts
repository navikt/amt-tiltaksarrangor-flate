import constate from 'constate'
import { useState } from 'react'
import { Rolle } from '../api/data/ansatt'

export const [ InnloggetBrukerStoreProvider, useInnloggetBrukerStore ] = constate(() => {
	const [ roller, setRoller ] = useState<Rolle[]>([])

	return {
		roller,
		setRoller
	}
})
