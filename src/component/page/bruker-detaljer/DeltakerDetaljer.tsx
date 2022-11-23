import { Alert, BodyShort, Heading } from '@navikt/ds-react'
import cls from 'classnames'
import React from 'react'

import { TiltakDeltakerDetaljer, TiltakDeltakerStatus } from '../../../api/data/deltaker'
import globalStyles from '../../../globals.module.scss'
import { formatDate } from '../../../utils/date-utils'
import { Show } from '../../felles/Show'
import { Bestilling } from './begrunnelse/Bestilling'
import { DeltakelseInfo } from './deltaker-detaljer/DeltakelseInfo'
import styles from './DeltakerDetaljer.module.scss'
import { NavInfoPanel } from './nav-info-panel/NavInfoPanel'

const erIkkeAktuellEllerHarSluttet = (status: TiltakDeltakerStatus): boolean =>
	[ TiltakDeltakerStatus.IKKE_AKTUELL, TiltakDeltakerStatus.HAR_SLUTTET ].includes(status)

export const DeltakerDetaljer = (props: { deltaker: TiltakDeltakerDetaljer }): React.ReactElement => {
	const {
		navEnhet, navVeileder, gjennomforing, registrertDato, status, erSkjermetPerson, fjernesDato,
		innsokBegrunnelse
	} = props.deltaker

	return (
		<div className={styles.detaljer}>
			<section>
				<div className={globalStyles.blokkM}>
					<Heading size="medium" level="3" className={cls(globalStyles.blokkXs, styles.gjennomforingTitle)}>{(gjennomforing.navn)}</Heading>
					<BodyShort size="small" className={globalStyles.blokkXxs}>{gjennomforing.tiltak.tiltaksnavn}</BodyShort>
					<BodyShort size="small" className={globalStyles.blokkS}>Søkt inn: {formatDate(registrertDato)}</BodyShort>

					<Show if={erIkkeAktuellEllerHarSluttet(status.type)}>
						<Alert variant="warning" className={styles.statusAlert} size="small">Deltakeren fjernes fra listen {formatDate(fjernesDato)}</Alert>
					</Show>
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
				/>

				<Bestilling bestilling={innsokBegrunnelse}/>
			</section>

			<section>
				<NavInfoPanel navEnhet={navEnhet} navVeileder={navVeileder}/>
			</section>
		</div>
	)
}
