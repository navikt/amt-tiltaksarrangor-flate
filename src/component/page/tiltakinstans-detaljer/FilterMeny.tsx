import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Checkbox, CheckboxGruppe, Input } from 'nav-frontend-skjema';
import React from 'react';

import { TiltakStatus } from '../../../api/data/bruker';
import globalStyles from '../../../globals.module.less';
import { useTiltaksoversiktSok } from '../../../store/tiltaksoversikt-sok-store';
import { mapTiltakStatusTilTekst } from '../../../utils/text-mappers';

export const FilterMeny = () => {
	const {
		navnFnrSok,
		setNavnFnrSok,
		tiltakStatusFilter,
		leggTilTiltakStatus,
		fjernFraTiltakStatus,
	} = useTiltaksoversiktSok();

	return (
		<div>
			<Input
				placeholder="Søk etter navn eller fnr"
				className={globalStyles.blokkM}
				value={navnFnrSok}
				onChange={(e) => setNavnFnrSok(e.target.value)}
			/>

			<Ekspanderbartpanel tittel="Status" className={globalStyles.blokkM} apen>
				<CheckboxGruppe>
					{Object.values(TiltakStatus).map((status) => (
						<Checkbox
							key={status}
							label={mapTiltakStatusTilTekst(status)}
							name="filter-tiltakstatus"
							checked={tiltakStatusFilter.includes(status)}
							onChange={(e) => {
								if (e.target.checked) {
									leggTilTiltakStatus(status);
								} else {
									fjernFraTiltakStatus(status);
								}
							}}
						/>
					))}
				</CheckboxGruppe>
			</Ekspanderbartpanel>
		</div>
	);
};
