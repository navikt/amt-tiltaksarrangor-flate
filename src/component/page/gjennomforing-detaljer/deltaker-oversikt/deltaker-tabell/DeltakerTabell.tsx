import { Table } from '@navikt/ds-react'
import React from 'react'
import { TiltakDeltaker } from '../../../../../api/data/deltaker'
import { Sortering } from '../../../../../utils/sortering-utils'
import { TabellBody } from './TabellBody'
import { TabellHeader } from './TabellHeader'

interface Props {
	deltakere: TiltakDeltaker[]
	sortering: Sortering | undefined
	onSortChange: (v: string | undefined) => void
}

export const DeltakerTabell = ({
	deltakere,
	sortering,
	onSortChange,
}: Props) => (
	<Table className="tabell" size="small" zebraStripes={true} sort={sortering} onSortChange={onSortChange} aria-label="Deltakerliste">
		<TabellHeader />
		<TabellBody deltakere={deltakere} />
	</Table>
)
