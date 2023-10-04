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

export const ModalController = (props: { modalData: ModalData | undefined, onClose: () => void }): React.ReactElement | null => {
	const { modalData, onClose } = props

	switch (modalData?.type) {
		case ModalType.LeggTilOppstart:
			return <LeggTilOppstartModal onClose={onClose} {...modalData.props} />
		case ModalType.EndreOppstart:
			return <EndreOppstartModal onClose={onClose} {...modalData.props} />
		case ModalType.ForlengDeltakelse:
			return <ForlengDeltakelseModal onClose={onClose} {...modalData.props} />
		case ModalType.SettDeltakerIkkeAktuell:
			return <SettIkkeAktuellModal onClose={onClose} {...modalData.props} />
		case ModalType.AvsluttDeltaker:
			return <AvsluttDeltakelseModal onClose={onClose} {...modalData.props} />
		case ModalType.EndreProsentDeltakelse:
			return <EndreProsentDeltakelseModal onClose={onClose} {...modalData.props} />
		case ModalType.EndreSluttdato:
			return <EndreSluttdatoModal onClose={onClose} {...modalData.props}/>
		case ModalType.EndreSluttaarsak:
			return <EndreSluttaarsakModal onClose={onClose} {...modalData.props}/>
		default: return null
	}

}
