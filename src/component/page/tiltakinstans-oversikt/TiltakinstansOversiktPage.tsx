import React, { useEffect, useState } from 'react';
import { TiltakinstansListe } from './tiltakinstans-liste/TiltakinstansListe';
import styles from './TiltakinstansOversiktPage.module.less';
import { fetchTiltak } from '../../../api';
import { Tiltak } from '../../../api/data/tiltak';
import { Spinner } from '../../felles/spinner/Spinner';
import { TiltaksvariantFilter } from './TiltaksvariantFilter';

export const TiltakinstansOversiktPage = () => {
    const [alleTiltak, setAlleTiltak] = useState<Tiltak[]>([]);
    const [valgteTiltakTyper, setValgteTiltakTyper] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const filtrerteTiltak = valgteTiltakTyper.length > 0
        ? alleTiltak.filter(tiltak => valgteTiltakTyper.includes(tiltak.type))
        : alleTiltak;

    const tiltakValg = alleTiltak.map(tiltak => ({ type: tiltak.type, navn: tiltak.typeNavn }))

    useEffect(() => {
        fetchTiltak()
            .then(res => setAlleTiltak(res.data))
            .catch(console.error) // TODO: vis feil i alertstripe
            .finally(() => setIsLoading(false));
    }, []);

    const handleOnTiltakValgtChanged = (valgteTyper: string[]) => {
        setValgteTiltakTyper(valgteTyper);
    };

    if (isLoading) {
        return <Spinner/>;
    }

    return (
        <main className={styles.page}>
            <section>
                <TiltaksvariantFilter
                    tiltakValg={tiltakValg}
                    valgteTyper={valgteTiltakTyper}
                    onTiltakValgtChanged={handleOnTiltakValgtChanged}
                />
            </section>

            <section>
                <TiltakinstansListe tiltak={filtrerteTiltak}/>
            </section>
        </main>
    )
}
