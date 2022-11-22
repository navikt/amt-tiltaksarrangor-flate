import constate from 'constate'
import { useState } from 'react'

import { Gjennomforing } from '../../../../api/data/tiltak'

export const [ GjennomforingStoreProvider, useGjennomforingStore ] = constate((props: { gjennomforing: Gjennomforing }) => {
	const [ gjennomforing ] = useState<Gjennomforing>(props.gjennomforing)

	return {
		gjennomforing
	}
})
