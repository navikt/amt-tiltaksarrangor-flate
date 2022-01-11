import { Table } from '@navikt/ds-react'
import React from 'react'

import { SorterbarKolonneHeader } from './SorterbarKolonneHeader'
import { DeltakerKolonneNavn } from './types'

export const TabellHeader = (): JSX.Element => {
	return (
		<Table.Header>
			<Table.Row>
				<SorterbarKolonneHeader kolonne={DeltakerKolonneNavn.NAVN}/>
				<SorterbarKolonneHeader kolonne={DeltakerKolonneNavn.FODSELSNUMMER}/>
				<SorterbarKolonneHeader kolonne={DeltakerKolonneNavn.START} />
				<SorterbarKolonneHeader kolonne={DeltakerKolonneNavn.SLUTT} />
				<SorterbarKolonneHeader kolonne={DeltakerKolonneNavn.REGDATO} />
				<SorterbarKolonneHeader kolonne={DeltakerKolonneNavn.STATUS} />
			</Table.Row>
		</Table.Header>
	)
}
