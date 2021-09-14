import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchBrukerDetaljer } from '../../../api';
import { DetaljertBruker } from '../../../api/data/bruker';
import { Spinner } from '../../felles/spinner/Spinner';
import { BrukerPaaTiltakDetaljer } from './BrukerPaaTiltakDetaljer';

export const BrukerDetaljerPage = () => {
	const { brukerId } = useParams<{ brukerId: string }>();
	const [bruker, setBruker] = useState<DetaljertBruker>();
	const [hasFailed, setHasFailed] = useState<boolean>(false);

	useEffect(() => {
		fetchBrukerDetaljer(brukerId)
			.then((res) => setBruker(res.data))
			.catch(() => setHasFailed(true));
	}, [brukerId]);

	return (
		<main>
			{bruker ? (
				<BrukerPaaTiltakDetaljer bruker={bruker} />
			) : hasFailed ? (
				<AlertStripeFeil>En feil oppstod</AlertStripeFeil>
			) : (
				<Spinner />
			)}
		</main>
	);
};
