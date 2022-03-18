import constate from 'constate'
import { useState } from 'react'

import { InnloggetAnsattDto } from '../api/data/ansatt'

export const [ DataStoreProvider, useDataStore ] = constate((props: {initialInnloggetAnsatt: InnloggetAnsattDto}) => {
	const [ innloggetAnsatt, setInnloggetAnsatt ] = useState<InnloggetAnsattDto>(props.initialInnloggetAnsatt)

	return {
		innloggetAnsatt,
		setInnloggetAnsatt,
	}
})