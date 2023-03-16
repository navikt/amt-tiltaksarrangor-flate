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
import { VeilederPanel } from './veileder-panel/VeilederPanel'
import toggle from '../../../utils/toggle'

export const DeltakerDetaljer = (props: {
	deltaker: TiltakDeltakerDetaljer,
	visTildeling: boolean,
}): React.ReactElement => {
	const {
		navEnhet, navVeileder, deltakerliste, registrertDato, status, fjernesDato,
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
					<BodyShort size="small"><Label as="span" size="small">Søkt inn på:</Label> {deltakerliste.navn}</BodyShort>
					<BodyShort size="small"><Label as="span" size="small">Dato:</Label> {formatDate(registrertDato)}</BodyShort>
				</div>

				<Show if={visBestilling(deltakerliste)} >
					<Bestilling tekst={innsokBegrunnelse} />
				</Show>
			</section>

			<section>
				<NavInfoPanel navEnhet={navEnhet} navVeileder={navVeileder} />
				<Show if={toggle.veilederEnabled}>
					<VeilederPanel deltaker={props.deltaker} visTildeling={props.visTildeling}/>
				</Show>
			</section>
		</div>
	)
}

const visBestilling = (gjennomforing: Gjennomforing) => {
	return gjennomforing.tiltak.tiltakskode !== 'DIGIOPPARB'
}
