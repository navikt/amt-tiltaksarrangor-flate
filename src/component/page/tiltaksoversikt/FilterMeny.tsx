import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Checkbox, CheckboxGruppe, Input } from 'nav-frontend-skjema';
import React from 'react';

import { TiltakStatus, TiltakType } from '../../../api/data/bruker';
import globalStyles from '../../../globals.module.less';
import { useTiltaksoversiktSok } from '../../../store/tiltaksoversikt-sok-store';
import { mapTiltakStatusTilTekst, mapTiltakTypeTilTekst } from '../../../utils/text-mappers';

export const FilterMeny = () => {
	const {
		navnFnrSok,
		setNavnFnrSok,
		tiltakStatuser,
		leggTilTiltakStatus,
		fjernTilTiltakStatus,
		tiltakTyper,
		leggTilTiltakType,
		fjernTilTiltakType,
	} = useTiltaksoversiktSok();

	return (
		<div>
			<Input
				placeholder="Søk etter navn eller fnr"
				className={globalStyles.blokkM}
				value={navnFnrSok}
				onChange={(e) => setNavnFnrSok(e.target.value)}
			/>

			<Ekspanderbartpanel tittel="Tiltakstype" className={globalStyles.blokkM} apen>
				<CheckboxGruppe>
					{Object.values(TiltakType).map((type) => (
						<Checkbox
							key={type}
							label={mapTiltakTypeTilTekst(type)}
							name="filter-tiltakstype"
							checked={tiltakTyper.includes(type)}
							onChange={(e) => {
								if (e.target.checked) {
									leggTilTiltakType(type);
								} else {
									fjernTilTiltakType(type);
								}
							}}
						/>
					))}
				</CheckboxGruppe>
			</Ekspanderbartpanel>

			<Ekspanderbartpanel tittel="Status" className={globalStyles.blokkM} apen>
				<CheckboxGruppe>
					{Object.values(TiltakStatus).map((status) => (
						<Checkbox
							key={status}
							label={mapTiltakStatusTilTekst(status)}
							name="filter-tiltakstatus"
							checked={tiltakStatuser.includes(status)}
							onChange={(e) => {
								if (e.target.checked) {
									leggTilTiltakStatus(status);
								} else {
									fjernTilTiltakStatus(status);
								}
							}}
						/>
					))}
				</CheckboxGruppe>
			</Ekspanderbartpanel>
		</div>
	);
};
