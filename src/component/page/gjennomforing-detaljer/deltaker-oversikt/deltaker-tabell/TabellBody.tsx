import { Table } from '@navikt/ds-react'
import React from 'react'
import { TiltakDeltaker } from '../../../../../api/data/deltaker'

import { Rad } from './Rad'

interface TabellBodyProps {
	deltakere: TiltakDeltaker[]
	visCheckBox?: boolean
}

export const TabellBody = (props: TabellBodyProps): React.ReactElement => {
	return (
		<Table.Body>
			{props.deltakere.map((deltaker, idx) => (
				<Rad
					idx={idx}
					deltaker={deltaker}
					key={deltaker.id}
					visCheckBox={props.visCheckBox}
				/>
			))}
		</Table.Body>
	)
}
