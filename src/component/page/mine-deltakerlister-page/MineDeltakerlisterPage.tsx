import { PlusIcon } from '@navikt/aksel-icons'
import React, { useEffect } from 'react'

import { useTabTitle } from '../../../hooks/use-tab-title'
import { LEGG_TIL_DELTAKERLISTE_PAGE_ROUTE } from '../../../navigation'
import { useTilbakelenkeStore } from '../../../store/tilbakelenke-store'
import { AlertPage } from '../../felles/alert-page/AlertPage'
import { IkonLenke } from '../../felles/ikon-lenke/IkonLenke'
import styles from './MineDeltakerlisterPage.module.scss'
import { Alert, BodyShort, Link } from '@navikt/ds-react'
import { DeltakerListe } from './mine-deltakerlister/DeltakerListe'
import { MineDeltakerePanel } from './mine-deltakere/MineDeltakerePanel'
import globalStyles from '../../../globals.module.scss'
import { useInnloggetBrukerStore } from '../../../store/innlogget-bruker-store'
import { isVeileder } from '../../../utils/rolle-utils'
import { useKoordinatorsDeltakerlisterStore } from '../../../store/koordinators-deltakerlister-store'
import { isNotStartedOrPending, isRejected } from '../../../utils/use-promise'
import { SpinnerPage } from '../../felles/spinner-page/SpinnerPage'

export const MineDeltakerlisterPage = (): React.ReactElement => {
  const { setTilbakeTilUrl } = useTilbakelenkeStore()
  const { roller } = useInnloggetBrukerStore()
  const { koordinatorsDeltakerlister, fetchMineDeltakerlisterPromise } =
    useKoordinatorsDeltakerlisterStore()

  useTabTitle('Deltakeroversikt')

  useEffect(() => {
    setTilbakeTilUrl(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isRejected(fetchMineDeltakerlisterPromise)) {
    return <AlertPage variant="error" tekst="Noe gikk galt" />
  }
  if (isNotStartedOrPending(fetchMineDeltakerlisterPromise)) {
    return <SpinnerPage />
  }

  if (koordinatorsDeltakerlister && koordinatorsDeltakerlister.koordinatorFor) {
    return (
      <div className={styles.page} data-testid="gjennomforing-oversikt-page">
        {isVeileder(roller) && koordinatorsDeltakerlister.veilederFor && (
          <MineDeltakerePanel
            veileder={koordinatorsDeltakerlister.veilederFor}
          />
        )}
        <DeltakerListe
          deltakerliste={
            koordinatorsDeltakerlister.koordinatorFor.deltakerlister
          }
        />

        <IkonLenke
          to={LEGG_TIL_DELTAKERLISTE_PAGE_ROUTE}
          className={styles.leggTilDeltakerlisteWrapper}
          ikon={<PlusIcon />}
          text="Legg til deltakerliste"
        />

        <Link
          href="https://www.nav.no/samarbeidspartner/deltakeroversikt"
          className={styles.informasjonLenkeWrapper}
        >
          <BodyShort>Info om deltakeroversikten</BodyShort>
        </Link>
      </div>
    )
  } else {
    return (
      <Alert variant="info" className={globalStyles.blokkM}>
        For å se deltakere må du legge til en deltakerliste.
      </Alert>
    )
  }
}
