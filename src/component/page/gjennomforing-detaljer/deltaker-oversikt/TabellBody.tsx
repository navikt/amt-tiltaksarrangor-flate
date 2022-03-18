import { Table } from '@navikt/ds-react'
import React from 'react'

import { TiltakDeltakerDto } from '../../../../api/data/deltaker'
import { Rad } from './Rad'

interface TabellBodyProps {
	brukere: TiltakDeltakerDto[];
}

export const TabellBody = (props: TabellBodyProps) : JSX.Element => {
	return (
		<Table.Body>
			{props.brukere.map((bruker, idx) => (
				<Rad idx={idx} bruker={bruker} key={idx} />
			))}
		</Table.Body>
	)
}
