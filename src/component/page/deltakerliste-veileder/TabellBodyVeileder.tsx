import { Table } from '@navikt/ds-react'
import React from 'react'

import { VeiledersDeltaker } from '../../../api/data/deltaker'
import { RadVeileder } from './RadVeileder'

interface TabellBodyProps {
	brukere: VeiledersDeltaker[];
}

export const TabellBodyVeileder = (props: TabellBodyProps): JSX.Element => {
	return (
		<Table.Body>
			{props.brukere.map((bruker, idx) => (
				<RadVeileder idx={idx} bruker={bruker} key={idx} />
			))}
		</Table.Body>
	)
}
