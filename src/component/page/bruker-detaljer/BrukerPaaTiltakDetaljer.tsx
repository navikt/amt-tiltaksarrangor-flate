import { Alert, BodyShort, Heading } from '@navikt/ds-react'
import React from 'react'

import { TiltakDeltakerDetaljer, TiltakDeltakerStatus } from '../../../domeneobjekter/deltaker'
import globalStyles from '../../../globals.module.scss'
import { lagBrukerNavn } from '../../../utils/bruker-utils'
import { formatDate } from '../../../utils/date-utils'
import { Card } from '../../felles/card/Card'
import { Show } from '../../felles/Show'
import { Tilbakelenke } from '../../felles/tilbakelenke/Tilbakelenke'
import styles from './BrukerPaaTiltakDetaljer.module.scss'
import { KopierKnapp } from './kopier-knapp/KopierKnapp'
import { Label } from './label/Label'

function mapStatusTilAlertTekst(status: TiltakDeltakerStatus): string | null {
	switch (status) {
		case TiltakDeltakerStatus.IKKE_AKTUELL:
			return 'Tiltaket er ikke aktuelt for denne personen'
		case TiltakDeltakerStatus.HAR_SLUTTET:
			return 'Personen har sluttet i dette tiltaket'
		default:
			return null
	}
}

export const BrukerPaaTiltakDetaljer = (props: { bruker: TiltakDeltakerDetaljer }): React.ReactElement => {
	const {
		navKontor, navVeileder, fornavn, etternavn, fodselsnummer, startDato,
		sluttDato, gjennomforing, registrertDato, telefonnummer, epost, status
	} = props.bruker

	const alertTekst = mapStatusTilAlertTekst(status)

	return (
		<>
			<div className={styles.header}>
				<div className={styles.headerContent}>
					<Tilbakelenke to={`/gjennomforing/${gjennomforing.id}`} className={styles.tilbakeknapp} />
					<Heading size="medium" level="2" className={styles.headerTitle}>{lagBrukerNavn(fornavn, etternavn)}</Heading>
					{ fodselsnummer && <KopierKnapp text={fodselsnummer}/> }
				</div>
			</div>

			<div className={styles.detaljer}>
				<Show if={alertTekst}>
					<Alert variant="warning" className={styles.statusAlert}>{alertTekst}</Alert>
				</Show>

				<Card className={styles.tiltakCard}>
					<div>
						<Heading size="medium" level="3" className={globalStyles.blokkXxs}>{(gjennomforing.navn)}</Heading>
						<BodyShort className={globalStyles.blokkXxs}>{gjennomforing.tiltak.tiltaksnavn}</BodyShort>
						<BodyShort className={globalStyles.blokkXxs}>Søkt inn: {formatDate(registrertDato)}</BodyShort>
					</div>

					<div>
						<Label title="Oppstart" value={formatDate(startDato)} className={globalStyles.blokkM}/>
						<Label title="Sluttdato" value={formatDate(sluttDato)}/>
					</div>
				</Card>

				<div className={styles.userInfoContent}>
					<Card>
						<Heading size="medium" level="3" className={globalStyles.blokkS}>Deltaker</Heading>
						<Label title="Telefon" value={telefonnummer} className={globalStyles.blokkXs}/>
						<Label title="E-post" value={epost}/>
					</Card>

					<Card>
						<Heading size="medium" level="3" className={globalStyles.blokkS}>NAV-kontor</Heading>
						<Label title="Kontor" value={navKontor?.navn} className={globalStyles.blokkXs}/>
					</Card>

					<Card>
						<Heading size="medium" level="3" className={globalStyles.blokkS}>NAV-veileder</Heading>
						<Label title="Navn" value={navVeileder?.navn} className={globalStyles.blokkXs}/>
						<Label title="Telefon" value={navVeileder?.telefon} className={globalStyles.blokkXs}/>
						<Label title="E-post" value={navVeileder?.epost}/>
					</Card>
				</div>
			</div>
		</>
	)
}
