import { Collapse, Expand } from '@navikt/ds-icons'
import { BodyLong, Heading } from '@navikt/ds-react'
import React, { useState } from 'react'

import { EMDASH } from '../../../../utils/constants'
import { Nullable } from '../../../../utils/types/or-nothing'
import { Show } from '../../../felles/Show'
import styles from './Begrunnelse.module.scss'

interface BegrunnelseProps {
	begrunnelse: Nullable<string>
}

const MAX_LENGTH = 350

export const Begrunnelse = (props: BegrunnelseProps) => {
	const [ showAll, setShowAll ] = useState(false)

	const erBegrunnelseOverMax = (props.begrunnelse?.length || 0) > MAX_LENGTH
	let begrunnelseTekst = props.begrunnelse || EMDASH

	if (!showAll && erBegrunnelseOverMax) {
		begrunnelseTekst = begrunnelseTekst.substring(0, MAX_LENGTH) + '...'
	}

	const toggleShowAll = () => {
		setShowAll((prevShowAll) => !prevShowAll)
	}

	return (
		<div>
			<Heading size="small" level="4" spacing>Begrunnelse</Heading>

			<BodyLong className={styles.begrunnelseTekst}>
				{begrunnelseTekst}
			</BodyLong>

			<Show if={erBegrunnelseOverMax}>
				{
					showAll && (
						<button className={styles.toggleKnapp} onClick={toggleShowAll}>
							Skjul <Collapse/>
						</button>
					)
				}
				{
					!showAll && (
						<button className={styles.toggleKnapp} onClick={toggleShowAll}>
							Les mer <Expand/>
						</button>
					)
				}
			</Show>
		</div>
	)
}