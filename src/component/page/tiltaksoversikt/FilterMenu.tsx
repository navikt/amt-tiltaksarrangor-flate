import React from 'react';

import { Checkbox, CheckboxGruppe, Input } from 'nav-frontend-skjema';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { TiltakStatus, TiltakType } from '../../../api/data/bruker';
import { mapTiltakStatusTilTekst, mapTiltakTypeTilTekst } from '../../../utils/text-mappers';
import { useTiltaksoversiktFilter } from '../../../store/tiltaksoversikt-filter-store';

export const FilterMenu = () => {
    const {
        navnFnrSok,
        setNavnFnrSok,
        tiltakStatuser,
        leggTilTiltakStatus,
        fjernTilTiltakStatus,
        tiltakTyper,
        leggTilTiltakType,
        fjernTilTiltakType
    } = useTiltaksoversiktFilter();

    return (
        <div>
            <Input
                placeholder="Søk etter navn eller fnr"
                className="blokk-m"
                value={navnFnrSok}
                onChange={(e) => setNavnFnrSok(e.target.value)}
            />

            <Ekspanderbartpanel tittel="Tiltakstype" className="blokk-m" apen>
                <CheckboxGruppe>
                    {Object.keys(TiltakType).map(type => (
                        <Checkbox
                            key={type}
                            label={mapTiltakTypeTilTekst(type as TiltakType)}
                            name="filter-tiltakstype"
                            checked={tiltakTyper.includes(type as TiltakType)}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    leggTilTiltakType(type as TiltakType);
                                } else {
                                    fjernTilTiltakType(type as TiltakType);
                                }
                            }}
                        />
                    ))}
                </CheckboxGruppe>
            </Ekspanderbartpanel>

            <Ekspanderbartpanel tittel="Status" className="blokk-m" apen>
                <CheckboxGruppe>
                    {Object.keys(TiltakStatus).map(status => (
                        <Checkbox
                            key={status}
                            label={mapTiltakStatusTilTekst(status as TiltakStatus)}
                            name="filter-tiltakstatus"
                            checked={tiltakStatuser.includes(status as TiltakStatus)}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    leggTilTiltakStatus(status as TiltakStatus);
                                } else {
                                    fjernTilTiltakStatus(status as TiltakStatus);
                                }
                            }}
                        />
                    ))}
                </CheckboxGruppe>
            </ Ekspanderbartpanel>
        </div>
    )
}