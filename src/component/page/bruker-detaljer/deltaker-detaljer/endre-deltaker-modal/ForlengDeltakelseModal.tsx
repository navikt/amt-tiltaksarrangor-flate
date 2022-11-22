import { BodyShort, Radio, RadioGroup } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'

import { forlengDeltakelse } from '../../../../../api/tiltak-api'
import { formatDate } from '../../../../../utils/date-utils'
import { Nullable } from '../../../../../utils/types/or-nothing'
import { DateField } from '../../../../felles/DateField'
import { BaseModal } from './BaseModal'
import { SendTilNavKnapp } from './SendTilNavKnapp'
import { VeilederConfirmationPanel } from './VeilederConfirmationPanel'

export interface ForlengDeltakelseModalProps {
	onClose: () => void
}

export interface ForlengDeltakelseModalDataProps {
	deltakerId: string
	sluttDato: Nullable<Date>
	onEndringUtfort: () => void
}

export const ForlengDeltakelseModal = (props: ForlengDeltakelseModalProps & ForlengDeltakelseModalDataProps) => {
	const { deltakerId, sluttDato, onClose, onEndringUtfort } = props
	const [ valgtVarighet, settValgtVarighet ] = useState()
	const [ nySluttDato, settNySluttDato ] = useState<Nullable<Date>>()
	const [ vilkaarGodkjent, settVilkaarGodkjent ] = useState(false)
	const visDatoVelger = valgtVarighet === 'Annet'

	const kalkulerDato = (sluttdato: Nullable<Date>, forlengMnd: number) : Date => {
		return dayjs(sluttdato).add(forlengMnd, 'month').toDate()
	}

	const sendEndringsmelding = () => {
		if(!nySluttDato) {
			return Promise.reject('Kan ikke sende ForlengDeltakelse endringsmelding uten sluttdato')
		}
		return forlengDeltakelse(deltakerId, nySluttDato)
			.then(onEndringUtfort)
	}

	useEffect(() => {
		const varighet = Number(valgtVarighet)
		if(varighet) {
			settNySluttDato(kalkulerDato(sluttDato, varighet))
		}
		else settNySluttDato(null)
	}, [ valgtVarighet, sluttDato ])

	return (
		<BaseModal tittel="Forleng deltakelse" onClose={onClose}>
			<RadioGroup
				legend="Hvor lenge skal deltakelsen forlenges?"
				onChange={(val) => settValgtVarighet(val)}>
				<Radio value="1">1 måned</Radio>
				<Radio value="2">2 måneder</Radio>
				<Radio value="6">6 måneder</Radio>
				<Radio value="Annet">
					Annet - velg dato:
					{visDatoVelger &&
						<DateField
							label={null}
							onDateChanged={d => settNySluttDato(d)}
							aria-label="Annet - velg dato"/>
					}
				</Radio>
			</RadioGroup>
			{nySluttDato && !visDatoVelger &&
				<BodyShort>Ny sluttdato: {formatDate(nySluttDato)}</BodyShort>}
			<VeilederConfirmationPanel vilkaarGodkjent={vilkaarGodkjent} setVilkaarGodkjent={settVilkaarGodkjent}/>
			<SendTilNavKnapp
				onEndringSendt={onClose}
				sendEndring={sendEndringsmelding}
				disabled={!nySluttDato || !vilkaarGodkjent}/>

		</BaseModal>
	)
}