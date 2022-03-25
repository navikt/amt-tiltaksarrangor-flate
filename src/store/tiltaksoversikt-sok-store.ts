import constate from 'constate'
import { useState } from 'react'

import { TiltakDeltakerStatus } from '../api/data/deltaker'
import { DeltakerKolonneNavn, DeltakerSortering } from '../component/page/gjennomforing-detaljer/deltaker-oversikt/types'
import { SorteringType } from '../utils/sortering-utils'

export const [ TiltaksoversiktSokStoreProvider, useTiltaksoversiktSokStore ] = constate(() => {
	const [ tiltakStatusFilter, setTiltakStatusFilter ] = useState<TiltakDeltakerStatus[]>([])
	const [ deltakerSortering, setDeltakerSortering ] = useState<DeltakerSortering>( {
		kolonne: DeltakerKolonneNavn.NAVN,
		type: SorteringType.NONE
	})

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

	return {
		tiltakStatusFilter,
		leggTilTiltakStatus,
		fjernFraTiltakStatus,
		deltakerSortering,
		setDeltakerSortering,
	}
})
