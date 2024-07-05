import { BodyShort, Radio, RadioGroup } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'

import { Tiltakskode } from '../../../../../api/data/tiltak'
import { forlengDeltakelse } from '../../../../../api/tiltak-api'
import { formatDate, maxDate } from '../../../../../utils/date-utils'
import { Nullable } from '../../../../../utils/types/or-nothing'
import { DateField } from '../../../../felles/DateField'
import { Varighet, varigheter, VarighetValg, varighetValgForType } from './varighet'
import { useDeltakerlisteStore } from '../deltakerliste-store'
import { AktivtForslag } from '../../../../../api/data/forslag'
import { BEGRUNNELSE_MAKS_TEGN } from '../../../../../utils/endre-deltaker-utils'
import { forlengDeltakelseForslag } from '../../../../../api/forslag-api'
import { Endringsmodal } from './endringsmodal/Endringsmodal'

export interface ForlengDeltakelseModalProps {
	readonly onClose: () => void
}

export interface ForlengDeltakelseModalDataProps {
	readonly deltakerId: string
	readonly startDato: Nullable<Date>
	readonly sluttDato: Nullable<Date>
	readonly tiltakskode: Tiltakskode
	readonly visGodkjennVilkaarPanel: boolean
	readonly onEndringUtfort: () => void
	readonly onForslagSendt: (forslag: AktivtForslag) => void
	readonly erForslagEnabled: boolean
}

export const ForlengDeltakelseModal = (props: ForlengDeltakelseModalProps & ForlengDeltakelseModalDataProps) => {
	const { deltakerId, startDato, sluttDato, onClose, onEndringUtfort, visGodkjennVilkaarPanel, erForslagEnabled } = props
	const [ valgtVarighet, settValgtVarighet ] = useState(VarighetValg.IKKE_VALGT)
	const [ nySluttDato, settNySluttDato ] = useState<Nullable<Date>>()
	const [ begrunnelse, setBegrunnelse ] = useState('')
	const { deltakerliste } = useDeltakerlisteStore()
	const visDatoVelger = valgtVarighet === VarighetValg.ANNET
	const minDato = maxDate(startDato, deltakerliste.startDato)

	const kanSendeMelding = erForslagEnabled ?
		nySluttDato !== null && begrunnelse !== '' && begrunnelse.length <= BEGRUNNELSE_MAKS_TEGN
		:
		nySluttDato !== null

	const kalkulerSluttDato = (sluttdato: Nullable<Date>, varighet: Varighet): Date => {
		return dayjs(sluttdato).add(varighet.antall, varighet.tidsenhet).toDate()
	}

	const sendEndringsmelding = () => {
		if (!nySluttDato) {
			return Promise.reject('Kan ikke sende ForlengDeltakelse endringsmelding uten sluttdato')
		}
		return forlengDeltakelse(deltakerId, nySluttDato)
			.then(onEndringUtfort)
	}

	const sendForslag = () => {
		if (!nySluttDato) {
			return Promise.reject('Kan ikke sende ForlengDeltakelse forslag uten sluttdato')
		}
		if (begrunnelse === '') {
			return Promise.reject('Begrunnelse mangler')
		}
		if (begrunnelse.length > BEGRUNNELSE_MAKS_TEGN) {
			return Promise.reject('Begrunnelsen kan ikke være over 200 tegn')
		}
		return forlengDeltakelseForslag(deltakerId, nySluttDato, begrunnelse)
			.then(res => props.onForslagSendt(res.data))
	}

	useEffect(() => {
		const varighet = varigheter[valgtVarighet]
		if (varighet) {
			settNySluttDato(kalkulerSluttDato(sluttDato, varighet))
		}
		else settNySluttDato(null)
	}, [ valgtVarighet, sluttDato ])


	return (
		<Endringsmodal
			tittel="Forleng deltakelse"
			visGodkjennVilkaarPanel={visGodkjennVilkaarPanel}
			erForslag={erForslagEnabled}
			erSendKnappDisabled={!kanSendeMelding}
			onClose={onClose}
			onSend={erForslagEnabled ? sendForslag : sendEndringsmelding}
			onBegrunnelse={begrunnelse => { setBegrunnelse(begrunnelse) }}
		>
			<RadioGroup
				legend="Hvor lenge skal deltakelsen forlenges?"
				onChange={(val) => settValgtVarighet(val)}>
				{varighetValgForType(props.tiltakskode).map(v => <Radio value={v} key={v}>{varigheter[v].navn}</Radio>)}
				<Radio value={VarighetValg.ANNET}>
					Annet - velg dato
					{visDatoVelger &&
						<DateField
							min={minDato}
							max={deltakerliste.sluttDato}
							label={null}
							onDateChanged={d => settNySluttDato(d)}
							aria-label="Annet - velg dato" />
					}
				</Radio>
			</RadioGroup>
			{nySluttDato && !visDatoVelger &&
				<BodyShort>Ny sluttdato: {formatDate(nySluttDato)}</BodyShort>}
		</Endringsmodal>
	)
}

