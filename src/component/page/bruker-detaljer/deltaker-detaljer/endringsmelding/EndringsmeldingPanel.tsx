import { Close } from '@navikt/ds-icons'
import { Alert, Button, Heading, Panel, Tooltip } from '@navikt/ds-react'
import React, { ReactElement } from 'react'

import {
	Endringsmelding,
	EndringsmeldingType
} from '../../../../../api/data/endringsmelding'
import { tilbakekallEndringsmelding } from '../../../../../api/tiltak-api'
import { isPending, isRejected, isResolved, usePromise } from '../../../../../utils/use-promise'
import { EndringTypeIkon } from '../EndringTypeIkon'
import { EndringType } from '../types'
import styles from './EndringsmeldingPanel.module.scss'

export interface EndringsmeldingPanelProps {
	endringsmelding: Endringsmelding
	onEndringsmeldingTilbakekalt: () => void
	children: ReactElement
}

export const EndringsmeldingPanel = ({ endringsmelding, onEndringsmeldingTilbakekalt, children }: EndringsmeldingPanelProps) => {
	const tilbakekallEndringsmeldingPromise = usePromise()

	const handleClick = () => {
		tilbakekallEndringsmeldingPromise.setPromise(
			tilbakekallEndringsmelding(endringsmelding.id)
				.then(onEndringsmeldingTilbakekalt)
		)
	}

	if (isRejected(tilbakekallEndringsmeldingPromise)) {
		return <Alert className={styles.alert} variant="error">Meldingen ble ikke tilbakekalt. En annen person har gjort at meldingen er utdatert.</Alert>

	}

	return (
		<Panel border className={styles.panel}>
			<div className={styles.innholdWrapper}>
				<EndringTypeIkon type={mapTilEndringType(endringsmelding.type)} />
				<div className={styles.innhold}>
					<Heading size="xsmall" >Sendt til NAV:</Heading>
					{children}
				</div>
			</div>
			<Tooltip content="Tilbakekall melding" className={styles.tooltip}>
				<Button
					icon={<Close aria-hidden/>}
					loading={isPending(tilbakekallEndringsmeldingPromise) || isResolved(tilbakekallEndringsmeldingPromise)}
					variant="tertiary"
					size="small"
					onClick={handleClick}
					className={styles.closeButton}
					aria-label="Tilbakekall melding"
				/>
			</Tooltip>
		</Panel>
	)
}


const mapTilEndringType = (endringsmeldingType: EndringsmeldingType) => {
	switch (endringsmeldingType) {
		case EndringsmeldingType.LEGG_TIL_OPPSTARTSDATO: return EndringType.LEGG_TIL_OPPSTARTSDATO
		case EndringsmeldingType.ENDRE_OPPSTARTSDATO: return EndringType.ENDRE_OPPSTARTSDATO
		case EndringsmeldingType.FORLENG_DELTAKELSE: return EndringType.FORLENG_DELTAKELSE
		case EndringsmeldingType.DELTAKER_IKKE_AKTUELL: return EndringType.DELTAKER_IKKE_AKTUELL
		case EndringsmeldingType.AVSLUTT_DELTAKELSE: return EndringType.AVSLUTT_DELTAKELSE
		case EndringsmeldingType.ENDRE_DELTAKELSE_PROSENT: return EndringType.ENDRE_DELTAKELSE_PROSENT
		default: throw Error(`Kan ikke finne endringsmeldingtype: ${endringsmeldingType}`)
	}
}
