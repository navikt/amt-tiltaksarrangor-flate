import { BodyShort, Label, Tag } from '@navikt/ds-react'
import React from 'react'
import { Deltaker, TiltakDeltakerStatus, Vurderingstype } from '../../../../../api/data/deltaker'
import styles from './DeltakerVurdering.module.scss'
import { VurderDeltakelseKnapp } from './VurderDeltakelseKnapp'
import { vurderingstypeTeksMapper } from '../../deltaker-detaljer/tekst-mappers'
import { EMDASH } from '../../../../../utils/constants'

interface DeltakerVurderingProps {
	deltaker: Deltaker
	onVurderingSendt: () => void
}

const getTagType = (vurderingstype:  Vurderingstype | undefined) => {
	switch (vurderingstype) {
		case Vurderingstype.OPPFYLLER_IKKE_KRAVENE: return 'error'
		case Vurderingstype.OPPFYLLER_KRAVENE: return 'success'
	}
}

export const DeltakerVurdering = ({ deltaker, onVurderingSendt }: DeltakerVurderingProps): React.ReactElement => {
	const vurderingstype = deltaker.gjeldendeVurderingFraArrangor?.vurderingstype
	const vurdering = vurderingstype ? vurderingstypeTeksMapper(vurderingstype) : '-'
	const tagType = getTagType(vurderingstype)

	return (
		<div className={styles.vurdering}>
			<BodyShort size="small">
				<Label as="span" size="small" className={styles.label}>
					Vurdering:
				</Label>
				{vurderingstype && tagType ? (
					<Tag variant={tagType} size="xsmall">
						{vurdering}
					</Tag>
				) : (
					EMDASH
				)}
			</BodyShort>
			{deltaker.status.type === TiltakDeltakerStatus.VURDERES
				&& <VurderDeltakelseKnapp deltaker={deltaker} onVurderingSendt={onVurderingSendt} />
			}
		</div>
	)
}