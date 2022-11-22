import { Button } from '@navikt/ds-react'
import React from 'react'

import { isPending, usePromise } from '../../../../../utils/use-promise'

interface SendTilNavKnappProps {
	onEndringSendt: () => void
	sendEndring: () => Promise<void>
	disabled: boolean

}

export const SendTilNavKnapp = (props: SendTilNavKnappProps) => {
	const { disabled, sendEndring } = props
	const opprettEndringPromise = usePromise<void>()

	const onClick = () => {
		opprettEndringPromise.setPromise(
			sendEndring().then(props.onEndringSendt)
		)
	}

	return (
		<Button
			variant="primary"
			size="small"
			loading={isPending(opprettEndringPromise)}
			onClick={onClick}
			disabled={disabled}>
			Send til NAV
		</Button>
	)
}