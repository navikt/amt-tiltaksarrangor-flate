import constate from 'constate'
import { useState } from 'react'

export const [ KoordinatorTableFilterStore, useKoordinatorTableFilterStore ] = constate(() => {
	const [ veilederFilter, setVeilederFilter ] = useState<string[]>([])
	const [ medveilederFilter, setMedveilederFilter ] = useState<string[]>([])

	return {
		veilederFilter,
		setVeilederFilter,
		medveilederFilter,
		setMedveilederFilter
	}

})
