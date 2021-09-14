import React from 'react';

import { Deltaker } from '../../../../api/data/bruker';
import { Rad } from './Rad';
import { BrukerSortering } from './types';

interface TabellBodyProps {
	sortering?: BrukerSortering;
	brukere: Deltaker[];
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
