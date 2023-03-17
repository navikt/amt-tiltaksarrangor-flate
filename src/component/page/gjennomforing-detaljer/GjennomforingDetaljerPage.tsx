import { Heading } from '@navikt/ds-react'
import { AxiosResponse } from 'axios'
import React, { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import {
	KoordinatorDeltakerFilterStore,
	useKoordinatorDeltakerFilterStore
} from './store/koordinator-deltaker-filter-store'
import { TiltakDeltaker } from '../../../api/data/deltaker'
import { Gjennomforing } from '../../../api/data/tiltak'
import { fetchDeltakerePaTiltakGjennomforing, fetchTiltakGjennomforing } from '../../../api/tiltak-api'
import globalStyles from '../../../globals.module.scss'
import { useTabTitle } from '../../../hooks/use-tab-title'
import { GJENNOMFORING_LISTE_PAGE_ROUTE } from '../../../navigation'
import { useTilbakelenkeStore } from '../../../store/tilbakelenke-store'
import { getAntallDeltakerePerStatus } from '../../../utils/deltaker-status-utils'
import { isNotFound, isNotStartedOrPending, isRejected, usePromise } from '../../../utils/use-promise'
import { AlertPage } from '../../felles/alert-page/AlertPage'
import { SpinnerPage } from '../../felles/spinner-page/SpinnerPage'
import { DeltakerOversiktTabell } from './deltaker-oversikt/DeltakerOversiktTabell'
import { FilterMenyStatus } from './FilterMenyStatus'
import styles from './GjennomforingDetaljerPage.module.scss'
import { KoordinatorInfo } from './KoordinatorInfo'
import { TiltakInfo } from './TiltakInfo'
import { TableFilter } from '../../felles/filter/TableFilter'
import { nameString } from '../../../utils/name-utls'

export const GjennomforingDetaljerPage = (): React.ReactElement => {
	const { setTilbakeTilUrl } = useTilbakelenkeStore()
	const params = useParams<{ gjennomforingId: string }>()
	const gjennomforingId = params.gjennomforingId || ''

	const { veilederFilter, leggTilVeileder, fjernVeileder } = useKoordinatorDeltakerFilterStore()


	useEffect(() => {
		setTilbakeTilUrl(GJENNOMFORING_LISTE_PAGE_ROUTE)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useTabTitle('Deltakerliste')

	const fetchDeltakerePaGjennomforingPromise = usePromise<AxiosResponse<TiltakDeltaker[]>>(
		() => fetchDeltakerePaTiltakGjennomforing(gjennomforingId), [ gjennomforingId ]
	)

	const fetchGjennomforingPromise = usePromise<AxiosResponse<Gjennomforing>>(
		() => fetchTiltakGjennomforing(gjennomforingId), [ gjennomforingId ]
	)

	if (
		isNotStartedOrPending(fetchDeltakerePaGjennomforingPromise)
		|| isNotStartedOrPending(fetchGjennomforingPromise)
	) {
		return <SpinnerPage/>
	}

	if (
		isRejected(fetchDeltakerePaGjennomforingPromise)
		|| isRejected(fetchGjennomforingPromise)
	) {

		if (isNotFound(fetchGjennomforingPromise)) {
			return <Navigate replace to={GJENNOMFORING_LISTE_PAGE_ROUTE}/>
		}

		return <AlertPage variant="error" tekst="Noe gikk galt"/>
	}

	const deltakere = fetchDeltakerePaGjennomforingPromise.result.data

	const gjennomforing = fetchGjennomforingPromise.result.data

	const deltakerePerStatus = getAntallDeltakerePerStatus(deltakere)

	const deltakerePerVeileder = (): Map<string, number> => {
		const map = new Map<string, number>()
		map.set('Uten Veileder', 0)

		deltakere.forEach((deltaker) => {
			const veileder = deltaker.aktiveVeiledere.filter((t) => !t.erMedveileder)[0]
			if(veileder === undefined) {
				const entry = map.get('Uten Veileder')
				map.set('Uten Veileder', entry ? entry + 1 : 1)
			} else {
				const veilederNavn = nameString(veileder.fornavn, veileder.mellomnavn, veileder.etternavn)

				const entry = map.get(veilederNavn)
				map.set(veilederNavn, entry ? entry + 1 : 1)
			}
		})
		return map
	}

	return (
		<KoordinatorDeltakerFilterStore>
			<div className={styles.gjennomforingDetaljer} data-testid="gjennomforing-detaljer-page">
				<section className={styles.infoSection}>
					<Heading size="small" level="2" className={globalStyles.blokkXs}>{gjennomforing.navn}</Heading>
					<TiltakInfo gjennomforing={gjennomforing} className={globalStyles.blokkXs}/>
					<KoordinatorInfo gjennomforingId={gjennomforing.id}/>
					<FilterMenyStatus statusMap={deltakerePerStatus} className={globalStyles.blokkXs}/>
					<TableFilter
						navn="Veileder"
						dataMap={deltakerePerVeileder()}
						className={globalStyles.blokkXs}
						filter={veilederFilter}
						addFilter={leggTilVeileder}
						removeFilter={fjernVeileder}/>
				</section>

				<DeltakerOversiktTabell deltakere={deltakere}/>
			</div>
		</KoordinatorDeltakerFilterStore>

	)
}
