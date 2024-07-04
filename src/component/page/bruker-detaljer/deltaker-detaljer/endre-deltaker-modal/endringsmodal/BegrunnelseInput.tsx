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
			label={'Begrunnelse'}
			description={'Beskriv gjerne kort hvorfor. Vises til NAV-veileder og deltaker.'}
			onChange={handleChange}
			value={begrunnelse}
			minRows={3}
			rows={3}
			size="small"
			maxLength={BEGRUNNELSE_MAKS_TEGN}
		/>
	)
}
