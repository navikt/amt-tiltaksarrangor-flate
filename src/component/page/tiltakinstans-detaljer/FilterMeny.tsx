import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel'
import { Checkbox, CheckboxGruppe, Input } from 'nav-frontend-skjema'
import React from 'react'

import { TiltakDeltakerStatus } from '../../../domeneobjekter/deltaker'
import globalStyles from '../../../globals.module.less'
import { useTiltaksoversiktSokStore } from '../../../store/tiltaksoversikt-sok-store'
import { mapTiltakDeltagerStatusTilTekst } from '../../../utils/text-mappers'

export const FilterMeny = (): React.ReactElement => {
	const {
		navnFnrSok,
		setNavnFnrSok,
		tiltakStatusFilter,
		leggTilTiltakStatus,
		fjernFraTiltakStatus,
	} = useTiltaksoversiktSokStore()

	return (
		<div>
			<Input
				placeholder="Søk etter navn eller fødselsnummer"
				className={globalStyles.blokkM}
				value={navnFnrSok}
				onChange={(e) => setNavnFnrSok(e.target.value)}
			/>

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
