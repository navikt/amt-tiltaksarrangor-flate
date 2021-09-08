import styles from './TiltakinstansOversiktPage.module.less';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import globalStyles from '../../../globals.module.less';
import { Checkbox, CheckboxGruppe } from 'nav-frontend-skjema';
import { TiltakType } from '../../../api/data/bruker';
import { mapTiltakTypeTilTekst } from '../../../utils/text-mappers';
import { TiltakinstansOversiktPanel } from './tiltakinstans-oversikt-panel';

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

            <ul> {/* Tiltaksoversikt */}
                <li> {/*  */}
                    <h1>Jobbklubb</h1>
                    <ul> {/* */}
                        <li><TiltakinstansOversiktPanel id={"1"} navn={"Jobbklubb"} oppstart={new Date()}/></li>
                        <li><TiltakinstansOversiktPanel id={"2"} navn={"Jobbklubb"} deltakere={2}/></li>
                        <li><TiltakinstansOversiktPanel id={"3"} navn={"Tiltak 3"} oppstart={new Date()} deltakere={2}/></li>
                    </ul>
                </li>
                <li>
                    <h1>Avklaring</h1>
                    <ul>
                        <li><TiltakinstansOversiktPanel id={"1"} navn={"Jobbklubb"} oppstart={new Date()}/></li>
                        <li><TiltakinstansOversiktPanel id={"2"} navn={"Jobbklubb"} deltakere={2}/></li>
                        <li><TiltakinstansOversiktPanel id={"3"} navn={"Tiltak 3"} oppstart={new Date()} deltakere={2}/></li>
                    </ul>
                </li>
            </ul>
        </main>
    )
}
