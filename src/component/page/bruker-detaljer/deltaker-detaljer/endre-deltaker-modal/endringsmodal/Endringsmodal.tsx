import React, { ReactNode, useState } from 'react'
import { BaseModal } from '../../../../../felles/base-modal/BaseModal'
import { Detail } from '@navikt/ds-react'
import { VeilederConfirmationPanel } from '../VeilederConfirmationPanel'
import { SendTilNavKnapp } from '../SendTilNavKnapp'
import { BegrunnelseInput } from './BegrunnelseInput'

interface EndringsmodalProps {
	tittel: string
	erForslag?: boolean
	visGodkjennVilkaarPanel: boolean
	erSendKnappDisabled?: boolean
	onClose: () => void
	onBegrunnelse?: (begrunnelse: string) => void
	onSend: () => Promise<void>
	children?: ReactNode
}

export function Endringsmodal(props: EndringsmodalProps) {
	const [ vilkaarGodkjent, settVilkaarGodkjent ] = useState(false)

	const krevVilkaarGodkjent = props.erForslag !== true && props.visGodkjennVilkaarPanel
	const prefix = props.erForslag ? 'Foreslå: ' : ''

	return (
		<BaseModal tittel={`${prefix}${props.tittel}`} onClose={props.onClose}>
			{props.erForslag && <Detail>Forslaget sendes til NAV-veilederen til deltaker. og deltaker.</Detail>}

			{props.children}

			{props.erForslag && props.onBegrunnelse && <BegrunnelseInput onChange={props.onBegrunnelse} />}

			{krevVilkaarGodkjent && <VeilederConfirmationPanel vilkaarGodkjent={vilkaarGodkjent} setVilkaarGodkjent={settVilkaarGodkjent} />}

			<SendTilNavKnapp
				onEndringSendt={props.onClose}
				sendEndring={props.onSend}
				disabled={(props.erSendKnappDisabled || (!vilkaarGodkjent && krevVilkaarGodkjent))}
				forslag={props.erForslag}
			/>
		</BaseModal>
	)
}
