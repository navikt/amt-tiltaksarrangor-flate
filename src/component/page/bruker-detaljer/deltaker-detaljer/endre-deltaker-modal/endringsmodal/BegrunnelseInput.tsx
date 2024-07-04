import { Textarea } from '@navikt/ds-react'
import React, { useState } from 'react'
import { BEGRUNNELSE_MAKS_TEGN } from '../../../../../../utils/endre-deltaker-utils'

interface BegrunnelseInputProps {
	onChange: (begrunnelse: string) => void
}

export function BegrunnelseInput(props: BegrunnelseInputProps) {
	const [ begrunnelse, setBegrunnelse ] = useState<string>('')

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setBegrunnelse(e.target.value)
		props.onChange(e.target.value)
	}

	return (
		<Textarea
			onChange={handleChange}
			value={begrunnelse}
			minRows={1}
			rows={1}
			size="small"
			label={null}
			maxLength={BEGRUNNELSE_MAKS_TEGN}
		/>
	)
}
