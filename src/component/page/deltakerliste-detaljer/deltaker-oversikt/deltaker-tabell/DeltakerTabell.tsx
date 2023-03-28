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

/* 
 * Det er en forholdsvis stor andel brukere med skjermbredde på 1280px så ideelt sett bør 
 * tabellen ikke ha en horisontalscroll på skjermbredder >= 1280px
 */
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
