import React, { useState } from 'react';
import { TiltakinstansListe } from './tiltakinstans-liste/TiltakinstansListe';
import styles from './TiltakinstansOversiktPage.module.less';
import { fetchTiltakInstanser } from '../../../api';
import { TiltakInstansDto } from '../../../api/data/tiltak';
import { Spinner } from '../../felles/spinner/Spinner';
import { TiltaksvariantFilter } from './TiltaksvariantFilter';
import { finnUnikeTiltak } from '../../../utils/tiltak-utils';
import { isNotStartedOrPending, isRejected, usePromise } from '../../../utils/use-promise';
import { AxiosResponse } from 'axios';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';

export const TiltakinstansOversiktPage = () => {
    const fetchTiltakInstanserPromise = usePromise<AxiosResponse<TiltakInstansDto[]>>(
        () => fetchTiltakInstanser('TODO')
    );

    const [valgteTiltakTyper, setValgteTiltakTyper] = useState<string[]>([]);

    if (isNotStartedOrPending(fetchTiltakInstanserPromise)) {
        return <Spinner/>;
    }

    if (isRejected(fetchTiltakInstanserPromise)) {
        return <AlertStripeFeil>Noe gikk galt</AlertStripeFeil>;
    }

    const alleTiltakInstanser = fetchTiltakInstanserPromise.result.data;

    const filtrerteTiltak = valgteTiltakTyper.length > 0
        ? alleTiltakInstanser.filter(tiltakInstans => valgteTiltakTyper.includes(tiltakInstans.tiltak.tiltakskode))
        : alleTiltakInstanser;

    const tiltakValg = finnUnikeTiltak(alleTiltakInstanser)
        .map(tiltak => ({ type: tiltak.tiltakskode, navn: tiltak.tiltaksnavn }));

    const handleOnTiltakValgtChanged = (valgteTyper: string[]) => {
        setValgteTiltakTyper(valgteTyper);
    };

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
