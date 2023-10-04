import { useState } from 'react'

import { AvsluttDeltakelseModalDataProps } from './endre-deltaker-modal/AvsluttDeltakelseModal'
import { EndreOppstartModalDataProps } from './endre-deltaker-modal/EndreOppstartModal'
import { EndreProsentDeltakelseModalDataProps } from './endre-deltaker-modal/EndreProsentDeltakelseModal'
import { ForlengDeltakelseModalDataProps } from './endre-deltaker-modal/ForlengDeltakelseModal'
import { LeggTilOppstartModalDataProps } from './endre-deltaker-modal/LeggTilOppstartModal'
import { SettIkkeAktuellModalDataProps } from './endre-deltaker-modal/SettIkkeAktuellModal'
import { EndreSluttdatoModalDataProps } from './endre-deltaker-modal/EndreSluttdatoModal'
import { EndreSluttaarsakModalDataProps } from './endre-deltaker-modal/EndreSluttaarsakModal'

export enum ModalType {
	LeggTilOppstart,
	EndreOppstart,
	ForlengDeltakelse,
	SettDeltakerIkkeAktuell,
	AvsluttDeltaker,
	EndreProsentDeltakelse,
	EndreSluttdato,
	EndreSluttaarsak
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
type EndreProsentDeltakelse = BaseModalData<ModalType.EndreProsentDeltakelse, EndreProsentDeltakelseModalDataProps>
type EndreSluttdato = BaseModalData<ModalType.EndreSluttdato, EndreSluttdatoModalDataProps>
type EndreSluttaarsak = BaseModalData<ModalType.EndreSluttaarsak, EndreSluttaarsakModalDataProps>

export type ModalData = LeggTilOppstartData |
	EndreOppstartModalData |
	ForlengDeltakelseModalData |
	SettDeltakerIkkeAktuellModalData |
	AvsluttDeltakerModalData |
	EndreProsentDeltakelse |
	EndreSluttdato |
	EndreSluttaarsak


export const useModalData = () => {
	const [ modalData, setModalData ] = useState<ModalData>()

	const lukkModal = () => {
		setModalData(undefined)
	}

	const visEndreOppstartModal = (props: EndreOppstartModalDataProps) => {
		setModalData({
			type: ModalType.EndreOppstart,
			props: props })
	}

	const visLeggTilOppstartModal = (props: LeggTilOppstartModalDataProps) => {
		setModalData({
			type: ModalType.LeggTilOppstart,
			props: props
		})
	}

	const visForlengDeltakelseModal = (props: ForlengDeltakelseModalDataProps) => {
		setModalData({
			type: ModalType.ForlengDeltakelse,
			props: props
		})
	}

	const visSettDeltakerIkkeAktuellModal = (props: SettIkkeAktuellModalDataProps) => {
		setModalData({
			type: ModalType.SettDeltakerIkkeAktuell,
			props: props
		})
	}

	const visAvsluttDeltakerModal = (props: AvsluttDeltakelseModalDataProps) => {
		setModalData({
			type: ModalType.AvsluttDeltaker,
			props: props
		})
	}

	const visEndreProsentDeltakelseModal = (props: EndreProsentDeltakelseModalDataProps) => {
		setModalData({
			type: ModalType.EndreProsentDeltakelse,
			props: props
		})
	}

	const visEndreSluttdatoModal = (props: EndreSluttdatoModalDataProps) => {
		setModalData({
			type: ModalType.EndreSluttdato,
			props: props
		})
	}

	const visEndreSluttaarsakModal = (props: EndreSluttaarsakModalDataProps) => {
		setModalData({
			type: ModalType.EndreSluttaarsak,
			props: props
		})
	}

	return {
		modalData,
		lukkModal,
		visEndreOppstartModal,
		visLeggTilOppstartModal,
		visForlengDeltakelseModal,
		visSettDeltakerIkkeAktuellModal,
		visAvsluttDeltakerModal,
		visEndreProsentDeltakelseModal,
		visEndreSluttdatoModal,
		visEndreSluttaarsakModal
	}
}
