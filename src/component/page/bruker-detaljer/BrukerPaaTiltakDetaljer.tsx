import { Tilbakeknapp } from 'nav-frontend-ikonknapper'
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi'
import React from 'react'
import { Link } from 'react-router-dom'

import { TiltakDeltakerDetaljer } from '../../../domeneobjekter/deltaker'
import globalStyles from '../../../globals.module.less'
import { lagBrukerNavn } from '../../../utils/bruker-utils'
import { formatDate } from '../../../utils/date-utils'
import { mapTiltakDeltagerStatusTilEtikett } from '../../../utils/text-mappers'
import { internalUrl } from '../../../utils/url-utils'
import { Card } from '../../felles/card/Card'
import styles from './BrukerPaaTiltakDetaljer.module.less'
import { KopierKnapp } from './kopier-knapp/KopierKnapp'
import { Label } from './label/Label'

export const BrukerPaaTiltakDetaljer = (props: { bruker: TiltakDeltakerDetaljer }): React.ReactElement => {
	const {
		navKontor, navVeileder, fornavn, etternavn, fodselsnummer, oppstartdato,
		sluttdato, gjennomforing, registrertDato, telefon, epost, status
	} = props.bruker

	return (
		<>
			<div className={styles.header}>
				<div className={styles.headerContent}>
					<Link to={internalUrl(`/gjennomforing/${gjennomforing.id}`)} className={styles.tilbakeknapp}>
						<Tilbakeknapp />
					</Link>
					<Systemtittel className={styles.headerTitle}>{lagBrukerNavn(fornavn, etternavn)}</Systemtittel>
					{ fodselsnummer && <KopierKnapp text={fodselsnummer}/> }
				</div>
			</div>

			<div className={styles.detaljer}>
				<Card className={styles.tiltakCard}>
					<div>
						<Systemtittel className={globalStyles.blokkXxs}>{(gjennomforing.navn)}</Systemtittel>
						<Normaltekst className={globalStyles.blokkXxs}>{gjennomforing.tiltak.tiltaksnavn}</Normaltekst>
						<Normaltekst className={globalStyles.blokkXxs}>Søkt inn: {formatDate(registrertDato)}</Normaltekst>
						{mapTiltakDeltagerStatusTilEtikett(status)}
					</div>

					<div>
						<Label title="Oppstart" value={formatDate(oppstartdato)} className={globalStyles.blokkM}/>
						<Label title="Sluttdato" value={formatDate(sluttdato)}/>
					</div>
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
