import { BodyShort, Label } from '@navikt/ds-react'
import React from 'react'

import { Deltaker } from '../../../api/data/deltaker'
import { Tiltakskode } from '../../../api/data/tiltak'
import { formatDate } from '../../../utils/date-utils'
import { Show } from '../../felles/Show'
import { Bestilling } from './bestilling/Bestilling'
import { DeltakelseInfo } from './deltaker-detaljer/DeltakelseInfo'
import styles from './DeltakerDetaljer.module.scss'
import { NavInfoPanel } from './nav-info-panel/NavInfoPanel'
import { VeilederPanel } from './veileder-panel/VeilederPanel'
import { DeltakerVurdering } from './deltaker-detaljer/vurdering/DeltakerVurdering'

export const DeltakerDetaljer = (props: {
	deltaker: Deltaker,
	visTildeling: boolean,
}): React.ReactElement => {
	const {
		navInformasjon, soktInnPa, soktInnDato, bestillingTekst, tiltakskode
	} = props.deltaker

	return (
		<div className={styles.detaljer}>
			<section className={styles.section}>
				<DeltakelseInfo deltaker={props.deltaker} />

				{props.deltaker.tiltakskode === Tiltakskode.GRUPPEAMO
				&& <DeltakerVurdering deltaker={props.deltaker} />}

				<div className={styles.innsokt}>
					<BodyShort size="small">
						<Label as="span" size="small">
							Søkt inn på:
						</Label>{' '}
						{soktInnPa}
					</BodyShort>
					<BodyShort size="small">
						<Label as="span" size="small">
							Dato:
						</Label>{' '}
						{formatDate(soktInnDato)}
					</BodyShort>
				</div>

				<Show if={visBestilling(tiltakskode)}>
					<Bestilling tekst={bestillingTekst} />
				</Show>
			</section>

			<section>
				<NavInfoPanel navkontor={navInformasjon.navkontor} navVeileder={navInformasjon.navVeileder} />
				<VeilederPanel deltaker={props.deltaker} visTildeling={props.visTildeling} />
			</section>
		</div>
	)
}

const visBestilling = (tiltakskode: Tiltakskode) => {
	return ![ Tiltakskode.DIGIOPPARB, Tiltakskode.GRUFAGYRKE, Tiltakskode.JOBBK, Tiltakskode.GRUPPEAMO ].includes(tiltakskode)
}
