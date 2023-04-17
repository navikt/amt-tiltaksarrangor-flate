import { Alert, BodyShort, Heading, Modal } from '@navikt/ds-react'
import globalStyles from '../../../globals.module.scss'
import styles from './AdministrerDeltakerlisterPage.module.scss'
import React, { useEffect, useState } from 'react'
import { isNotStartedOrPending, isRejected, usePromise } from '../../../utils/use-promise'
import { AxiosResponse } from 'axios'
import { AdminDeltakerliste } from '../../../api/data/tiltak'
import {
	fetchAlleDeltakerlister,
	fjernDeltakerliste,
	leggTilDeltakerliste
} from '../../../api/tiltak-api'
import { ArrangorOverenhet } from './deltakerliste.viewobjects'
import { DeltakerlisterForArrangorWrapper } from './underenheter-pa-overenhet/DeltakerlisterForArrangorWrapper'
import { Show } from '../../felles/Show'
import { deltakerlisteMapper } from './deltakerliste.mapper'
import { SpinnerPage } from '../../felles/spinner-page/SpinnerPage'
import { AlertPage } from '../../felles/alert-page/AlertPage'
import { LeggTilDeltakerlisteModal } from './legg-til-deltakerliste-modal/LeggTilDeltakerlisteModal'
import { useTilbakelenkeStore } from '../../../store/tilbakelenke-store'
import { MINE_DELTAKERLISTER_PAGE_ROUTE } from '../../../navigation'
import { useTabTitle } from '../../../hooks/use-tab-title'
import { useKoordinatorsDeltakerlisterStore } from '../../../store/koordinators-deltakerlister-store'


export const AdministrerDeltakerlisterPage = () => {
	const { setTilbakeTilUrl } = useTilbakelenkeStore()
	const { koordinatorsDeltakerlister, setKoordinatorsDeltakerlister } = useKoordinatorsDeltakerlisterStore()

	const [ arrangorer, setArrangorer ] = useState<ArrangorOverenhet[]>([])
	const [ deltakerlisteIderLagtTil, setDeltakerlisteIderLagtTil ] = useState<string[]>([])

	const [ deltakerlisteIdUpdating, setDeltakerlisteIdUpdating ] = useState<string | undefined>(undefined)
	const [ showLeggTilModal, setShowLeggTilModal ] = useState(false)
	
	const fetchAlleDeltakerlisterPromise = usePromise<AxiosResponse<AdminDeltakerliste[]>>(fetchAlleDeltakerlister)

	useTabTitle('Legg til og fjern deltakerlister')

	useEffect(() => {
		setTilbakeTilUrl(MINE_DELTAKERLISTER_PAGE_ROUTE)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		const alleDeltakerlister: AdminDeltakerliste[] = fetchAlleDeltakerlisterPromise.result?.data || []
		const deltakerlisteIderAlleredeLagtTil = fetchAlleDeltakerlisterPromise.result?.data.filter(dl => dl.lagtTil).map(d => d.id) || []
		const data = deltakerlisteMapper(alleDeltakerlister)
			.sort((a, b) => a.navn.localeCompare(b.navn))

		setDeltakerlisteIderLagtTil(deltakerlisteIderAlleredeLagtTil)
		setArrangorer(data)
	}, [ fetchAlleDeltakerlisterPromise.result ])


	const onLeggTil = (deltakerlisteId: string) => {
		Modal.setAppElement('#root')
		setDeltakerlisteIdUpdating(deltakerlisteId)
		setShowLeggTilModal(true)
	}

	const onFjern = (deltakerlisteId: string) => {
		setDeltakerlisteIdUpdating(deltakerlisteId)

		fjernDeltakerliste(deltakerlisteId)
			.then(() => {
				setDeltakerlisteIderLagtTil([ ...deltakerlisteIderLagtTil.filter((i) => i !== deltakerlisteId) ])
				setDeltakerlisteIdUpdating(undefined)
				if (koordinatorsDeltakerlister && koordinatorsDeltakerlister.koordinatorFor != null) {
					const nyDeltakerliste = [ ...koordinatorsDeltakerlister.koordinatorFor.deltakerlister ].filter(l => l.id != deltakerlisteId)
					const nyKoordinatorsDeltakerlister = {
						...koordinatorsDeltakerlister,
						koordinatorFor: { ...koordinatorsDeltakerlister.koordinatorFor, deltakerlister: nyDeltakerliste }
					}
					setKoordinatorsDeltakerlister(nyKoordinatorsDeltakerlister)
				}
			})
	}

	const leggTilConfirmed = (id: string, navn: string, type: string) => {
		leggTilDeltakerliste(id)
			.then(() => {
				setDeltakerlisteIderLagtTil([ ...deltakerlisteIderLagtTil, id ])
				setDeltakerlisteIdUpdating(undefined)
				if (koordinatorsDeltakerlister && koordinatorsDeltakerlister.koordinatorFor != null) {
					const nyDeltakerliste = [ ...koordinatorsDeltakerlister.koordinatorFor.deltakerlister ]
					nyDeltakerliste.push({ id: id, type: type, navn: navn })
					const nyKoordinatorsDeltakerlister = {
						...koordinatorsDeltakerlister,
						koordinatorFor: { ...koordinatorsDeltakerlister.koordinatorFor, deltakerlister: nyDeltakerliste }
					}
					setKoordinatorsDeltakerlister(nyKoordinatorsDeltakerlister)
				}
			})

		setShowLeggTilModal(false)
	}

	const onLeggTilModalClosed = () => {
		setShowLeggTilModal(false)
		setDeltakerlisteIdUpdating(undefined)
	}

	const getNavnPaDeltakerliste = (deltakerlisteId: string | undefined): string => {
		if (deltakerlisteId === undefined) return ''

		const deltakerliste = fetchAlleDeltakerlisterPromise.result?.data.find((g) => g.id === deltakerlisteId)

		return deltakerliste != undefined
			? deltakerliste.navn
			: ''
	}

	const getTiltaksnavnForDeltakerliste = (deltakerlisteId: string | undefined): string => {
		if (deltakerlisteId === undefined) return ''

		const deltakerliste = fetchAlleDeltakerlisterPromise.result?.data.find((g) => g.id === deltakerlisteId)

		return deltakerliste != undefined
			? deltakerliste.tiltaksnavn
			: ''
	}

	if (isNotStartedOrPending(fetchAlleDeltakerlisterPromise)) {
		return <SpinnerPage/>
	}

	if (isRejected(fetchAlleDeltakerlisterPromise)) {
		return <AlertPage variant="error" tekst="Noe gikk galt"/>
	}

	return (
		<div className={styles.page} data-testid="administrer-deltakerlister-page">

			<Heading size="large" level="2" className={globalStyles.blokkM}>Legg til og fjern deltakerlister</Heading>

			<BodyShort className={globalStyles.blokkM}>
				Hvilke deltakerlister koordinerer du? Det er viktig at du kun legger til deltakerlister som du er
				koordinator for.
			</BodyShort>

			<Show if={arrangorer.length === 0}>
				<Alert variant="info">
					På organisasjonsnummeret du har tilgang til finnes det ingen aktive deltakerlister.
					<br/><br/>
					Hvis du har fått en Altinn-rettighet, men fortsatt ikke ser deltakerlister her,
					så kan det være fordi deltakerlisten du forventer å se er registrert på et annet org.nr
					i NAVs datasytem. Ta kontakt med den i NAV som er ansvarlig for avtalen.
				</Alert>
			</Show>

			{arrangorer
				.map((o) => <DeltakerlisterForArrangorWrapper
					key={o.navn}
					overskrift={o.navn}
					arrangorer={o.arrangorer}
					deltakerlisterLagtTil={deltakerlisteIderLagtTil}
					deltakerlisteIdLoading={deltakerlisteIdUpdating}
					onLeggTil={onLeggTil}
					onFjern={onFjern}/>
				)}

			<LeggTilDeltakerlisteModal
				open={showLeggTilModal}
				deltakerlisteNavn={getNavnPaDeltakerliste(deltakerlisteIdUpdating)}
				deltakerlisteTiltaksnavn={getTiltaksnavnForDeltakerliste(deltakerlisteIdUpdating)}
				deltakerlisteId={deltakerlisteIdUpdating as string}
				onConfirm={leggTilConfirmed}
				onClose={onLeggTilModalClosed}
			/>

		</div>
	)
}
