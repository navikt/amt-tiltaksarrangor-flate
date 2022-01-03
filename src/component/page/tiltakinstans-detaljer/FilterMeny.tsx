import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel'
import { Checkbox, CheckboxGruppe } from 'nav-frontend-skjema'
import React from 'react'

import { TiltakDeltakerStatus } from '../../../domeneobjekter/deltaker'
import globalStyles from '../../../globals.module.less'
import { useTiltaksoversiktSokStore } from '../../../store/tiltaksoversikt-sok-store'
import { mapTiltakDeltagerStatusTilTekst } from '../../../utils/text-mappers'

export const FilterMeny = (): React.ReactElement => {
	const {
		tiltakStatusFilter,
		leggTilTiltakStatus,
		fjernFraTiltakStatus,
	} = useTiltaksoversiktSokStore()

	return (
		<div>
			<Ekspanderbartpanel tittel="Status" className={globalStyles.blokkM} apen>
				<CheckboxGruppe>
					{Object.values(TiltakDeltakerStatus).map((status) => (
						<Checkbox
							key={status}
							label={mapTiltakDeltagerStatusTilTekst(status)}
							name="filter-tiltakstatus"
							checked={tiltakStatusFilter.includes(status)}
							onChange={(e) => {
								if (e.target.checked) {
									leggTilTiltakStatus(status)
								} else {
									fjernFraTiltakStatus(status)
								}
							}}
						/>
					))}
				</CheckboxGruppe>
			</Ekspanderbartpanel>
		</div>
	)
}
