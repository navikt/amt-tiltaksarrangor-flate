import constate from 'constate'
import { useState } from 'react'

import { InnloggetAnsatt } from '../api/data/ansatt'
import { Nullable } from '../utils/types/or-nothing'

export const [ AuthStoreProvider, useAuthStore ] = constate(() => {
	const [ innloggetAnsatt, setInnloggetAnsatt ] = useState<Nullable<InnloggetAnsatt>>()

	const erInnlogget = innloggetAnsatt !== null

	return {
		innloggetAnsatt,
		setInnloggetAnsatt,
		erInnlogget,
	}
})
