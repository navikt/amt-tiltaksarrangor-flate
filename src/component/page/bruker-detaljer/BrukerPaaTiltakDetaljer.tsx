import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import React from 'react';

import { DetaljertBruker } from '../../../api/data/bruker';
import { lagBrukerNavn } from '../../../utils/bruker-utils';
import { mapTiltakTypeTilTekst } from '../../../utils/text-mappers';
import styles from './BrukerPaaTiltakDetaljer.module.less';
import { Card } from '../../felles/card/Card';
import { EtikettSuksess } from 'nav-frontend-etiketter';
import { Label } from './label/Label';
import { Link, useHistory } from 'react-router-dom';

export const BrukerPaaTiltakDetaljer = (props: { bruker: DetaljertBruker }) => {
	const history = useHistory();
	const { tiltak, navEnhet, navVeileder, kontaktinfo, fornavn, etternavn, fodselsdato } = props.bruker;

	return (
		<div>
			<div className={styles.header}>
				<Link to="#" className={styles.tilbakeLenke} onClick={(e) => {
					// TODO: Hvis vi ikke får IDen til instansen så er dette greit nok, men det er bedre å konstruere riktig lenke
					e.preventDefault();
					history.goBack();
				}}>
					Tilbake
				</Link>
				<Systemtittel className={styles.headerTitle}>{lagBrukerNavn(fornavn, etternavn)}</Systemtittel>
				<Normaltekst>{fodselsdato}</Normaltekst>
			</div>

			<div className={styles.detaljer}>
				<Card className={styles.tiltakCard}>
					<Systemtittel className="blokk-xxs">{mapTiltakTypeTilTekst(tiltak.type)}</Systemtittel>
					<Normaltekst className="blokk-xxs">{tiltak.navn}</Normaltekst>
					<Normaltekst className="blokk-xxs">{tiltak.startdato} - {tiltak.sluttdato}</Normaltekst>
					<EtikettSuksess>Gjennomføres</EtikettSuksess>
				</Card>

				<div className={styles.userInfoContent}>
					<Card>
						<Systemtittel className="blokk-s">Deltaker</Systemtittel>
						<Label title="Telefon" value={kontaktinfo.telefonnummer} className="blokk-xs"/>
						<Label title="Epost" value={kontaktinfo.email}/>
					</Card>

					<Card>
						<Systemtittel className="blokk-s">NAV-kontor</Systemtittel>
						<Label title="Kontor" value={navEnhet.enhetNavn} className="blokk-xs"/>
						<Label title="Adresse" value="Kontorveien 37, 4021 Sted"/>
					</Card>

					<Card>
						<Systemtittel className="blokk-s">NAV-veileder</Systemtittel>
						<Label title="Navn" value={navVeileder?.navn} className="blokk-xs"/>
						<Label title="Telefon" value={navVeileder?.telefonnummer} className="blokk-xs"/>
						<Label title="Epost" value={navVeileder?.email}/>
					</Card>
				</div>
			</div>
		</div>
	);
};
function useRouter(): {} {
    throw new Error('Function not implemented.');
}

