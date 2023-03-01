import { Alert, BodyShort, Heading, Modal } from '@navikt/ds-react'
import globalStyles from '../../../globals.module.scss'
import styles from './AdministrerDeltakerlisterPage.module.scss'
import React, { useEffect, useState } from 'react'
import { isNotStartedOrPending, isRejected, isResolved, usePromise } from '../../../utils/use-promise'
import { AxiosResponse } from 'axios'
import { Gjennomforing } from '../../../api/data/tiltak'
import {
	fetchTilgjengeligGjennomforinger,
	fetchTiltakGjennomforinger,
	fjernTilgangTilGjennomforing,
	opprettTilgangTilGjennomforing
} from '../../../api/tiltak-api'
import { ArrangorOverenhet } from './deltakerliste.viewobjects'
import { DeltakerlisterForArrangorWrapper } from './underenheter-pa-overenhet/DeltakerlisterForArrangorWrapper'
import { Show } from '../../felles/Show'
import { deltakerlisteMapper } from './deltakerliste.mapper'
import { SpinnerPage } from '../../felles/spinner-page/SpinnerPage'
import { AlertPage } from '../../felles/alert-page/AlertPage'
import { LeggTilDeltakerlisteModal } from './legg-til-deltakerliste-modal/LeggTilDeltakerlisteModal'


export const AdministrerDeltakerlisterPage = () => {
	const [arrangorer, setArrangorer] = useState<ArrangorOverenhet[]>([])
	const [deltakerlisteIderLagtTil, setDeltakerlisteIderLagtTil] = useState<string[]>([])

	const [deltakerlisteIdUpdating, setDeltakerlisteIdUpdating] = useState<string | undefined>(undefined)
	const [showLeggTilModal, setShowLeggTilModal] = useState(false)

	const fetchGjennomforingerPromise = usePromise<AxiosResponse<Gjennomforing[]>>(
		() => fetchTiltakGjennomforinger()
	)

	const fetchTilgjengeligGjennomforingerPromise = usePromise<AxiosResponse<Gjennomforing[]>>(
		() => fetchTilgjengeligGjennomforinger()
	)

	useEffect(() => {
		if (isResolved(fetchTilgjengeligGjennomforingerPromise)
			&& isResolved(fetchGjennomforingerPromise)) {

			const gjennomforinger: Gjennomforing[] = fetchTilgjengeligGjennomforingerPromise.result?.data || []
			const gjennomforingIderAlleredeLagtTil = fetchGjennomforingerPromise.result?.data.map(g => g.id) || []
			const data = deltakerlisteMapper(gjennomforinger)
				.sort((a, b) => a.navn.localeCompare(b.navn))

			setDeltakerlisteIderLagtTil(gjennomforingIderAlleredeLagtTil)
			setArrangorer(data)
		}
	}, [fetchTilgjengeligGjennomforingerPromise.result, fetchGjennomforingerPromise.result])


	const onLeggTil = (deltakerlisteId: string) => {
		Modal.setAppElement('#root')
		setDeltakerlisteIdUpdating(deltakerlisteId)
		setShowLeggTilModal(true)
	}

	const onFjern = (deltakerlisteId: string) => {
		setDeltakerlisteIdUpdating(deltakerlisteId)

		fjernTilgangTilGjennomforing(deltakerlisteId)
			.then(() => {
				setDeltakerlisteIderLagtTil([...deltakerlisteIderLagtTil.filter((i) => i !== deltakerlisteId)])
				setDeltakerlisteIdUpdating(undefined)
			})
	}

	const leggTilConfirmed = (id: string) => {
		opprettTilgangTilGjennomforing(id)
			.then(() => {
				setDeltakerlisteIderLagtTil([...deltakerlisteIderLagtTil, id])
				setDeltakerlisteIdUpdating(undefined)
			})

		setShowLeggTilModal(false)
	}

	const onLeggTilModalClosed = () => {
		setShowLeggTilModal(false)
		setDeltakerlisteIdUpdating(undefined)
	}

	const getNavnPaGjennomforing = (gjennomforingId: string | undefined): string => {
		if (gjennomforingId === undefined) return ''

		const gjennomforing = fetchTilgjengeligGjennomforingerPromise.result?.data.find((g) => g.id === gjennomforingId)

		return gjennomforing != undefined
			? gjennomforing.navn
			: ''
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
				deltakerlisteNavn={getNavnPaGjennomforing(deltakerlisteIdUpdating)}
				deltakerlisteId={deltakerlisteIdUpdating as string}
				onConfirm={leggTilConfirmed}
				onClose={onLeggTilModalClosed}
			/>

		</div>
	)
}
