import { AxiosResponse } from 'axios'
import React from 'react'

import { Endringsmelding, EndringsmeldingType } from '../../../../api/data/endringsmelding'
import { hentEndringsmeldinger } from '../../../../api/tiltak-api'
import { Nullable } from '../../../../utils/types/or-nothing'
import { usePromise } from '../../../../utils/use-promise'
import { SluttdatoPanel } from './SluttdatoPanel'
import { StartdatoPanel } from './StardatoPanel'

interface DeltakelsesperiodeProps {
	erSkjermetPerson: boolean
	deltakerId: string
	deltakerStartdato: Nullable<Date>
	deltakerSluttdato: Nullable<Date>
	gjennomforingStartDato: Nullable<Date>
	gjennomforingSluttDato: Nullable<Date>
	className?: string
}


export const Deltakelsesperiode = ({
	erSkjermetPerson,
	deltakerId,
	deltakerStartdato: startDato,
	deltakerSluttdato: sluttDato,
	gjennomforingStartDato,
	gjennomforingSluttDato,
	className
}: DeltakelsesperiodeProps): React.ReactElement => {
	const endringsmeldingerPromise = usePromise<AxiosResponse<Endringsmelding[]>>(() => hentEndringsmeldinger(deltakerId))

	const aktiveEndringsmeldinger: Endringsmelding[] | undefined = endringsmeldingerPromise.result?.data
	const aktivSluttdato = aktiveEndringsmeldinger?.flatMap(e => {
		return e.type === EndringsmeldingType.AVSLUTT_DELTAKELSE ? e.innhold.sluttdato : []
	})[0]

	const aktivStartdato = aktiveEndringsmeldinger?.flatMap(e => {
		return e.type === EndringsmeldingType.LEGG_TIL_OPPSTARTSDATO ? e.innhold.oppstartsdato : []
	})[0]


	const sluttDatoKanIkkeEndres = !startDato && !sluttDato

	return (
		<div className={className}>
			<StartdatoPanel
				deltakerId={deltakerId}
				disabled={erSkjermetPerson}
				deltakerStartdato={startDato}
				endringsmeldingStartdato={aktivStartdato}
				gjennomforingStartDato={gjennomforingStartDato}
				gjennomforingSluttDato={gjennomforingSluttDato}
			/>
			<SluttdatoPanel
				deltakerId={deltakerId}
				disabled={erSkjermetPerson || sluttDatoKanIkkeEndres}
				deltakerStartdato={startDato}
				deltakerSluttdato={sluttDato}
				endringsmeldingSluttdato={aktivSluttdato}
				gjennomforingStartDato={gjennomforingStartDato}
				gjennomforingSluttDato={gjennomforingSluttDato}
			/>
		</div>
	)
}
