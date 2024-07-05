import React from 'react'
import { AktivtForslag } from '../../../../../api/data/forslag'
import styles from './Forslag.module.scss'
import { BodyShort } from '@navikt/ds-react'
import { AktivtForslagPanel } from './AktivtForslagPanel'

interface Props {
	readonly forslag: AktivtForslag[]
	readonly deltakerId: string
	readonly onTilbakekalt: (forslag: AktivtForslag) => void
}
export const AktiveForslag = ({ deltakerId, forslag, onTilbakekalt }: Props) => {

	if (forslag.length === 0) {
		return
	}

	return (
		<div className={styles.aktiveForslag}>
			<BodyShort size="small" className={styles.aktiveForslagTitle}>Forslag sendt til NAV:</BodyShort>
			<div className={styles.panelWrapper}>
				{forslag.map(it => {
					return <AktivtForslagPanel 
						forslag={it}
						deltakerId={deltakerId}
						onTilbakekalt={onTilbakekalt}
						key={it.id}
					/>
				})}
			</div>
		</div>
	)
}
