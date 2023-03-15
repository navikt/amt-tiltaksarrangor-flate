import constate from 'constate'
import { useState } from 'react'

export const [ TilbakelenkeStoreProvider, useTilbakelenkeStore ] = constate(() => {
	const [ tilbakeTilUrl, setTilbakeTilUrl ] = useState<string | null>()

	return {
		tilbakeTilUrl,
		setTilbakeTilUrl,
	}
})
