import { useState } from 'react'

import { Nullable } from '../../../../utils/types/or-nothing'
import { AvsluttDeltakelseModalDataProps } from './endre-deltaker-modal/AvsluttDeltakelseModal'
import { EndreOppstartModalDataProps } from './endre-deltaker-modal/EndreOppstartModal'
import { ForlengDeltakelseModalDataProps } from './endre-deltaker-modal/ForlengDeltakelseModal'
import { LeggTilOppstartModalDataProps } from './endre-deltaker-modal/LeggTilOppstartModal'
import { SettIkkeAktuellModalDataProps } from './endre-deltaker-modal/SettIkkeAktuellModal'

export enum ModalType {
	LeggTilOppstart,
	EndreOppstart,
	ForlengDeltakelse,
	SettDeltakerIkkeAktuell,
	AvsluttDeltaker
}


interface BaseModalData<T extends ModalType, P> {
	type: T
	props: P
}

type LeggTilOppstartData = BaseModalData<ModalType.LeggTilOppstart, LeggTilOppstartModalDataProps>
type EndreOppstartModalData = BaseModalData<ModalType.EndreOppstart, EndreOppstartModalDataProps>
type ForlengDeltakelseModalData = BaseModalData<ModalType.ForlengDeltakelse, ForlengDeltakelseModalDataProps>
type SettDeltakerIkkeAktuellModalData = BaseModalData<ModalType.SettDeltakerIkkeAktuell, SettIkkeAktuellModalDataProps>
type AvsluttDeltakerModalData = BaseModalData<ModalType.AvsluttDeltaker, AvsluttDeltakelseModalDataProps>

export type ModalData = LeggTilOppstartData |
	EndreOppstartModalData |
	ForlengDeltakelseModalData |
	SettDeltakerIkkeAktuellModalData |
	AvsluttDeltakerModalData


export const useModalData = () => {
	const [ modalData, setModalData ] = useState<ModalData>()

	const lukkModal = () => {
		setModalData(undefined)
	}

	const visEndreOppstartModal = (deltakerId: string, onEndringUtfort: () => void) => {
		setModalData({
			type: ModalType.EndreOppstart,
			props: { deltakerId, onEndringUtfort } })
	}

	const visLeggTilOppstartModal = (deltakerId: string, onEndringUtfort: () => void) => {
		setModalData({
			type: ModalType.LeggTilOppstart,
			props: { deltakerId, onEndringUtfort }
		})
	}

	const visForlengDeltakelseModal = (deltakerId: string, sluttDato: Nullable<Date>, onEndringUtfort: () => void) => {
		setModalData({
			type: ModalType.ForlengDeltakelse,
			props: { deltakerId, sluttDato, onEndringUtfort }
		})
	}

	const visSettDeltakerIkkeAktuellModal = (deltakerId: string, onEndringUtfort: () => void) => {
		setModalData({
			type: ModalType.SettDeltakerIkkeAktuell,
			props: { deltakerId, onEndringUtfort }
		})
	}

	const visAvsluttDeltakerModal = (deltakerId: string, onEndringUtfort: () => void) => {
		setModalData({
			type: ModalType.AvsluttDeltaker,
			props: { deltakerId, onEndringUtfort }
		})
	}

	return {
		modalData,
		lukkModal,
		visEndreOppstartModal,
		visLeggTilOppstartModal,
		visForlengDeltakelseModal,
		visSettDeltakerIkkeAktuellModal,
		visAvsluttDeltakerModal
	}
}
