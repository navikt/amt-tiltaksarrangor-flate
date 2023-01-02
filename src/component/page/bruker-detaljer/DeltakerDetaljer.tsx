import { BodyShort, Label } from '@navikt/ds-react'
import React from 'react'

import { TiltakDeltakerDetaljer } from '../../../api/data/deltaker'
import { Gjennomforing } from '../../../api/data/tiltak'
import { formatDate } from '../../../utils/date-utils'
import { Show } from '../../felles/Show'
import { Bestilling } from './bestilling/Bestilling'
import { DeltakelseInfo } from './deltaker-detaljer/DeltakelseInfo'
import styles from './DeltakerDetaljer.module.scss'
import { NavInfoPanel } from './nav-info-panel/NavInfoPanel'

export const DeltakerDetaljer = (props: { deltaker: TiltakDeltakerDetaljer }): React.ReactElement => {
	const {
		navEnhet, navVeileder, gjennomforing, registrertDato, status, fjernesDato,
		innsokBegrunnelse
	} = props.deltaker

	return (
		<div className={styles.detaljer}>
			<section className={styles.section}>
				<DeltakelseInfo
					deltaker={props.deltaker}
					status={status}
					fjernesDato={fjernesDato}
				/>
				<div className={styles.innsokt}>
					<BodyShort size="small"><Label as="span" size="small">Søkt inn på:</Label> {gjennomforing.navn}</BodyShort>
					<BodyShort size="small"><Label as="span" size="small">Dato:</Label> {formatDate(registrertDato)}</BodyShort>
				</div>

				<Show if={visBestilling(gjennomforing)} >
					<Bestilling tekst={innsokBegrunnelse} />
				</Show>
			</section>

			<section>
				<NavInfoPanel navEnhet={navEnhet} navVeileder={navVeileder} />
			</section>
		</div>
	)
}

const visBestilling = (gjennomforing: Gjennomforing) => {
	return gjennomforing.tiltak.tiltakskode !== 'DIGIOPPARB'
}
