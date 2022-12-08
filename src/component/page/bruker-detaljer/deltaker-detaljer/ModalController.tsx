import { Modal } from '@navikt/ds-react'
import React, { useEffect } from 'react'

import { AvsluttDeltakelseModal } from './endre-deltaker-modal/AvsluttDeltakelseModal'
import { EndreOppstartModal } from './endre-deltaker-modal/EndreOppstartModal'
import { EndreProsentDeltakelseModal } from './endre-deltaker-modal/EndreProsentDeltakelseModal'
import { ForlengDeltakelseModal } from './endre-deltaker-modal/ForlengDeltakelseModal'
import { LeggTilOppstartModal } from './endre-deltaker-modal/LeggTilOppstartModal'
import { SettIkkeAktuellModal } from './endre-deltaker-modal/SettIkkeAktuellModal'
import { ModalData, ModalType } from './modal-store'

export const ModalController = (props : { modalData: ModalData | undefined, onClose: () => void }) : React.ReactElement | null => {
	const { modalData, onClose }  = props

	useEffect(() => {
		//For å sikre at skjermlesere ikke leser opp innholdet bak modal når den er åpen.
		Modal.setAppElement('#root')
	}, [])

	switch (modalData?.type) {
		case ModalType.LeggTilOppstart:
			return <LeggTilOppstartModal onClose={onClose} { ...modalData.props }/>
		case ModalType.EndreOppstart:
			return <EndreOppstartModal onClose={onClose} { ...modalData.props } />
		case ModalType.ForlengDeltakelse:
			return <ForlengDeltakelseModal onClose={onClose} { ...modalData.props }/>
		case ModalType.SettDeltakerIkkeAktuell:
			return <SettIkkeAktuellModal onClose={onClose} { ...modalData.props }/>
		case ModalType.AvsluttDeltaker:
			return <AvsluttDeltakelseModal onClose={onClose} { ...modalData.props }/>
		case ModalType.EndreProsentDeltakelse:
			return <EndreProsentDeltakelseModal onClose={onClose} {...modalData.props}/>
		default: return null
	}

}
