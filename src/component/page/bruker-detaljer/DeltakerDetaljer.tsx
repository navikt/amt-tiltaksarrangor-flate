import { Alert, BodyShort, Heading } from '@navikt/ds-react'
import cls from 'classnames'
import React from 'react'

import { TiltakDeltakerDetaljer } from '../../../api/data/deltaker'
import globalStyles from '../../../globals.module.scss'
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
				<div className={globalStyles.blokkM}>
					<Heading size="medium" level="3" className={cls(globalStyles.blokkXs, styles.gjennomforingTitle)}>{(gjennomforing.navn)}</Heading>
					<BodyShort size="small" className={globalStyles.blokkXxs}>{gjennomforing.tiltak.tiltaksnavn}</BodyShort>
					<BodyShort size="small" className={globalStyles.blokkS}>Søkt inn: {formatDate(registrertDato)}</BodyShort>
					<Show if={erSkjermetPerson}>
						<Alert variant="warning" className={styles.skjermetPersonAlert} size="small">
							Du kan ikke endre datoer på denne deltakeren fordi deltakeren er ansatt i NAV. Ta kontakt
							med NAV-veileder.
						</Alert>
					</Show>
				</div>

				<DeltakelseInfo
					erSkjermetPerson={erSkjermetPerson}
					deltaker={props.deltaker}
					status={status}
					fjernesDato={fjernesDato}
				/>

				<Bestilling tekst={innsokBegrunnelse}/>
			</section>

			<section>
				<NavInfoPanel navEnhet={navEnhet} navVeileder={navVeileder}/>
			</section>
		</div>
	)
}
