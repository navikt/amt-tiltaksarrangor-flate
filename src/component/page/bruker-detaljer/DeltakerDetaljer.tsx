import { Alert, BodyShort, Heading } from '@navikt/ds-react'
import cls from 'classnames'
import dayjs from 'dayjs'
import React from 'react'

import { TiltakDeltakerDetaljer, TiltakDeltakerStatus } from '../../../api/data/deltaker'
import globalStyles from '../../../globals.module.scss'
import { formatDate } from '../../../utils/date-utils'
import { Show } from '../../felles/Show'
import { StatusMerkelapp } from '../../felles/status-merkelapp/StatusMerkelapp'
import { Begrunnelse } from './begrunnelse/Begrunnelse'
import { Deltakelsesperiode } from './deltakelses-periode/Deltakelsesperiode'
import styles from './DeltakerDetaljer.module.scss'
import { NavInfoPanel } from './nav-info-panel/NavInfoPanel'

function mapStatusTilAlertTekst(fjernesDato: Date | null, status: TiltakDeltakerStatus): string | null {
	const fjernesFraDato = dayjs(fjernesDato).format('DD.MM.YYYY')
	const brukerFjernesTekst = `Deltakeren fjernes fra listen ${fjernesFraDato}`
	switch (status) {
		case TiltakDeltakerStatus.IKKE_AKTUELL:
			return `Tiltaket er ikke aktuelt for denne personen.\n${brukerFjernesTekst}`
		case TiltakDeltakerStatus.HAR_SLUTTET:
			return `Personen har sluttet i dette tiltaket.\n${brukerFjernesTekst}`
		default:
			return null
	}
}

const erIkkeAktuellEllerHarSluttet = (status: TiltakDeltakerStatus): boolean =>
	[ TiltakDeltakerStatus.IKKE_AKTUELL, TiltakDeltakerStatus.HAR_SLUTTET ].includes(status)

const erVenterPaOppstartEllerDeltar = (status: TiltakDeltakerStatus): boolean =>
	[ TiltakDeltakerStatus.VENTER_PA_OPPSTART, TiltakDeltakerStatus.DELTAR ].includes(status)

export const DeltakerDetaljer = (props: { bruker: TiltakDeltakerDetaljer }): React.ReactElement => {
	const {
		id: deltakerId, navEnhet, navVeileder, startDato,
		sluttDato, gjennomforing, registrertDato, status, erSkjermetPerson, fjernesDato,
		innsokBegrunnelse
	} = props.bruker

	return (
		<div className={styles.detaljer}>
			<section>
				<div className={globalStyles.blokkM}>
					<Heading size="medium" level="3" className={cls(globalStyles.blokkXs, styles.gjennomforingTitle)}>{(gjennomforing.navn)}</Heading>
					<BodyShort className={globalStyles.blokkXxs}>{gjennomforing.tiltak.tiltaksnavn}</BodyShort>
					<BodyShort className={globalStyles.blokkS}>Søkt inn: {formatDate(registrertDato)}</BodyShort>

					<Show if={erIkkeAktuellEllerHarSluttet(status.type)}>
						<Alert variant="warning" className={styles.statusAlert}>{mapStatusTilAlertTekst(fjernesDato, status.type)}</Alert>
					</Show>
					<Show if={erVenterPaOppstartEllerDeltar(status.type)}>
						<StatusMerkelapp status={status}/>
					</Show>
					<Show if={erSkjermetPerson}>
						<Alert variant="warning" className={styles.skjermetPersonAlert}>
							Du kan ikke endre datoer på denne deltakeren fordi deltakeren er ansatt i NAV. Ta kontakt
							med NAV-veileder.
						</Alert>
					</Show>
				</div>

				<div className={cls(styles.deltakerDetaljer, globalStyles.blokkM)}>
					<Deltakelsesperiode
						erSkjermetPerson={erSkjermetPerson}
						deltakerId={deltakerId}
						deltakerStartdato={startDato}
						deltakerSluttdato={sluttDato}
						gjennomforingStartDato={gjennomforing.startDato}
						gjennomforingSluttDato={gjennomforing.sluttDato}
					/>
				</div>

				<Begrunnelse begrunnelse={innsokBegrunnelse}/>
			</section>

			<section>
				<NavInfoPanel navEnhet={navEnhet} navVeileder={navVeileder}/>
			</section>
		</div>
	)
}
