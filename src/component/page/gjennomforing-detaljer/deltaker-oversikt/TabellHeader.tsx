import { Table } from '@navikt/ds-react'
import React from 'react'

import { SorterbarKolonneHeader } from './SorterbarKolonneHeader'
import { DeltakerKolonneNavn } from './types'

function dynamicWidth(minPixels: number): React.CSSProperties {
	return { minWidth: minPixels + 'px' }
}

function fixedWidth(pixels: number): React.CSSProperties {
	const width =  pixels + 'px'
	return { width: width , minWidth: width }
}

export const TabellHeader = (): JSX.Element => {
	return (
		<Table.Header>
			<Table.Row>
				<SorterbarKolonneHeader kolonne={DeltakerKolonneNavn.NAVN} style={dynamicWidth(230)}/>
				<SorterbarKolonneHeader kolonne={DeltakerKolonneNavn.FODSELSNUMMER} style={fixedWidth(128)}/>
				<SorterbarKolonneHeader kolonne={DeltakerKolonneNavn.REGDATO} style={fixedWidth(120)} />
				<SorterbarKolonneHeader kolonne={DeltakerKolonneNavn.OPPSTART} style={fixedWidth(120)} />
				<SorterbarKolonneHeader kolonne={DeltakerKolonneNavn.SLUTT} style={fixedWidth(120)} />
				<SorterbarKolonneHeader kolonne={DeltakerKolonneNavn.STATUS} style={fixedWidth(168)} />
			</Table.Row>
		</Table.Header>
	)
}
