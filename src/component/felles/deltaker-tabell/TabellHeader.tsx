import { Table } from '@navikt/ds-react'
import React from 'react'
import { TabellType } from './DeltakerTabell'
import { KoordinatorHeader, VeilederHeader } from './headere'


interface Props {
	visning: TabellType
	visCheckBox?: boolean
}

export const TabellHeader = ({ visning, visCheckBox }: Props): JSX.Element => {
	return (
		<Table.Header>
			<Table.Row>
				{visning === TabellType.KOORDINATOR ?
					<KoordinatorHeader visCheckBox={visCheckBox} />
					:
					<VeilederHeader />
				}
			</Table.Row>
		</Table.Header>
	)
}


