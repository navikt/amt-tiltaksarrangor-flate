import constate from 'constate'
import { useState } from 'react'

export const [ KoordinatorTableFilterStore, useKoordinatorTableFilterStore ] = constate(() => {
	const [ veilederFilter, setVeilederFilter ] = useState<string[]>([])

	const leggTilVeileder = (veileder: string) => {
		setVeilederFilter((prevVeileder) => {
			if(prevVeileder.includes(veileder)) {
				return prevVeileder
			}
			return [ ...prevVeileder, veileder ]
		})
	}

	const fjernVeileder = (veileder: string) => {
		setVeilederFilter((prevVeileder) => {
			return prevVeileder.filter((v) => v !== veileder)
		})
	}

	return {
		veilederFilter,
		leggTilVeileder,
		fjernVeileder
	}

})
