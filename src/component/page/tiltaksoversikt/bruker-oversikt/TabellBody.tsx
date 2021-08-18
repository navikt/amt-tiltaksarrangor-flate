import React from 'react';
import { Rad } from './Rad';
import { Bruker } from '../../../../api/data/bruker';
import { BrukerSortering } from './types';

interface TabellBodyProps {
	sortering?: BrukerSortering;
	brukere: Bruker[];
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
