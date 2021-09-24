import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import React from 'react';
import { useParams } from 'react-router-dom';

import { fetchTiltakDeltagerDetaljer } from '../../../api';
import { TiltakDeltagerDetaljerDto } from '../../../api/data/deltager';
import { Spinner } from '../../felles/spinner/Spinner';
import { BrukerPaaTiltakDetaljer } from './BrukerPaaTiltakDetaljer';
import { isNotStartedOrPending, isRejected, usePromise } from '../../../utils/use-promise';
import { AxiosResponse } from 'axios';

export const BrukerDetaljerPage = () => {
	const params = useParams<{ brukerId: string }>();

	const fetchTiltakDeltagerDetaljerPromise = usePromise<AxiosResponse<TiltakDeltagerDetaljerDto>>(
		() => fetchTiltakDeltagerDetaljer(params.brukerId), [params.brukerId]
	);

	if (isNotStartedOrPending(fetchTiltakDeltagerDetaljerPromise)) {
		return <Spinner />;
	}

	if (isRejected(fetchTiltakDeltagerDetaljerPromise)) {
		return <AlertStripeFeil>En feil oppstod</AlertStripeFeil>;
	}

	const bruker = fetchTiltakDeltagerDetaljerPromise.result.data;

	return (
		<main>
			<BrukerPaaTiltakDetaljer bruker={bruker} />
		</main>
	);
};
