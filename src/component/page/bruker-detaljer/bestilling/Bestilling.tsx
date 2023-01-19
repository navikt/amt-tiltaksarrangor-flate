import { Collapse, Expand } from '@navikt/ds-icons'
import { BodyLong, Label } from '@navikt/ds-react'
import React, { useState } from 'react'

import { EMDASH } from '../../../../utils/constants'
import { Nullable } from '../../../../utils/types/or-nothing'
import { Show } from '../../../felles/Show'
import styles from './Bestilling.module.scss'

interface BestillingProps {
	tekst: Nullable<string>
}

const MAX_LENGTH = 350

export const Bestilling = (props: BestillingProps) => {
	const [ showAll, setShowAll ] = useState(false)

	const erBestillingOverMax = (props.tekst?.length || 0) > MAX_LENGTH
	let bestillingTekst = props.tekst || EMDASH

	if (!showAll && erBestillingOverMax) {
		bestillingTekst = bestillingTekst.substring(0, MAX_LENGTH) + '...'
	}

	const toggleShowAll = () => {
		setShowAll((prevShowAll) => !prevShowAll)
	}

	return (
		<div className={styles.wrapper}>
			<Label size="small" as="p">Bestilling</Label>

			<BodyLong size="small" className={styles.tekst}>
				{bestillingTekst}
			</BodyLong>

			<Show if={erBestillingOverMax}>
				{
					showAll && (
						<button className={styles.toggleKnapp} onClick={toggleShowAll}>
							Skjul <Collapse />
						</button>
					)
				}
				{
					!showAll && (
						<button className={styles.toggleKnapp} onClick={toggleShowAll}>
							Les mer <Expand />
						</button>
					)
				}
			</Show>
		</div>
	)
}
