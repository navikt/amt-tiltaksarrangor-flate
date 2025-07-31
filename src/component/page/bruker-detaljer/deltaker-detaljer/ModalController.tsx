import React from 'react'

import { AvsluttDeltakelseModal } from './endre-deltaker-modal/AvsluttDeltakelseModal'
import { EndreOppstartModal } from './endre-deltaker-modal/EndreOppstartModal'
import { EndreProsentDeltakelseModal } from './endre-deltaker-modal/EndreProsentDeltakelseModal'
import { ForlengDeltakelseModal } from './endre-deltaker-modal/ForlengDeltakelseModal'
import { LeggTilOppstartModal } from './endre-deltaker-modal/LeggTilOppstartModal'
import { SettIkkeAktuellModal } from './endre-deltaker-modal/SettIkkeAktuellModal'
import { ModalData, ModalType } from './modal-store'
import { EndreSluttdatoModal } from './endre-deltaker-modal/EndreSluttdatoModal'
import { EndreSluttaarsakModal } from './endre-deltaker-modal/EndreSluttaarsakModal'
import { FjernOppstartsdatoModal } from './endre-deltaker-modal/FjernOppstartsdatoModal'
import { Deltaker } from '../../../../api/data/deltaker'
import { AktivtForslag } from '../../../../api/data/forslag'
import { AvsluttKursDeltakelseModal } from './endre-deltaker-modal/AvsluttKursDeltakelseModal'

export interface ModalDataProps {
  readonly deltaker: Deltaker
  readonly visGodkjennVilkaarPanel: boolean
  readonly endringstype?: ModalType
  readonly onEndringSendt: (oppdatertDeltaker: Deltaker) => void
  readonly onForslagSendt: (forslag: AktivtForslag) => void
  readonly onClose: () => void
}

export const ModalController = (props: {
  modalData: ModalData | undefined
}): React.ReactElement | null => {
  const { modalData } = props

  switch (modalData?.type) {
    case ModalType.LeggTilOppstart:
      return <LeggTilOppstartModal {...modalData.props} />
    case ModalType.EndreOppstart:
      return <EndreOppstartModal {...modalData.props} />
    case ModalType.ForlengDeltakelse:
      return <ForlengDeltakelseModal {...modalData.props} />
    case ModalType.SettDeltakerIkkeAktuell:
      return <SettIkkeAktuellModal {...modalData.props} />
    case ModalType.AvsluttDeltaker:
      return <AvsluttDeltakelseModal {...modalData.props} />
    case ModalType.EndreAvslutning:
    case ModalType.AvsluttKursDeltaker:
      return <AvsluttKursDeltakelseModal {...modalData.props} endringstype={modalData?.type} />
    case ModalType.EndreProsentDeltakelse:
      return <EndreProsentDeltakelseModal {...modalData.props} />
    case ModalType.EndreSluttdato:
      return <EndreSluttdatoModal {...modalData.props} />
    case ModalType.EndreSluttaarsak:
      return <EndreSluttaarsakModal {...modalData.props} />
    case ModalType.FjernOppstartsdato:
      return <FjernOppstartsdatoModal {...modalData.props} />
    default:
      return null
  }
}
