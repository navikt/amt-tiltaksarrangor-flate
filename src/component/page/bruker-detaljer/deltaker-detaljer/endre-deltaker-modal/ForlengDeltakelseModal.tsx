import { BodyShort, Radio, RadioGroup } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'

import { Tiltakskode } from '../../../../../api/data/tiltak'
import { forlengDeltakelse } from '../../../../../api/tiltak-api'
import { formatDate, maxDate } from '../../../../../utils/date-utils'
import { Nullable } from '../../../../../utils/types/or-nothing'
import { BaseModal } from '../../../../felles/base-modal/BaseModal'
import { DateField } from '../../../../felles/DateField'
import { useGjennomforingStore } from '../gjennomforing-store'
import { SendTilNavKnapp } from './SendTilNavKnapp'
import { Varighet, varigheter, VarighetValg, varighetValgForType } from './varighet'
import { VeilederConfirmationPanel } from './VeilederConfirmationPanel'

export interface ForlengDeltakelseModalProps {
	onClose: () => void
}

export interface ForlengDeltakelseModalDataProps {
	deltakerId: string
	startDato: Nullable<Date>
	sluttDato: Nullable<Date>
	tiltakskode: Tiltakskode
	visGodkjennVilkaarPanel: boolean
	onEndringUtfort: () => void
}

export const ForlengDeltakelseModal = (props: ForlengDeltakelseModalProps & ForlengDeltakelseModalDataProps) => {
	const { deltakerId, startDato, sluttDato, onClose, onEndringUtfort, visGodkjennVilkaarPanel } = props
	const [ valgtVarighet, settValgtVarighet ] = useState(VarighetValg.IKKE_VALGT)
	const [ nySluttDato, settNySluttDato ] = useState<Nullable<Date>>()
	const [ vilkaarGodkjent, settVilkaarGodkjent ] = useState(false)
	const { gjennomforing } = useGjennomforingStore()
	const visDatoVelger = valgtVarighet === VarighetValg.ANNET
	const minDato = maxDate(startDato, gjennomforing.startDato)

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

	useEffect(() => {
		const varighet = varigheter[valgtVarighet]
		if (varighet) {
			settNySluttDato(kalkulerSluttDato(sluttDato, varighet))
		}
		else settNySluttDato(null)
	}, [ valgtVarighet, sluttDato ])

	return (
		<BaseModal tittel="Forleng deltakelse" onClose={onClose}>
			<RadioGroup
				legend="Hvor lenge skal deltakelsen forlenges?"
				onChange={(val) => settValgtVarighet(val)}>
				{varighetValgForType(props.tiltakskode).map(v => <Radio value={v} key={v}>{varigheter[v].navn}</Radio>)}
				<Radio value={VarighetValg.ANNET}>
					Annet - velg dato
					{visDatoVelger &&
						<DateField
							min={minDato}
							max={gjennomforing.sluttDato}
							label={null}
							onDateChanged={d => settNySluttDato(d)}
							aria-label="Annet - velg dato" />
					}
				</Radio>
			</RadioGroup>
			{nySluttDato && !visDatoVelger &&
				<BodyShort>Ny sluttdato: {formatDate(nySluttDato)}</BodyShort>}
			{visGodkjennVilkaarPanel && <VeilederConfirmationPanel vilkaarGodkjent={vilkaarGodkjent} setVilkaarGodkjent={settVilkaarGodkjent} />}
			<SendTilNavKnapp
				onEndringSendt={onClose}
				sendEndring={sendEndringsmelding}
				disabled={(!nySluttDato || (!vilkaarGodkjent && visGodkjennVilkaarPanel)) } />

		</BaseModal>
	)
}
