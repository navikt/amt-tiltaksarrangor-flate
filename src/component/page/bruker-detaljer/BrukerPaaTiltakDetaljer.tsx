import { Calender, Email, Telephone } from '@navikt/ds-icons'
import { Alert, BodyShort, Heading } from '@navikt/ds-react'
import cls from 'classnames'
import dayjs from 'dayjs'
import React from 'react'

import { DeltakerStatus, TiltakDeltakerDetaljer, TiltakDeltakerStatus } from '../../../domeneobjekter/deltaker'
import globalStyles from '../../../globals.module.scss'
import { useTabTitle } from '../../../hooks/use-tab-title'
import { gjennomforingDetaljerPageUrl } from '../../../navigation'
import { formaterTelefonnummer, lagBrukerNavn } from '../../../utils/bruker-utils'
import { formatDate } from '../../../utils/date-utils'
import { deltakerSkalSkjulesFra } from '../../../utils/deltaker-status-utils'
import { useStyle } from '../../../utils/use-style'
import { Show } from '../../felles/Show'
import { StatusMerkelapp } from '../../felles/status-merkelapp/StatusMerkelapp'
import { Tilbakelenke } from '../../felles/tilbakelenke/Tilbakelenke'
import styles from './BrukerPaaTiltakDetaljer.module.scss'
import { DeltakerDetalj } from './deltaker-detalj/DeltakerDetalj'
import { IconLabel } from './icon-label/IconLabel'
import { KopierKnapp } from './kopier-knapp/KopierKnapp'
import { NavInfoPanel } from './nav-info-panel/NavInfoPanel'

function mapStatusTilAlertTekst(status: DeltakerStatus): string | null {
	const skjulesFraDato = dayjs(deltakerSkalSkjulesFra(status)).format('DD.MM.YYYY')
	const brukerFjernesTekst = `Deltakeren fjernes fra listen ${skjulesFraDato}`
	switch (status.type) {
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

export const BrukerPaaTiltakDetaljer = (props: { bruker: TiltakDeltakerDetaljer }): React.ReactElement => {
	const {
		navKontor, navVeileder, fornavn, mellomnavn, etternavn, fodselsnummer, startDato,
		sluttDato, gjennomforing, registrertDato, telefonnummer, epost, status
	} = props.bruker

	useTabTitle('Deltakerdetaljer')

	useStyle(globalStyles.whiteBackground, 'html')

	return (
		<>
			<div className={styles.header}>
				<div className={styles.headerContent}>
					<div className={styles.tilbakelenkeWrapper}>
						<Tilbakelenke to={gjennomforingDetaljerPageUrl(gjennomforing.id)} className={styles.tilbakelenke} />
					</div>

					<div className={styles.headerInfoWrapper}>
						<div className={cls(styles.headerTitleWrapper, globalStyles.blokkXs)}>
							<Heading size="medium" level="2" className={styles.headerTitle}>{lagBrukerNavn(fornavn, mellomnavn, etternavn)}</Heading>
							{ fodselsnummer && (
								<KopierKnapp
									text={fodselsnummer}
									ariaLabel={`Kopier fødselsnummer ${fodselsnummer.split('').join(' ')}`}
								/>
							) }
						</div>

						<div className={styles.headerInfo}>
							<IconLabel labelValue={formaterTelefonnummer(telefonnummer)} icon={<Telephone title="Deltaker telefonnummer"/>}/>
							<IconLabel labelValue={epost} icon={<Email title="Deltaker e-post"/>}/>
						</div>
					</div>

				</div>
			</div>

			<div className={styles.detaljer}>
				<section>
					<div className={globalStyles.blokkM}>
						<Heading size="medium" level="3" className={cls(globalStyles.blokkXs, styles.gjennomforingTitle)}>{(gjennomforing.navn)}</Heading>
						<BodyShort className={globalStyles.blokkXxs}>{gjennomforing.tiltak.tiltaksnavn}</BodyShort>
						<BodyShort className={globalStyles.blokkS}>Søkt inn: {formatDate(registrertDato)}</BodyShort>

						<Show if={erIkkeAktuellEllerHarSluttet(status.type)}>
							<Alert variant="warning" className={styles.statusAlert}>{mapStatusTilAlertTekst(status)}</Alert>
						</Show>
						<Show if={erVenterPaOppstartEllerDeltar(status.type)}>
							<StatusMerkelapp status={status} />
						</Show>
					</div>

					<div className={styles.deltakerDetaljer}>
						<DeltakerDetalj detaljeTittel="Oppstartsdato" detaljeVerdi={formatDate(startDato)} detaljeIcon={<Calender title="Kalender"/>}/>
						<DeltakerDetalj detaljeTittel="Sluttdato" detaljeVerdi={formatDate(sluttDato)} detaljeIcon={<Calender title="Kalender"/>}/>
					</div>
				</section>

				<section>
					<NavInfoPanel navKontor={navKontor} navVeileder={navVeileder} />
				</section>
			</div>
		</>
	)
}
