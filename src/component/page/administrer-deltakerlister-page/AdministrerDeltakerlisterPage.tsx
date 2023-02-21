import { Alert, BodyShort, Heading } from '@navikt/ds-react';
import globalStyles from '../../../globals.module.scss';
import styles from './AdministrerDeltakerlisterPage.module.scss'
import React, { useMemo } from 'react';
import { isNotStartedOrPending, isRejected, usePromise } from '../../../utils/use-promise';
import { AxiosResponse } from 'axios';
import { Gjennomforing } from '../../../api/data/tiltak';
import { fetchTilgjengeligGjennomforinger, fetchTiltakGjennomforinger } from '../../../api/tiltak-api';
import { SpinnerPage } from '../../felles/spinner-page/SpinnerPage';
import { AlertPage } from '../../felles/alert-page/AlertPage';
import { OverordnetEnhetVO } from './deltakerliste.viewobjects';
import { UnderenheterPaOverenhet } from './underenheter-pa-overenhet/UnderenheterPaOverenhet';
import { Show } from '../../felles/Show';
import { deltakerlisteMapper } from './deltakerliste.mapper';


export const AdministrerDeltakerlisterPage = () => {
    const fetchGjennomforingerPromise = usePromise<AxiosResponse<Gjennomforing[]>>(
        () => fetchTiltakGjennomforinger()
    )

    const fetchTilgjengeligGjennomforingerPromise = usePromise<AxiosResponse<Gjennomforing[]>>(
        () => fetchTilgjengeligGjennomforinger()
    )

    const overornedeEnheter: OverordnetEnhetVO[] = useMemo(() => {
        const gjennomforinger: Gjennomforing[] = fetchTilgjengeligGjennomforingerPromise.result?.data || [];
        const gjennomforingIderAlleredeLagtTil = fetchGjennomforingerPromise.result?.data.map(g => g.id) || []
        return deltakerlisteMapper(gjennomforinger, gjennomforingIderAlleredeLagtTil)
    }, [fetchTilgjengeligGjennomforingerPromise.result, fetchGjennomforingerPromise.result])

    const onLeggTil = (id: string) => {
        console.log("Legg til", id);
    }

    const onFjern = (id: string) => {
        console.log("Fjern", id);
    }

    if (
        isNotStartedOrPending(fetchGjennomforingerPromise) ||
        isNotStartedOrPending(fetchTilgjengeligGjennomforingerPromise)
    ) {
        return <SpinnerPage/>
    }

    if (
        isRejected(fetchGjennomforingerPromise) ||
        isRejected(fetchTilgjengeligGjennomforingerPromise)
    ) {
        return <AlertPage variant="error" tekst="Noe gikk galt"/>
    }

    return (
        <div className={styles.page} data-testid="administrer-deltakerlister-page">

            <Heading size="large" level="2" className={globalStyles.blokkM}>Legg til og fjern deltakerlister</Heading>

            <BodyShort className={globalStyles.blokkM}>
                Hvilke deltakerlister koordinerer du? Det er viktig at du kun legger til deltakerlister som du er
                koordinator for.
            </BodyShort>

            <Show if={overornedeEnheter.length === 0}>
                <Alert variant="info">
                    På organisasjonsnummeret du har tilgang til finnes det ingen aktive deltakerlister.
                    <br/><br/>
                    Hvis du har fått en Altinn-rettighet, men fortsatt ikke ser deltakerlister her,
                    så kan det være fordi deltakerlisten du forventer å se er registrert på et annet org.nr
                    i NAVs datasytem. Ta kontakt med den i NAV som er ansvarlig for avtalen.
                </Alert>
            </Show>

            {overornedeEnheter
                .sort((a, b) => a.navn.localeCompare(b.navn))
                .map((o) => <UnderenheterPaOverenhet
                    key={o.navn}
                    overordnetEnhet={o}
                    onLeggTil={onLeggTil}
                    onFjern={onFjern}/>
                )}

        </div>
    )
}
