import React from 'react';

import { Rad } from './Rad';
import { BrukerSortering } from './types';
import { TiltakDeltager } from '../../../../domeneobjekter/deltager';

interface TabellBodyProps {
	sortering?: BrukerSortering;
	brukere: TiltakDeltager[];
}

export const TabellBody = (props: TabellBodyProps) => {
	return (
		<tbody>
			{props.brukere.map((bruker, idx) => (
				<Rad idx={idx} bruker={bruker} brukerSortering={props.sortering} key={idx} />
			))}
		</tbody>
	);
};
