import React, { useState } from 'react'

import { DeltakerStatusAarsakType } from '../../../../../api/data/endringsmelding'
import { deltakerIkkeAktuell } from '../../../../../api/tiltak-api'
import { Nullable } from '../../../../../utils/types/or-nothing'
import { BaseModal } from '../../../../felles/base-modal/BaseModal'
import { AarsakSelector } from './AarsakSelector'
import { SendTilNavKnapp } from './SendTilNavKnapp'
import { VeilederConfirmationPanel } from './VeilederConfirmationPanel'

interface SettIkkeAktuellModalProps {
	onClose: () => void
}

export interface SettIkkeAktuellModalDataProps {
	deltakerId: string
	visGodkjennVilkaarPanel: boolean
	onEndringUtfort: () => void
}

export const SettIkkeAktuellModal = (props: SettIkkeAktuellModalProps & SettIkkeAktuellModalDataProps) => {
	const { deltakerId, onClose, visGodkjennVilkaarPanel, onEndringUtfort } = props
	const [ aarsak, settAarsak ] = useState<DeltakerStatusAarsakType>()
	const [ beskrivelse, settBeskrivelse ] = useState<Nullable<string>>()
	const [ vilkaarGodkjent, settVilkaarGodkjent ] = useState(false)
	const kanSendeEndringsmelding = aarsak === DeltakerStatusAarsakType.ANNET?
		aarsak && (vilkaarGodkjent || !visGodkjennVilkaarPanel) && beskrivelse :
		aarsak && (vilkaarGodkjent || !visGodkjennVilkaarPanel)

	const sendEndringsmelding = () => {
		if (!aarsak) {
			return Promise.reject()
		}
		if (aarsak === DeltakerStatusAarsakType.ANNET && !beskrivelse) {
			return Promise.reject()
		}
		return deltakerIkkeAktuell(deltakerId, aarsak, (beskrivelse ?? null))
			.then(onEndringUtfort)
	}

	const onAarsakSelected = (nyAarsak: DeltakerStatusAarsakType, nyBeskrivelse: Nullable<string>) => {
		settAarsak(nyAarsak)
		settBeskrivelse(nyBeskrivelse)
	}

	return (
		<BaseModal tittel="Deltaker er ikke aktuell" onClose={onClose}>
			<AarsakSelector tittel="Hva er årsaken til at deltakeren ikke er aktuell?" onAarsakSelected={onAarsakSelected}/>
			{ visGodkjennVilkaarPanel && <VeilederConfirmationPanel vilkaarGodkjent={vilkaarGodkjent} setVilkaarGodkjent={settVilkaarGodkjent}/> }
			<SendTilNavKnapp
				onEndringSendt={onClose}
				sendEndring={sendEndringsmelding}
				disabled={!kanSendeEndringsmelding} />
		</BaseModal>
	)
}
