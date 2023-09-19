import React, { useState } from 'react'

import { DeltakerStatusAarsakType } from '../../../../../api/data/endringsmelding'
import { deltakerIkkeAktuell } from '../../../../../api/tiltak-api'
import { Nullable } from '../../../../../utils/types/or-nothing'
import { BaseModal } from '../../../../felles/base-modal/BaseModal'
import { AarsakSelector } from './AarsakSelector'
import { SendTilNavKnapp } from './SendTilNavKnapp'
import { VeilederConfirmationPanel } from './VeilederConfirmationPanel'
import { aarsakTekstMapper } from '../tekst-mappers'
import { BESKRIVELSE_MAKS_TEGN } from '../../../../../utils/endre-deltaker-utils'

interface SettIkkeAktuellModalProps {
	onClose: () => void
}

export interface SettIkkeAktuellModalDataProps {
	deltakerId: string
	visGodkjennVilkaarPanel: boolean
	erKurs: boolean
	onEndringUtfort: () => void
}

export const SettIkkeAktuellModal = (props: SettIkkeAktuellModalProps & SettIkkeAktuellModalDataProps) => {
	const { deltakerId, onClose, visGodkjennVilkaarPanel, onEndringUtfort } = props
	const [ aarsak, settAarsak ] = useState<DeltakerStatusAarsakType>()
	const [ beskrivelse, settBeskrivelse ] = useState<Nullable<string>>()
	const [ vilkaarGodkjent, settVilkaarGodkjent ] = useState(false)
	const kanSendeEndringsmelding =
		aarsak === DeltakerStatusAarsakType.ANNET
			? aarsak &&
				(vilkaarGodkjent || !visGodkjennVilkaarPanel) &&
				beskrivelse &&
				beskrivelse.length <= BESKRIVELSE_MAKS_TEGN
			: aarsak && (vilkaarGodkjent || !visGodkjennVilkaarPanel)

	const sendEndringsmelding = () => {
		if (!aarsak) {
			return Promise.reject()
		}
		if (
			aarsak === DeltakerStatusAarsakType.ANNET &&
			!beskrivelse
		) {
			return Promise.reject(`Beskrivelse er påkrevd med årsak '${aarsakTekstMapper(aarsak)}'`)
		}
		if (
			aarsak === DeltakerStatusAarsakType.ANNET &&
			beskrivelse &&
			beskrivelse?.length > 40
		) {
			return Promise.reject(`Beskrivelse kan ikke være mer enn 40 tegn med årsak '${aarsakTekstMapper(aarsak)}'`)
		}
		return deltakerIkkeAktuell(deltakerId, { type: aarsak, beskrivelse: beskrivelse ?? null }).then(onEndringUtfort)
	}

	const onAarsakSelected = (nyAarsak: DeltakerStatusAarsakType, nyBeskrivelse: Nullable<string>) => {
		settAarsak(nyAarsak)
		settBeskrivelse(nyBeskrivelse)
	}

	return (
		<BaseModal tittel="Er ikke aktuell" onClose={onClose}>
			<AarsakSelector
				tittel="Hva er årsaken til at personen ikke er aktuell?"
				onAarsakSelected={onAarsakSelected}
			/>
			{visGodkjennVilkaarPanel && (
				<VeilederConfirmationPanel vilkaarGodkjent={vilkaarGodkjent} setVilkaarGodkjent={settVilkaarGodkjent} />
			)}
			<SendTilNavKnapp
				onEndringSendt={onClose}
				sendEndring={sendEndringsmelding}
				disabled={!kanSendeEndringsmelding}
			/>
		</BaseModal>
	)
}
