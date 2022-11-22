import { Heading, Panel } from '@navikt/ds-react'
import React, { ReactElement } from 'react'

import {
	Endringsmelding,
	EndringsmeldingType
} from '../../../../../api/data/endringsmelding'
import { EndringTypeIkon } from '../EndringTypeIkon'
import { EndringType } from '../types'
import styles from './EndringsmeldingPanel.module.scss'

export interface EndringsmeldingPanelProps {
	endringsmelding: Endringsmelding
	children: ReactElement
}

export const EndringsmeldingPanel = (props: EndringsmeldingPanelProps) => {
	return (
		<Panel border className={styles.panel}>
			<EndringTypeIkon type={mapTilEndringType(props.endringsmelding.type)}/>
			<div className={styles.innhold}>
				<Heading size="xsmall" >Sendt til NAV:</Heading>
				{props.children}
			</div>
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
		default: throw Error(`Kan ikke finne endringsmeldingtype: ${endringsmeldingType}`)
	}
}