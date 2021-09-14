import React, { useEffect, useState } from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Checkbox, CheckboxGruppe } from 'nav-frontend-skjema';
import { TiltakType } from '../../../api/data/bruker';
import { mapTiltakTypeTilTekst } from '../../../utils/text-mappers';
import { TiltakinstansListe } from './tiltakinstans-liste/TiltakinstansListe';
import globalStyles from '../../../globals.module.less';
import styles from './TiltakinstansOversiktPage.module.less';
import { fetchTiltak } from '../../../api';
import { Tiltak } from '../../../api/data/tiltak';
import { Spinner } from '../../felles/spinner/Spinner';

export const TiltakinstansOversiktPage = () => {
    const [tiltak, setTiltak] = useState<Tiltak[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchTiltak()
            .then(res => setTiltak(res.data))
            .catch(console.error) // TODO: vis feil i alertstripe
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) {
        return <Spinner/>;
    }

    return (
        <main className={styles.page}>
            <section>
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
            </section>

            <TiltakinstansListe tiltak={tiltak}/>
        </main>
    )
}
