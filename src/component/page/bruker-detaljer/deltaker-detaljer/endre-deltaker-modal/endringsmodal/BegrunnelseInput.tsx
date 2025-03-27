import { Textarea } from '@navikt/ds-react'
import React, { useState } from 'react'
import { BEGRUNNELSE_MAKS_TEGN, fjernUgyldigeTegn } from '../../../../../../utils/endre-deltaker-utils'

type BegrunnelseLabel = {
  label: string
  desc: string
}

export type BegrunnelseType = 'valgfri' | 'obligatorisk'

const labels: { [Key in BegrunnelseType]: BegrunnelseLabel } = {
  valgfri: {
    label: 'Vil du legge til noe mer begrunnelse? (valgfritt)',
    desc: 'Her kan du legge til mer info om hvorfor endringen er riktig for deltakeren.'
  },
  obligatorisk: {
    label: 'Begrunnelse',
    desc: 'Beskriv kort hvorfor endringen er riktig for deltakeren.'
  }
}

interface BegrunnelseInputProps {
  readonly onChange: (begrunnelse: string) => void
  readonly type: BegrunnelseType
}

export function BegrunnelseInput({ type, onChange }: BegrunnelseInputProps) {
  const [begrunnelse, setBegrunnelse] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const nyBegrunnelse = fjernUgyldigeTegn(e.target.value)
    setBegrunnelse(nyBegrunnelse)
    onChange(nyBegrunnelse)
  }

  return (
    <Textarea
      label={labels[type].label}
      description={labels[type].desc}
      onChange={handleChange}
      value={begrunnelse}
      minRows={3}
      rows={3}
      size="small"
      maxLength={BEGRUNNELSE_MAKS_TEGN}
    />
  )
}
