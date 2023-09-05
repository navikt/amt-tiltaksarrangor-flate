import { Table } from '@navikt/ds-react'
import React from 'react'
import { DeltakerKolonne } from './sortering'
import styles from './TabellHeader.module.scss'

function dynamicWidth(minPixels: number): React.CSSProperties {
	return { minWidth: minPixels + 'px' }
}

function fixedWidth(pixels: number): React.CSSProperties {
	const width = pixels + 'px'
	return { width: width, minWidth: width }
}

export const TabellHeader = () => (
	<Table.Header className={ styles.sticky }>
		<Table.Row>
			<Table.ColumnHeader sortKey={DeltakerKolonne.NAVN} style={dynamicWidth(200)} sortable>
				Etternavn, Fornavn
			</Table.ColumnHeader>
			<Table.ColumnHeader sortKey={DeltakerKolonne.FODSELSNUMMER} style={fixedWidth(90)} sortable>
				Fødselsnr.
			</Table.ColumnHeader>
			<Table.ColumnHeader sortKey={DeltakerKolonne.SOKT_INN} style={fixedWidth(90)} sortable>
				Søkt&nbsp;inn
			</Table.ColumnHeader>
			<Table.ColumnHeader sortKey={DeltakerKolonne.OPPSTART} style={fixedWidth(90)} sortable>
				Oppstart
			</Table.ColumnHeader>
			<Table.ColumnHeader sortKey={DeltakerKolonne.SLUTT} style={fixedWidth(90)} sortable>
				Slutt
			</Table.ColumnHeader>
			<Table.ColumnHeader sortKey={DeltakerKolonne.STATUS} style={dynamicWidth(70)} sortable>
				Status
			</Table.ColumnHeader>
			<Table.ColumnHeader sortKey={DeltakerKolonne.VEILEDER} style={dynamicWidth(160)} sortable>
				Veileder
			</Table.ColumnHeader>
		</Table.Row>
	</Table.Header>
)


