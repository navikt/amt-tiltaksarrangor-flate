import { Checkbox, CheckboxGroup, Panel } from '@navikt/ds-react'
import React from 'react'

import { TiltakDeltakerStatus } from '../../../domeneobjekter/deltaker'
import { useTiltaksoversiktSokStore } from '../../../store/tiltaksoversikt-sok-store'
import { mapTiltakDeltagerStatusTilTekst } from '../../../utils/text-mappers'

export const FilterMeny = (): React.ReactElement => {
	const {
		tiltakStatusFilter,
		leggTilTiltakStatus,
		fjernFraTiltakStatus,
	} = useTiltaksoversiktSokStore()

	return (
		<Panel>
			<CheckboxGroup legend="Status">
				{Object.values(TiltakDeltakerStatus).map((status) => (
					<Checkbox
						key={status}
						name="filter-tiltakstatus"
						checked={tiltakStatusFilter.includes(status)}
						onChange={(e) => {
							if (e.target.checked) {
								leggTilTiltakStatus(status)
							} else {
								fjernFraTiltakStatus(status)
							}
						}}
					>{mapTiltakDeltagerStatusTilTekst(status)}</Checkbox>
				))}
			</CheckboxGroup>
		</Panel>
	)
}
