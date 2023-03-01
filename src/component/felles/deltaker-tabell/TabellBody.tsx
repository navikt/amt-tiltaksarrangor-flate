import { Table } from '@navikt/ds-react'
import React from 'react'
import { TiltakDeltaker } from '../../../api/data/deltaker'
import { TabellType } from './DeltakerTabell'

import { Rad } from './Rad'

interface TabellBodyProps {
	deltakere: TiltakDeltaker[]
	visning: TabellType
	visCheckBox?: boolean
}

export const TabellBody = (props: TabellBodyProps): React.ReactElement => {
	return (
		<Table.Body>
			{props.deltakere.map((deltaker, idx) => (
				<Rad
					idx={idx}
					deltaker={deltaker}
					key={idx}
					visning={props.visning}
					visCheckBox={props.visCheckBox}
				/>
			))}
		</Table.Body>
	)
}
