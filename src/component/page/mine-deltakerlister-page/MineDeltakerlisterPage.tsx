import { Add } from '@navikt/ds-icons'
import { AxiosResponse } from 'axios'
import React, { useEffect } from 'react'

import { fetchDeltakeroversikt } from '../../../api/tiltak-api'
import { useTabTitle } from '../../../hooks/use-tab-title'
import {
	LEGG_TIL_DELTAKERLISTE_PAGE_ROUTE
} from '../../../navigation'
import { useTilbakelenkeStore } from '../../../store/tilbakelenke-store'
import { isNotStartedOrPending, isRejected, isResolved, usePromise } from '../../../utils/use-promise'
import { AlertPage } from '../../felles/alert-page/AlertPage'
import { IkonLenke } from '../../felles/ikon-lenke/IkonLenke'
import { SpinnerPage } from '../../felles/spinner-page/SpinnerPage'
import styles from './MineDeltakerlisterPage.module.scss'
import { Alert, BodyShort, Link } from '@navikt/ds-react'
import { MineDeltakerlister } from '../../../api/data/deltaker'
import { DeltakerListe } from './mine-deltakerlister/DeltakerListe'
import { MineDeltakerePanel } from './mine-deltakere/MineDeltakerePanel'
import toggle from '../../../utils/toggle'
import globalStyles from '../../../globals.module.scss'
import { useInnloggetBrukerStore } from '../../../store/innlogget-bruker-store'
import { isVeileder } from '../../../utils/rolle-utils'
import { useKoordinatorsDeltakerlisterStore } from '../../../store/koordinators-deltakerlister-store'

export const MineDeltakerlisterPage = (): React.ReactElement => {
	const { setTilbakeTilUrl } = useTilbakelenkeStore()
	const { roller } = useInnloggetBrukerStore()
	const { setKoordinatorsDeltakerlister } = useKoordinatorsDeltakerlisterStore()

	useTabTitle('Deltakeroversikt')

	const fetchMineDeltakerlisterPromise = usePromise<AxiosResponse<MineDeltakerlister>>(
		() => fetchDeltakeroversikt()
	)

	useEffect(() => {
		setTilbakeTilUrl(null)
		if (isResolved(fetchMineDeltakerlisterPromise) && fetchMineDeltakerlisterPromise.result.data.koordinatorFor) {
			setKoordinatorsDeltakerlister(fetchMineDeltakerlisterPromise.result.data.koordinatorFor.deltakerlister.map(l => l.id))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ fetchMineDeltakerlisterPromise.result ])

	if (isNotStartedOrPending(fetchMineDeltakerlisterPromise)) {
		return <SpinnerPage />
	}

	if (isRejected(fetchMineDeltakerlisterPromise)) {
		return <AlertPage variant="error" tekst="Noe gikk galt" />
	}
	
	const mineDeltakerlister = fetchMineDeltakerlisterPromise.result.data

	if (mineDeltakerlister.koordinatorFor) {
		return (
			<div className={styles.page} data-testid="gjennomforing-oversikt-page">
				{ toggle.veilederEnabled && isVeileder(roller) && mineDeltakerlister.veilederFor && <MineDeltakerePanel veileder={mineDeltakerlister.veilederFor}/> }
				<DeltakerListe deltakerliste={mineDeltakerlister.koordinatorFor.deltakerlister}/>

				<IkonLenke
					to={LEGG_TIL_DELTAKERLISTE_PAGE_ROUTE}
					className={styles.leggTilDeltakerlisteWrapper}
					ikon={<Add/>}
					text="Legg til deltakerliste"
				/>

				<Link href="https://www.nav.no/samarbeidspartner/deltakeroversikt" className={styles.informasjonLenkeWrapper}>
					<BodyShort>Info om deltakeroversikten</BodyShort>
				</Link>
			</div>
		)
	} else {
		return <Alert variant="info" className={globalStyles.blokkM}>For å se deltakere må du legge til en deltakerliste.</Alert>
	}
}
