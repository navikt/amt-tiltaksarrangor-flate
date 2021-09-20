import React, { useEffect, useState } from 'react';
import { TiltakinstansListe } from './tiltakinstans-liste/TiltakinstansListe';
import styles from './TiltakinstansOversiktPage.module.less';
import { fetchTiltakInstanser } from '../../../api';
import { TiltakInstansDto } from '../../../api/data/tiltak';
import { Spinner } from '../../felles/spinner/Spinner';
import { TiltaksvariantFilter } from './TiltaksvariantFilter';
import { finnUnikeTiltak } from '../../../utils/tiltak-utils';

export const TiltakinstansOversiktPage = () => {
    const [alleTiltakInstanser, setAlleTiltakInstanser] = useState<TiltakInstansDto[]>([]);
    const [valgteTiltakTyper, setValgteTiltakTyper] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const filtrerteTiltak = valgteTiltakTyper.length > 0
        ? alleTiltakInstanser.filter(tiltakInstans => valgteTiltakTyper.includes(tiltakInstans.tiltak.tiltakskode))
        : alleTiltakInstanser;

    const tiltakValg = finnUnikeTiltak(alleTiltakInstanser)
        .map(tiltak => ({ type: tiltak.tiltakskode, navn: tiltak.tiltaksnavn }));

    useEffect(() => {
        fetchTiltakInstanser('TODO')
            .then(res => setAlleTiltakInstanser(res.data))
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
                <TiltakinstansListe tiltakInstanser={filtrerteTiltak}/>
            </section>
        </main>
    )
}
