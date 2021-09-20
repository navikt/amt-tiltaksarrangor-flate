import React from 'react';

import { Rad } from './Rad';
import { BrukerSortering } from './types';
import { TiltakDeltagerDto } from '../../../../api/data/deltager';

interface TabellBodyProps {
	sortering?: BrukerSortering;
	brukere: TiltakDeltagerDto[];
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
