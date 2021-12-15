import { Tilbakeknapp } from 'nav-frontend-ikonknapper'
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi'
import React from 'react'
import { Link } from 'react-router-dom'

import { TiltakDeltagerDetaljer } from '../../../domeneobjekter/deltager'
import globalStyles from '../../../globals.module.less'
import { lagBrukerNavn } from '../../../utils/bruker-utils'
import { formatDate } from '../../../utils/date-utils'
import { mapTiltakDeltagerStatusTilEtikett } from '../../../utils/text-mappers'
import { Card } from '../../felles/card/Card'
import styles from './BrukerPaaTiltakDetaljer.module.less'
import { KopierKnapp } from './kopier-knapp/KopierKnapp'
import { Label } from './label/Label'

export const BrukerPaaTiltakDetaljer = (props: { bruker: TiltakDeltagerDetaljer }): React.ReactElement => {
	const { navKontor, navVeileder, fornavn, etternavn, fodselsnummer, tiltakInstans, telefon, epost, status } = props.bruker
	return (
		<>
			<div className={styles.header}>
				<div className={styles.headerContent}>
					<Link to={`/instans/${tiltakInstans.id}`} className={styles.tilbakeknapp}>
						<Tilbakeknapp />
					</Link>
					<Systemtittel className={styles.headerTitle}>{lagBrukerNavn(fornavn, etternavn)}</Systemtittel>
					{ fodselsnummer && <KopierKnapp text={fodselsnummer}/> }
				</div>
			</div>

			<div className={styles.detaljer}>
				<Card className={styles.tiltakCard}>
					<Systemtittel className={globalStyles.blokkXxs}>{(tiltakInstans.navn)}</Systemtittel>
					<Normaltekst className={globalStyles.blokkXxs}>{tiltakInstans.tiltak.tiltaksnavn}</Normaltekst>
					<Normaltekst className={globalStyles.blokkXxs}>{formatDate(tiltakInstans.oppstartdato)} - {formatDate(tiltakInstans.sluttdato)}</Normaltekst>
					{mapTiltakDeltagerStatusTilEtikett(status)}
				</Card>

				<div className={styles.userInfoContent}>
					<Card>
						<Systemtittel className={globalStyles.blokkS}>Deltaker</Systemtittel>
						<Label title="Telefon" value={telefon} className={globalStyles.blokkXs}/>
						<Label title="Epost" value={epost}/>
					</Card>

					<Card>
						<Systemtittel className={globalStyles.blokkS}>NAV-kontor</Systemtittel>
						<Label title="Kontor" value={navKontor.navn} className={globalStyles.blokkXs}/>
						<Label title="Adresse" value={navKontor.adresse}/>
					</Card>

					<Card>
						<Systemtittel className={globalStyles.blokkS}>NAV-veileder</Systemtittel>
						<Label title="Navn" value={navVeileder?.navn} className={globalStyles.blokkXs}/>
						<Label title="Telefon" value={navVeileder?.telefon} className={globalStyles.blokkXs}/>
						<Label title="Epost" value={navVeileder?.epost}/>
					</Card>
				</div>
			</div>
		</>
	)
}
