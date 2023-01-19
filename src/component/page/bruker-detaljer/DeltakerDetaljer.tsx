import { Alert, BodyShort, Label } from '@navikt/ds-react'
import React from 'react'

import { TiltakDeltakerDetaljer } from '../../../api/data/deltaker'
import { Gjennomforing } from '../../../api/data/tiltak'
import { formatDate } from '../../../utils/date-utils'
import { Show } from '../../felles/Show'
import { Bestilling } from './begrunnelse/Bestilling'
import { DeltakelseInfo } from './deltaker-detaljer/DeltakelseInfo'
import styles from './DeltakerDetaljer.module.scss'
import { NavInfoPanel } from './nav-info-panel/NavInfoPanel'

export const DeltakerDetaljer = (props: { deltaker: TiltakDeltakerDetaljer }): React.ReactElement => {
	const {
		navEnhet, navVeileder, gjennomforing, registrertDato, status, erSkjermetPerson, fjernesDato,
		innsokBegrunnelse
	} = props.deltaker

	return (
		<div className={styles.detaljer}>
			<section className={styles.section}>
				<Show if={erSkjermetPerson}>
					<Alert variant="warning" className={styles.skjermetPersonAlert} size="small">
						Du kan ikke endre datoer på denne deltakeren fordi deltakeren er ansatt i NAV. Ta kontakt
						med NAV-veileder.
					</Alert>
				</Show>
				<DeltakelseInfo
					erSkjermetPerson={erSkjermetPerson}
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
