import { BodyShort, Label, Tag } from '@navikt/ds-react'
import React, { useState } from 'react'
import {
  Deltaker,
  TiltakDeltakerStatus,
  Vurdering,
  Vurderingstype
} from '../../../../../api/data/deltaker'
import styles from './DeltakerVurdering.module.scss'
import { VurderDeltakelseKnapp } from './VurderDeltakelseKnapp'
import { vurderingstypeTeksMapper } from '../../deltaker-detaljer/tekst-mappers'
import { EMDASH } from '../../../../../utils/constants'

interface DeltakerVurderingProps {
  deltaker: Deltaker
}

const getTagType = (vurderingstype: Vurderingstype | undefined) => {
  switch (vurderingstype) {
    case Vurderingstype.OPPFYLLER_IKKE_KRAVENE:
      return 'error'
    case Vurderingstype.OPPFYLLER_KRAVENE:
      return 'success'
  }
}

export const DeltakerVurdering = ({
  deltaker
}: DeltakerVurderingProps): React.ReactElement => {
  const [vurdering, setVurdering] = useState(
    deltaker.gjeldendeVurderingFraArrangor
  )
  const vurderingstype = vurdering?.vurderingstype
  const vurderingLabel =
    vurderingstype && vurderingstypeTeksMapper(vurderingstype)
  const tagType = getTagType(vurderingstype)

  const updateVurdering = (vurdering: Vurdering | null) => {
    setVurdering(vurdering)
  }

  return (
    <div className={styles.vurderingWrapper}>
      <BodyShort size="small" className={styles.vurdering}>
        <Label as="span" size="small">
          Vurdering fra tiltaksarrangør:
        </Label>
        {vurderingstype && tagType ? (
          <>
            <Tag variant={tagType} size="xsmall">
              {vurderingLabel}
            </Tag>
            {vurdering?.begrunnelse}
          </>
        ) : (
          EMDASH
        )}
      </BodyShort>
      {deltaker.status.type === TiltakDeltakerStatus.VURDERES && (
        <VurderDeltakelseKnapp
          deltakerId={deltaker.id}
          updateVurdering={updateVurdering}
        />
      )}
    </div>
  )
}
