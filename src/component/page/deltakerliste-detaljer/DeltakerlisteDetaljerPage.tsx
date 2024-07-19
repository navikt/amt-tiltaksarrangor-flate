import { Heading } from '@navikt/ds-react'
import { AxiosResponse } from 'axios'
import React, { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import { fetchKoordinatorsDeltakerliste } from '../../../api/tiltak-api'
import globalStyles from '../../../globals.module.scss'
import { useTabTitle } from '../../../hooks/use-tab-title'
import { MINE_DELTAKERLISTER_PAGE_ROUTE } from '../../../navigation'
import { useTilbakelenkeStore } from '../../../store/tilbakelenke-store'
import {
  isNotFound,
  isNotStartedOrPending,
  isRejected,
  usePromise
} from '../../../utils/use-promise'
import { AlertPage } from '../../felles/alert-page/AlertPage'
import { SpinnerPage } from '../../felles/spinner-page/SpinnerPage'
import { DeltakerOversiktTabell } from './deltaker-oversikt/DeltakerOversiktTabell'
import styles from './DeltakerlisteDetaljerPage.module.scss'
import { KoordinatorInfo } from './KoordinatorInfo'
import { TiltakInfo } from './TiltakInfo'
import { KoordinatorsDeltakerliste } from '../../../api/data/deltaker'
import { FilterMenyDeltakerListeDetaljer } from './filter-meny/FilterMenyDeltakerListeDetaljer'

export const DeltakerlisteDetaljerPage = (): React.ReactElement => {
  const { setTilbakeTilUrl } = useTilbakelenkeStore()
  const params = useParams<{ deltakerlisteId: string }>()
  const deltakerlisteId = params.deltakerlisteId || ''

  useEffect(() => {
    setTilbakeTilUrl(MINE_DELTAKERLISTER_PAGE_ROUTE)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useTabTitle('Deltakerliste')

  const fetchKoordinatorsDeltakerlistePromise = usePromise<
    AxiosResponse<KoordinatorsDeltakerliste>
  >(() => fetchKoordinatorsDeltakerliste(deltakerlisteId), [deltakerlisteId])

  if (isNotStartedOrPending(fetchKoordinatorsDeltakerlistePromise)) {
    return <SpinnerPage />
  }

  if (isRejected(fetchKoordinatorsDeltakerlistePromise)) {
    if (isNotFound(fetchKoordinatorsDeltakerlistePromise)) {
      return <Navigate replace to={MINE_DELTAKERLISTER_PAGE_ROUTE} />
    }

    return <AlertPage variant="error" tekst="Noe gikk galt" />
  }

  const deltakerliste = fetchKoordinatorsDeltakerlistePromise.result.data

  return (
    <div
      className={styles.deltakerlisteDetaljer}
      data-testid="gjennomforing-detaljer-page"
    >
      <section className={styles.infoSection}>
        <Heading size="small" level="2" className={globalStyles.blokkXs}>
          {deltakerliste.navn}
        </Heading>
        <TiltakInfo
          deltakerliste={deltakerliste}
          className={globalStyles.blokkXs}
        />
        <KoordinatorInfo koordinatorer={deltakerliste.koordinatorer} />
        <FilterMenyDeltakerListeDetaljer deltakerliste={deltakerliste} />
      </section>
      <DeltakerOversiktTabell deltakere={deltakerliste.deltakere} />
    </div>
  )
}
