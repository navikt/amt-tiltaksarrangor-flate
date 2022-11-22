import { Radio } from '@navikt/ds-react'
import React, { ReactElement } from 'react'

import { DeltakerStatusAarsakType } from '../../../../../api/data/endringsmelding'
import { aarsakTekstMapper } from '../tekst-mappers'

interface AarsakRadioProps {
	aarsakType: DeltakerStatusAarsakType
	children?: ReactElement
}

export const AarsakRadio = ({ aarsakType, children }: AarsakRadioProps) => {
	const tekst = aarsakTekstMapper(aarsakType)
	return (
		<Radio value={aarsakType}>
			{tekst}
			{children}
		</Radio>
	)
}