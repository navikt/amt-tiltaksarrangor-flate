import React, { useEffect } from 'react'
import { useTabTitle } from '../../../hooks/use-tab-title'
import { fetchMineDeltakere } from '../../../api/tiltak-api'
import {
  isNotStartedOrPending,
  isRejected,
  usePromise
} from '../../../utils/use-promise'
import { AxiosResponse } from 'axios'
import { VeiledersDeltaker } from '../../../api/data/deltaker'
import { SpinnerPage } from '../../felles/spinner-page/SpinnerPage'
import { AlertPage } from '../../felles/alert-page/AlertPage'
import styles from './MineDeltakerePage.module.scss'
import { MineDeltakereTabell } from './MineDeltakereTabell'
import { Detail, Heading } from '@navikt/ds-react'
import globalStyles from '../../../globals.module.scss'
import { useStyle } from '../../../utils/use-style'
import { useTilbakelenkeContext } from '../../../store/TilbakelenkeContextProvider'
import { MINE_DELTAKERLISTER_PAGE_ROUTE } from '../../../navigation'
import { useInnloggetBrukerContext } from '../../../store/InnloggetBrukerContextProvider'
import { isKoordinatorAndVeileder } from '../../../utils/rolle-utils'
import { FilterMenyStatus } from './filter-meny/FilterMenyStatus'
import { FilterMenyVeilederType } from './filter-meny/FilterMenyVeilederType'
import { FilterMenyDeltakerliste } from './filter-meny/FilterMenyDeltakerliste'
import { FilterMenyChips } from './filter-meny/FilterMenyChips'
import { FilterMenyHendelser } from './filter-meny/FilterMenyHendelser'

export const MineDeltakerePage = (): React.ReactElement => {
  const { setTilbakeTilUrl } = useTilbakelenkeContext()
  const { roller } = useInnloggetBrukerContext()

  useTabTitle('Mine deltakere')

  useStyle(globalStyles.whiteBackground, 'html')

  useEffect(() => {
    if (isKoordinatorAndVeileder(roller)) {
      setTilbakeTilUrl(MINE_DELTAKERLISTER_PAGE_ROUTE)
    } else {
      setTilbakeTilUrl(null)
    }
  }, [roller])

  const fetchMineDeltakerePromise = usePromise<
    AxiosResponse<VeiledersDeltaker[]>
  >(() => fetchMineDeltakere())

  if (isNotStartedOrPending(fetchMineDeltakerePromise)) {
    return <SpinnerPage />
  }

  if (isRejected(fetchMineDeltakerePromise)) {
    return <AlertPage variant="error" tekst="Noe gikk galt" />
  }

  const mineDeltakere = fetchMineDeltakerePromise.result.data

  const showDeltakerlisteFilter =
    mineDeltakere
      .map((deltaker) => deltaker.deltakerliste.id)
      .filter((item, i, ar) => ar.indexOf(item) === i).length > 1

  return (
    <div
      className={styles.deltakerlisteVeileder}
      data-testid="deltakerliste-veileder-page"
    >
      <section className={styles.infoSection}>
        <Detail>
          <b>Veileder:</b>
        </Detail>
        <Heading size="medium" level="2" className={globalStyles.blokkXs}>
          Mine deltakere
        </Heading>

        <Heading
          size="small"
          level="3"
          className={globalStyles.screenReaderOnly}
        >
          Filtrer mine deltakere liste
        </Heading>
        <FilterMenyChips />

        <FilterMenyStatus deltakere={mineDeltakere} />
        <FilterMenyHendelser deltakere={mineDeltakere} />
        {showDeltakerlisteFilter && (
          <FilterMenyDeltakerliste deltakere={mineDeltakere} />
        )}
        <FilterMenyVeilederType deltakere={mineDeltakere} />
      </section>
      <MineDeltakereTabell mineDeltakere={mineDeltakere} />
    </div>
  )
}
