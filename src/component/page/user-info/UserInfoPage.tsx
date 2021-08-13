import React, { useEffect, useState } from 'react';
import cls from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { fetchBrukerDetaljer } from '../../../api';
import { DetaljertBruker } from '../../../api/data/bruker';
import { Spinner } from '../../felles/spinner/Spinner';
import { Ingress, Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import styles from './UserInfoPage.module.less';
import { mapTiltakStatusTilTekst, mapTiltakTypeTilTekst } from '../../../utils/text-mappers';

export const UserInfoPage = () => {
	const {brukerId} = useParams<{ brukerId: string }>();
	const [bruker, setBruker] = useState<DetaljertBruker>();
	const [hasFailed, setHasFailed] = useState<boolean>(false);

	useEffect(() => {
		fetchBrukerDetaljer(brukerId)
			.then(res => setBruker(res.data))
			.catch(() => {
				setHasFailed(true);
			}); // TODO: vis feil i alertstripe

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<main className={styles.userInfoPage}>
			<Link to="/" className={cls(styles.tilbakeLenke, "blokk-m")}>Tilbake</Link>
			<Sidetittel className="blokk-m">Brukerinformasjon</Sidetittel>
			{bruker
				? <UserInfoContent bruker={bruker}/>
				: (hasFailed ? <AlertStripeFeil>En feil oppstod</AlertStripeFeil> : <Spinner/>)
			}
		</main>
	);
}

const UserInfoContent = (props: { bruker: DetaljertBruker }) => {
	const {tiltak, navEnhet, navVeileder, kontaktinfo} = props.bruker;

	return (
		<div className={styles.userInfoContent}>
			<div>
				{/*TODO: styles.textBold does not work */}
				<Ingress className={styles.textBold}>Kontaktinformasjon</Ingress>
				<Normaltekst>Telefon: {kontaktinfo.telefonnummer}</Normaltekst>
				<Normaltekst>Email: {kontaktinfo.email}</Normaltekst>
			</div>

			<div>
				<Ingress className={styles.textBold}>Status</Ingress>
				<Normaltekst>{mapTiltakStatusTilTekst(tiltak.status)}</Normaltekst>
			</div>

			<div>
				<Ingress className={styles.textBold}>Periode for gjennomføring</Ingress>
				<Normaltekst>Start: {tiltak.startDato}</Normaltekst>
				<Normaltekst>Slutt: {tiltak.sluttDato}</Normaltekst>
			</div>

			<div>
				<Ingress className={styles.textBold}>NAV-kontor</Ingress>
				<Normaltekst>{navEnhet.enhetNavn}</Normaltekst>
			</div>

			<div>
				<Ingress className={styles.textBold}>Veileder</Ingress>
				<Normaltekst>Navn: {navVeileder?.navn}</Normaltekst>
				<Normaltekst>Email: {navVeileder?.email}</Normaltekst>
				<Normaltekst>Telefonnummer: {navVeileder?.telefonnummer}</Normaltekst>
			</div>

			<div>
				<Ingress className={styles.textBold}>Tiltak</Ingress>
				<Normaltekst>Type: {mapTiltakTypeTilTekst(tiltak.type)}</Normaltekst>
			</div>

			<div>
				<Ingress className={styles.textBold}>Beskrivelse</Ingress>
			</div>
		</div>
	);
};