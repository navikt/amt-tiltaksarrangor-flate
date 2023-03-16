import constate from 'constate'
import { useState } from 'react'

import { Gjennomforing } from '../../../../api/data/tiltak'

export const [ DeltakerlisteStoreProvider, useDeltakerlisteStore ] = constate((props: { deltakerliste: Gjennomforing }) => {
	const [ deltakerliste ] = useState<Gjennomforing>(props.deltakerliste)

	return {
		deltakerliste: deltakerliste
	}
})
