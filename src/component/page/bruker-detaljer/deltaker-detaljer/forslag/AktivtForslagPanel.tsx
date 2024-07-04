import React from 'react'
import { AktivtForslag, ForslagEndringType } from '../../../../../api/data/forslag'

import styles from './AktivtForslagPanel.module.scss'
import { Box, Button, Tooltip } from '@navikt/ds-react'
import { EndringTypeIkon } from '../EndringTypeIkon'
import { XMarkIcon } from '@navikt/aksel-icons'
import { isPending, isResolved, usePromise } from '../../../../../utils/use-promise'
import { EndringType } from '../types'
import { assertNever } from '../../../../../utils/assert-never'
import { ForslagEndringsdetaljer } from './ForslagEndringsdetaljer'

export interface Props {
	readonly forslag: AktivtForslag,
	readonly onTilbakekalt: () => void
}

export const AktivtForslagPanel = ({
	forslag,
	onTilbakekalt,
}: Props) => {
	const tilbakekallPromise = usePromise<void>()

	const handleClick = () => {
		onTilbakekalt()
	}


	return (
		<Box borderWidth="1" className={styles.panel} aria-label="Forslag sendt til nav">
			<div className={styles.innholdWrapper}>
				<EndringTypeIkon type={mapTilEndringType(forslag.endring.type)} />
				<div className={styles.innhold}>
					<ForslagEndringsdetaljer endring={forslag.endring} begrunnelse={forslag.begrunnelse} sendt={forslag.opprettet} />
				</div>
			</div>
			<Tooltip content="Tilbakekall melding" className={styles.tooltip}>
				<Button
					icon={<XMarkIcon aria-hidden />}
					loading={
						isPending(tilbakekallPromise) || isResolved(tilbakekallPromise)
					}
					variant="tertiary"
					size="small"
					onClick={handleClick}
					className={styles.closeButton}
					aria-label="Tilbakekall melding"
				/>
			</Tooltip>
		</Box>
	)
}

function mapTilEndringType(type: ForslagEndringType): EndringType {
	switch (type) {
		case ForslagEndringType.ForlengDeltakelse: return EndringType.FORLENG_DELTAKELSE
		default: assertNever(type)
	}
}

