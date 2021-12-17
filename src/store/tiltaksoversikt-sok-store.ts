import constate from 'constate'
import { useState } from 'react'

import { DeltakerKolonneNavn, DeltakerSortering } from '../component/page/tiltakinstans-detaljer/deltaker-oversikt/types'
import { TiltakDeltagerStatus } from '../domeneobjekter/deltager'
import { SorteringType } from '../utils/sortering-utils'

export const [ TiltaksoversiktSokStoreProvider, useTiltaksoversiktSokStore ] = constate(() => {
	const [ navnFnrSok, setNavnFnrSok ] = useState<string>('')
	const [ tiltakStatusFilter, setTiltakStatusFilter ] = useState<TiltakDeltagerStatus[]>([])
	const [ deltakerSortering, setDeltakerSortering ] = useState<DeltakerSortering>( {
		kolonne: DeltakerKolonneNavn.NAVN,
		type: SorteringType.NONE
	})

	const leggTilTiltakStatus = (tiltakStatus: TiltakDeltagerStatus) => {
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

	return {
		navnFnrSok,
		setNavnFnrSok,
		tiltakStatusFilter,
		leggTilTiltakStatus,
		fjernFraTiltakStatus,
		deltakerSortering,
		setDeltakerSortering,
	}
})
