import { AxiosResponse } from 'axios'
import React from 'react'

import { Endringsmelding } from '../../../../api/data/tiltak'
import { hentEndringsmeldinger } from '../../../../api/tiltak-api'
import { Nullable } from '../../../../utils/types/or-nothing'
import { usePromise } from '../../../../utils/use-promise'
import { SluttdatoPanel } from './SluttdatoPanel'
import { StartdatoPanel } from './StardatoPanel'

interface DeltakelsesperiodeProps {
	erSkjermetPerson: boolean
	deltakerId: string
	startDato: Nullable<Date>
	sluttDato: Nullable<Date>
	gjennomforingStartDato: Nullable<Date>
	gjennomforingSluttDato: Nullable<Date>
	className?: string
}


export const Deltakelsesperiode = ({
	erSkjermetPerson,
	deltakerId,
	startDato,
	sluttDato,
	gjennomforingStartDato,
	gjennomforingSluttDato,
	className
}: DeltakelsesperiodeProps): React.ReactElement => {
	const endringsmeldingerPromise = usePromise<AxiosResponse<Endringsmelding[]>>(() => hentEndringsmeldinger(deltakerId))

	const aktiveEndringsmeldinger: Endringsmelding[] | undefined = endringsmeldingerPromise.result?.data
		.filter(e => e.aktiv)
	const aktivStartdatoEndringsmelding = aktiveEndringsmeldinger?.filter(e => e.startDato != null)[0]
	const aktivSluttdatoEndringsmelding = aktiveEndringsmeldinger?.filter(e => e.sluttDato != null)[0]

	const sluttDatoKanIkkeEndres = !startDato && !sluttDato

	return (
		<div className={className}>
			<StartdatoPanel
				deltakerId={deltakerId}
				disabled={erSkjermetPerson}
				startDato={startDato}
				aktivEndringsmelding={aktivStartdatoEndringsmelding}
				gjennomforingStartDato={gjennomforingStartDato}
				gjennomforingSluttDato={gjennomforingSluttDato}
			/>
			<SluttdatoPanel 
				deltakerId={deltakerId}
				disabled={erSkjermetPerson || sluttDatoKanIkkeEndres}
				sluttDato={sluttDato}
				aktivEndringsmelding={aktivSluttdatoEndringsmelding}
				gjennomforingStartDato={gjennomforingStartDato}
				gjennomforingSluttDato={gjennomforingSluttDato}
			/>
		</div>
	)
}
