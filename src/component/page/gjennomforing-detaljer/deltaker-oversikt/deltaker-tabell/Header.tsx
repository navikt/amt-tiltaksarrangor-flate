import { Checkbox, Table } from '@navikt/ds-react'
import React, { ReactElement } from 'react'
import { DeltakerKolonne } from './sortering'
import toggle from '../../../../../utils/toggle'
import { Show } from '../../../../felles/Show'

function dynamicWidth(minPixels: number): React.CSSProperties {
	return { minWidth: minPixels + 'px' }
}

function fixedWidth(pixels: number): React.CSSProperties {
	const width = pixels + 'px'
	return { width: width, minWidth: width }
}

interface Props {
	visCheckBox?: boolean
}

export const KoordinatorHeader = ({ visCheckBox }: Props): ReactElement => (
	<>
		<Show if={visCheckBox}>
			<Table.ColumnHeader>
				<Checkbox size="small" value="*" aria-label="Alle deltakere" hideLabel>Alle deltakere</Checkbox>
			</Table.ColumnHeader>
		</Show>
		<Table.ColumnHeader sortKey={DeltakerKolonne.NAVN} style={dynamicWidth(230)} sortable>
			Etternavn, Fornavn
		</Table.ColumnHeader>
		<Table.ColumnHeader sortKey={DeltakerKolonne.FODSELSNUMMER} style={fixedWidth(128)} sortable>
			Fødselsnr.
		</Table.ColumnHeader>
		<Table.ColumnHeader sortKey={DeltakerKolonne.SOKT_INN} style={fixedWidth(120)} sortable>
			Søkt inn
		</Table.ColumnHeader>
		<Table.ColumnHeader sortKey={DeltakerKolonne.OPPSTART} style={fixedWidth(120)} sortable>
			Oppstart
		</Table.ColumnHeader>
		<Table.ColumnHeader sortKey={DeltakerKolonne.SLUTT} style={fixedWidth(120)} sortable>
			Slutt
		</Table.ColumnHeader>
		<Table.ColumnHeader sortKey={DeltakerKolonne.STATUS} style={fixedWidth(168)} sortable>
			Status
		</Table.ColumnHeader>
		<Show if={toggle.veiledereEnabled}>
			<Table.ColumnHeader sortKey={DeltakerKolonne.VEILEDER} style={fixedWidth(200)} sortable>
				Veileder
			</Table.ColumnHeader>
		</Show>
	</>
)
