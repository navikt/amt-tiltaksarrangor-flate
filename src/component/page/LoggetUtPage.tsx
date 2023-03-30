import React, { useEffect } from 'react'
import { useTilbakelenkeStore } from '../../store/tilbakelenke-store'

// Laster tom side for å unngå videre navigasjon etter at token har utgått
// SesjonNotifikasjon alertstripe vil vises øverst
export const LoggetUtPage = () => {
	const { setTilbakeTilUrl } = useTilbakelenkeStore()

	useEffect(() => {
		setTilbakeTilUrl(null)
	}, [ setTilbakeTilUrl ])
	return <div/>
}