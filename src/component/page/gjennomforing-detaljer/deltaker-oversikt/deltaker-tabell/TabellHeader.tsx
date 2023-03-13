import { Table } from '@navikt/ds-react'
import React from 'react'
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

export const TabellHeader = () => (
	<Table.Header>
		<Table.Row>
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
			<Show if={toggle.veilederEnabled}>
				<Table.ColumnHeader sortKey={DeltakerKolonne.VEILEDER} style={fixedWidth(200)} sortable>
					Veileder
				</Table.ColumnHeader>
			</Show>
		</Table.Row>
	</Table.Header>
)


