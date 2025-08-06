import { useState } from 'react'

import { ModalDataProps } from './ModalController'

export enum ModalType {
  LeggTilOppstart,
  EndreOppstart,
  ForlengDeltakelse,
  SettDeltakerIkkeAktuell,
  AvsluttDeltaker,
  AvsluttKursDeltaker,
  EndreProsentDeltakelse,
  EndreSluttdato,
  EndreSluttaarsak,
  FjernOppstartsdato,
  EndreAvslutning
}

interface BaseModalData<T extends ModalType, P> {
  type: T
  props: P
}

type LeggTilOppstartData = BaseModalData<
  ModalType.LeggTilOppstart,
  ModalDataProps
>
type EndreOppstartModalData = BaseModalData<
  ModalType.EndreOppstart,
  ModalDataProps
>
type ForlengDeltakelseModalData = BaseModalData<
  ModalType.ForlengDeltakelse,
  ModalDataProps
>
type SettDeltakerIkkeAktuellModalData = BaseModalData<
  ModalType.SettDeltakerIkkeAktuell,
  ModalDataProps
>
type AvsluttDeltakerModalData = BaseModalData<
  ModalType.AvsluttDeltaker,
  ModalDataProps
>

type AvsluttKursDeltakerModalData = BaseModalData<
  ModalType.AvsluttKursDeltaker,
  ModalDataProps
>
type EndreProsentDeltakelse = BaseModalData<
  ModalType.EndreProsentDeltakelse,
  ModalDataProps
>
type EndreSluttdato = BaseModalData<ModalType.EndreSluttdato, ModalDataProps>
type EndreSluttaarsak = BaseModalData<
  ModalType.EndreSluttaarsak,
  ModalDataProps
>
type FjernOppstartsdato = BaseModalData<
  ModalType.FjernOppstartsdato,
  ModalDataProps
>
type EndreAvslutning = BaseModalData<
  ModalType.EndreAvslutning,
  ModalDataProps
>

export type ModalData =
  | LeggTilOppstartData
  | EndreOppstartModalData
  | ForlengDeltakelseModalData
  | SettDeltakerIkkeAktuellModalData
  | AvsluttDeltakerModalData
  | AvsluttKursDeltakerModalData
  | EndreProsentDeltakelse
  | EndreSluttdato
  | EndreSluttaarsak
  | FjernOppstartsdato
  | EndreAvslutning

export interface ModalHandler {
  modalData: ModalData | undefined
  lukkModal: () => void
  visEndreOppstartModal: (props: ModalDataProps) => void
  visLeggTilOppstartModal: (props: ModalDataProps) => void
  visForlengDeltakelseModal: (props: ModalDataProps) => void
  visSettDeltakerIkkeAktuellModal: (props: ModalDataProps) => void
  visAvsluttDeltakerModal: (props: ModalDataProps) => void
  visAvsluttKursDeltakerModal: (props: ModalDataProps) => void
  visEndreProsentDeltakelseModal: (props: ModalDataProps) => void
  visEndreSluttdatoModal: (props: ModalDataProps) => void
  visEndreSluttaarsakModal: (props: ModalDataProps) => void
  visFjernOppstartsdatoModal: (props: ModalDataProps) => void
  visEndreAvslutningModal: (props: ModalDataProps) => void
}

export const useModalData = (): ModalHandler => {
  const [modalData, setModalData] = useState<ModalData>()

  const lukkModal = () => {
    setModalData(undefined)
  }

  const visEndreOppstartModal = (props: ModalDataProps) => {
    setModalData({
      type: ModalType.EndreOppstart,
      props: props
    })
  }

  const visLeggTilOppstartModal = (props: ModalDataProps) => {
    setModalData({
      type: ModalType.LeggTilOppstart,
      props: props
    })
  }

  const visForlengDeltakelseModal = (props: ModalDataProps) => {
    setModalData({
      type: ModalType.ForlengDeltakelse,
      props: props
    })
  }

  const visSettDeltakerIkkeAktuellModal = (props: ModalDataProps) => {
    setModalData({
      type: ModalType.SettDeltakerIkkeAktuell,
      props: props
    })
  }

  const visAvsluttDeltakerModal = (props: ModalDataProps) => {
    setModalData({
      type: ModalType.AvsluttDeltaker,
      props: props
    })
  }

  const visAvsluttKursDeltakerModal = (props: ModalDataProps) => {
    setModalData({
      type: ModalType.AvsluttKursDeltaker,
      props: props
    })
  }

  const visEndreProsentDeltakelseModal = (props: ModalDataProps) => {
    setModalData({
      type: ModalType.EndreProsentDeltakelse,
      props: props
    })
  }

  const visEndreSluttdatoModal = (props: ModalDataProps) => {
    setModalData({
      type: ModalType.EndreSluttdato,
      props: props
    })
  }

  const visEndreSluttaarsakModal = (props: ModalDataProps) => {
    setModalData({
      type: ModalType.EndreSluttaarsak,
      props: props
    })
  }

  const visFjernOppstartsdatoModal = (props: ModalDataProps) => {
    setModalData({
      type: ModalType.FjernOppstartsdato,
      props: props
    })
  }

  const visEndreAvslutningModal = (props: ModalDataProps) => {
    setModalData({
      type: ModalType.EndreAvslutning,
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
    visAvsluttKursDeltakerModal,
    visEndreProsentDeltakelseModal,
    visEndreSluttdatoModal,
    visEndreSluttaarsakModal,
    visFjernOppstartsdatoModal,
    visEndreAvslutningModal
  }
}
