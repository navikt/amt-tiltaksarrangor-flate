import { Knapp } from 'nav-frontend-knapper';
import { Input } from 'nav-frontend-skjema';
import { Normaltekst, Sidetittel, Systemtittel } from 'nav-frontend-typografi';
import React, { useState } from 'react';

import { oppdaterTiltakSluttdato, oppdaterTiltakStartdato } from '../../../api';
import { DetaljertBruker } from '../../../api/data/bruker';
import globalStyles from '../../../globals.module.less';
import { lagBrukerNavn } from '../../../utils/bruker-utils';
import { formatDateInputStr, stringToDate } from '../../../utils/date-utils';
import { mapTiltakStatusTilTekst, mapTiltakTypeTilTekst } from '../../../utils/text-mappers';
import styles from './BrukerPaaTiltakDetaljer.module.less';
import { Card } from '../../felles/card/Card';

export const BrukerPaaTiltakDetaljer = (props: { bruker: DetaljertBruker }) => {
	const { tiltak, navEnhet, navVeileder, kontaktinfo, fornavn, etternavn } = props.bruker;
	const [startdato, setStartdato] = useState<string>(formatDateInputStr(tiltak.startdato));
	const [sluttdato, setSluttdato] = useState<string>(formatDateInputStr(tiltak.sluttdato));

	const onStartdatoLagreClick = () => {
		if (!startdato) return;
		oppdaterTiltakStartdato(tiltak.id, stringToDate(startdato!));
	};
	const onSluttdatoLagreClick = () => {
		if (!sluttdato) return;
		oppdaterTiltakSluttdato(tiltak.id, stringToDate(sluttdato!));
	};
	return (
		<>
			<Sidetittel className={globalStyles.blokkM}>{lagBrukerNavn(fornavn, etternavn)}</Sidetittel>

			<div className={styles.userInfoContent}>
				<Card>
					<Systemtittel>Kontaktinformasjon</Systemtittel>
					<Normaltekst>Telefon: {kontaktinfo.telefonnummer}</Normaltekst>
					<Normaltekst>Email: {kontaktinfo.email}</Normaltekst>
				</Card>

				<Card>
					<Systemtittel>Status</Systemtittel>
					<Normaltekst>{mapTiltakStatusTilTekst(tiltak.status)}</Normaltekst>
				</Card>

				<Card>
					<Systemtittel>Periode for gjennomføring</Systemtittel>
					<div className={styles.periodeInputWrapper}>
						<Input label="Start" type="date" value={startdato} onChange={(e) => setStartdato(e.target.value)} />

						<Knapp className={styles.periodeKnapp} onClick={onStartdatoLagreClick} disabled={!startdato}>
							Lagre
						</Knapp>
					</div>
					<div className={styles.periodeInputWrapper}>
						<Input label="Slutt" type="date" value={sluttdato} onChange={(e) => setSluttdato(e.target.value)} />

						<Knapp className={styles.periodeKnapp} onClick={onSluttdatoLagreClick} disabled={!sluttdato}>
							Lagre
						</Knapp>
					</div>
				</Card>

				<Card>
					<Systemtittel>NAV-kontor</Systemtittel>
					<Normaltekst>{navEnhet.enhetNavn}</Normaltekst>
				</Card>

				<Card>
					<Systemtittel>Veileder</Systemtittel>
					<Normaltekst>Navn: {navVeileder?.navn}</Normaltekst>
					<Normaltekst>Email: {navVeileder?.email}</Normaltekst>
					<Normaltekst>Telefonnummer: {navVeileder?.telefonnummer}</Normaltekst>
				</Card>

				<Card>
					<Systemtittel>Tiltak</Systemtittel>
					<Normaltekst>Type: {mapTiltakTypeTilTekst(tiltak.type)}</Normaltekst>
				</Card>
			</div>
		</>
	);
};
