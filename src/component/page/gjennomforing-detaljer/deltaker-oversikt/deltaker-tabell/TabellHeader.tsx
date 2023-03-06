import { Table } from '@navikt/ds-react'
import React from 'react'
import { KoordinatorHeader } from './Header'


interface Props {
	visCheckBox?: boolean
}

export const TabellHeader = ({ visCheckBox }: Props): React.ReactElement => {
	return (
		<Table.Header>
			<Table.Row>
				<KoordinatorHeader visCheckBox={visCheckBox} />
			</Table.Row>
		</Table.Header>
	)
}


