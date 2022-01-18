import { BodyShort, Heading } from '@navikt/ds-react'
import React from 'react'

import { TiltakDeltakerDetaljer } from '../../../domeneobjekter/deltaker'
import globalStyles from '../../../globals.module.scss'
import { lagBrukerNavn } from '../../../utils/bruker-utils'
import { formatDate } from '../../../utils/date-utils'
import { Card } from '../../felles/card/Card'
import { Tilbakelenke } from '../../felles/tilbakelenke/Tilbakelenke'
import styles from './BrukerPaaTiltakDetaljer.module.scss'
import { KopierKnapp } from './kopier-knapp/KopierKnapp'
import { Label } from './label/Label'

export const BrukerPaaTiltakDetaljer = (props: { bruker: TiltakDeltakerDetaljer }): React.ReactElement => {
	const {
		navKontor, navVeileder, fornavn, etternavn, fodselsnummer, startDato,
		sluttDato, gjennomforing, registrertDato, telefonnummer, epost
	} = props.bruker

	return (
		<>
			<div className={styles.header}>
				<div className={styles.headerContent}>
					<Tilbakelenke to={`/gjennomforing/${gjennomforing.id}`} className={styles.tilbakeknapp} />
					<Heading size="medium" className={styles.headerTitle}>{lagBrukerNavn(fornavn, etternavn)}</Heading>
					{ fodselsnummer && <KopierKnapp text={fodselsnummer}/> }
				</div>
			</div>

			<div className={styles.detaljer}>
				<Card className={styles.tiltakCard}>
					<div>
						<Heading size="medium" className={globalStyles.blokkXxs}>{(gjennomforing.navn)}</Heading>
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
						<Heading size="medium" className={globalStyles.blokkS}>Deltaker</Heading>
						<Label title="Telefon" value={telefonnummer} className={globalStyles.blokkXs}/>
						<Label title="E-post" value={epost}/>
					</Card>

					<Card>
						<Heading size="medium" className={globalStyles.blokkS}>NAV-kontor</Heading>
						<Label title="Kontor" value={navKontor?.navn} className={globalStyles.blokkXs}/>
					</Card>

					<Card>
						<Heading size="medium" className={globalStyles.blokkS}>NAV-veileder</Heading>
						<Label title="Navn" value={navVeileder?.navn} className={globalStyles.blokkXs}/>
						<Label title="Telefon" value={navVeileder?.telefon} className={globalStyles.blokkXs}/>
						<Label title="E-post" value={navVeileder?.epost}/>
					</Card>
				</div>
			</div>
		</>
	)
}
