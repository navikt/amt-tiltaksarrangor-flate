import react from 'react';
import styles from './TiltakinstansOversiktPage.module.less';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import globalStyles from '../../../globals.module.less';
import { Checkbox, CheckboxGruppe } from 'nav-frontend-skjema';
import { TiltakType } from '../../../api/data/bruker';
import { mapTiltakTypeTilTekst } from '../../../utils/text-mappers';

export const TiltakinstansOversiktPage = () => {
    return (
        <main className={styles.page}>
            <Ekspanderbartpanel tittel="Tiltaksvarianter" className={globalStyles.blokkM} apen>
                <CheckboxGruppe>
                    {Object.values(TiltakType).map((type) => (
                        <Checkbox
                            key={type}
                            label={mapTiltakTypeTilTekst(type)}
                            name="filter-tiltakstype"
                            checked={false}

                        />
                    ))}
                </CheckboxGruppe>
            </Ekspanderbartpanel>
        </main>
    )
}