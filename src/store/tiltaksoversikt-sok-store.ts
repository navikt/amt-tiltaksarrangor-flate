import constate from 'constate'
import { useState } from 'react'

import { TiltakDeltakerStatus } from '../api/data/deltaker'
import { Sortering } from '../utils/sortering-utils'

export const [ TiltaksoversiktSokStoreProvider, useTiltaksoversiktSokStore ] = constate(() => {
	const [ tiltakStatusFilter, setTiltakStatusFilter ] = useState<TiltakDeltakerStatus[]>([])
	const [ deltakerlisteFilter, setDeltakerlisteFilter ] = useState<string[]>([])
	const [ deltakerSortering, setDeltakerSortering ] = useState<Sortering>()

	const leggTilTiltakStatus = (tiltakStatus: TiltakDeltakerStatus) => {
		setTiltakStatusFilter((prevStatuser) => {
			if (prevStatuser.includes(tiltakStatus)) {
				return prevStatuser
			}

			return [ ...prevStatuser, tiltakStatus ]
		})
	}

	const fjernFraTiltakStatus = (tiltakStatus: TiltakDeltakerStatus) => {
		setTiltakStatusFilter((prevStatuser) => {
			return prevStatuser.filter((status) => status !== tiltakStatus)
		})
	}

	const leggTilDeltakerliste = (navn: string) => {
		setDeltakerlisteFilter((prevNavn) => {
			if (prevNavn.includes(navn)) {
				return prevNavn
			}

			return [ ...prevNavn, navn ]
		})
	}

	const fjernFraDeltakerliste = (navn: string) => {
		setDeltakerlisteFilter((prevNavn) => {
			return prevNavn.filter((navnFraFilter) => navnFraFilter !== navn)
		})
	}

	return {
		tiltakStatusFilter,
		leggTilTiltakStatus,
		fjernFraTiltakStatus,
		deltakerlisteFilter,
		leggTilDeltakerliste,
		fjernFraDeltakerliste,
		deltakerSortering,
		setDeltakerSortering,
	}
})
