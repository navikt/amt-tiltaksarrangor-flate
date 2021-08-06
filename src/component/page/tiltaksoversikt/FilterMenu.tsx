import React from 'react';

import { Checkbox, CheckboxGruppe, Input } from 'nav-frontend-skjema';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';

export const FilterMenu = () => {
    return (
        <div>
            <Input placeholder="Søk etter navn eller fnr" className="blokk-m"/>

            <Ekspanderbartpanel tittel="Tiltakstype" className="blokk-m" apen>
                <CheckboxGruppe>
                    {['Jobbsøkerkurs', 'Avklaring', 'Gruppe AMO', 'Oppfølging'].map(tiltakstype => (
                        <Checkbox
                            key={tiltakstype}
                            label={tiltakstype}
                            name="filter-tiltakstype"
                            checked={false}
                            onChange={() => {}}
                        />
                    ))}
                </CheckboxGruppe>
            </Ekspanderbartpanel>

            <Ekspanderbartpanel tittel="Status" className="blokk-m" apen>
                <CheckboxGruppe>
                    {['Ny bruker', 'Påmeldt', 'Gjennomføres'].map(status => (
                        <Checkbox
                            key={status}
                            label={status}
                            name="filter-tiltakstatus"
                            checked={false}
                            onChange={() => {}}
                        />
                    ))}
                </CheckboxGruppe>
            </ Ekspanderbartpanel>
        </div>
    )
}