import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import React from 'react';

import { TiltakDeltagerDetaljerDto } from '../../../api/data/deltager';
import { lagBrukerNavn } from '../../../utils/bruker-utils';
import styles from './BrukerPaaTiltakDetaljer.module.less';
import { Card } from '../../felles/card/Card';
import { Label } from './label/Label';
import { Link } from 'react-router-dom';
import { formatDateStr } from '../../../utils/date-utils';
import { mapTiltakDeltagerStatusTilEtikett } from '../../../utils/text-mappers';
import { KopierKnapp } from './kopier-knapp/KopierKnapp';

export const BrukerPaaTiltakDetaljer = (props: { bruker: TiltakDeltagerDetaljerDto }) => {
	const { navKontor, navVeileder, fornavn, etternavn, fodselsnummer, tiltakInstans, telefon, epost, status } = props.bruker;

	return (
		<div>
			<div className={styles.header}>
				<Link to={`/instans/${tiltakInstans.id}`} className={styles.tilbakeLenke}>
					Tilbake
				</Link>
				<Systemtittel className={styles.headerTitle}>{lagBrukerNavn(fornavn, etternavn)}</Systemtittel>
				{ fodselsnummer && <KopierKnapp text={fodselsnummer}/> }
			</div>

			<div className={styles.detaljer}>
				<Card className={styles.tiltakCard}>
					<Systemtittel className="blokk-xxs">{(tiltakInstans.navn)}</Systemtittel>
					<Normaltekst className="blokk-xxs">{tiltakInstans.tiltak.tiltaksnavn}</Normaltekst>
					<Normaltekst className="blokk-xxs">{formatDateStr(tiltakInstans.startdato)} - {formatDateStr(tiltakInstans.sluttdato)}</Normaltekst>
					{mapTiltakDeltagerStatusTilEtikett(status)}
				</Card>

				<div className={styles.userInfoContent}>
					<Card>
						<Systemtittel className="blokk-s">Deltaker</Systemtittel>
						<Label title="Telefon" value={telefon} className="blokk-xs"/>
						<Label title="Epost" value={epost}/>
					</Card>

					<Card>
						<Systemtittel className="blokk-s">NAV-kontor</Systemtittel>
						<Label title="Kontor" value={navKontor.navn} className="blokk-xs"/>
						<Label title="Adresse" value={navKontor.adresse}/>
					</Card>

					<Card>
						<Systemtittel className="blokk-s">NAV-veileder</Systemtittel>
						<Label title="Navn" value={navVeileder?.navn} className="blokk-xs"/>
						<Label title="Telefon" value={navVeileder?.telefon} className="blokk-xs"/>
						<Label title="Epost" value={navVeileder?.epost}/>
					</Card>
				</div>
			</div>
		</div>
	);
};
