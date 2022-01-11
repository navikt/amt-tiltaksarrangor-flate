import { Table } from '@navikt/ds-react'
import React from 'react'

import { TiltakDeltaker } from '../../../../domeneobjekter/deltaker'
import { Rad } from './Rad'

interface TabellBodyProps {
	brukere: TiltakDeltaker[];
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
