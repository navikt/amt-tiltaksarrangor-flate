import { Checkbox, Table } from '@navikt/ds-react'
import { ReactElement } from 'react'
import { DeltakerKolonne } from './sortering'
import React from 'react'
import { Show } from '../Show'
import toggle from '../../../utils/toggle'

function dynamicWidth(minPixels: number): React.CSSProperties {
	return { minWidth: minPixels + 'px' }
}

function fixedWidth(pixels: number): React.CSSProperties {
	const width = pixels + 'px'
	return { width: width, minWidth: width }
}

const Checkboks = ({ visCheckBox }: Props): React.ReactElement => {
	if (!visCheckBox) return <></>

	return (
		<Table.ColumnHeader>
			<Checkbox size="small" value="*" aria-label="Alle deltakere" hideLabel>Alle deltakere</Checkbox>
		</Table.ColumnHeader >
	)
}

const Navn = (): React.ReactElement => (
	<Table.ColumnHeader sortKey={DeltakerKolonne.NAVN} style={dynamicWidth(230)} sortable>
		Etternavn, Fornavn
	</Table.ColumnHeader>
)

const Fnr = (): React.ReactElement => (
	<Table.ColumnHeader sortKey={DeltakerKolonne.FODSELSNUMMER} style={fixedWidth(128)} sortable>
		Fødselsnr.
	</Table.ColumnHeader>
)

const SoktInn = (): React.ReactElement => (
	<Table.ColumnHeader sortKey={DeltakerKolonne.SOKT_INN} style={fixedWidth(120)} sortable>
		Søkt inn
	</Table.ColumnHeader>
)

const Oppstart = (): React.ReactElement => (
	<Table.ColumnHeader sortKey={DeltakerKolonne.OPPSTART} style={fixedWidth(120)} sortable>
		Oppstart
	</Table.ColumnHeader>
)

const Slutt = (): React.ReactElement => (
	<Table.ColumnHeader sortKey={DeltakerKolonne.SLUTT} style={fixedWidth(120)} sortable>
		Slutt
	</Table.ColumnHeader>
)

const Status = (): React.ReactElement => (
	<Table.ColumnHeader sortKey={DeltakerKolonne.STATUS} style={fixedWidth(168)} sortable>
		Status
	</Table.ColumnHeader>
)

const Veileder = (): React.ReactElement => (
	<Table.ColumnHeader sortKey={DeltakerKolonne.VEILEDER} style={fixedWidth(200)} sortable>
		Veileder
	</Table.ColumnHeader>
)

interface Props {
	visCheckBox?: boolean
}

export const KoordinatorHeader = ({ visCheckBox }: Props): ReactElement => (
	<>
		<Checkboks visCheckBox={visCheckBox} />
		<Navn />
		<Fnr />
		<SoktInn />
		<Oppstart />
		<Slutt />
		<Status />
		<Show if={toggle.veiledereEnabled}>
			<Veileder />
		</Show>
	</>
)

export const VeilederHeader = (): ReactElement => (
	<>
		<Navn />
		<Fnr />
		<Oppstart />
		<Slutt />
		<Status />
	</>
)
