import React from 'react';
import { Rad } from './Rad';
import { Bruker } from '../../../../api/data/bruker';

interface TabellBodyProps {
	brukere: Bruker[];
}

export const TabellBody = (props: TabellBodyProps) => {
    return (
	    <tbody>
		    {props.brukere.map((bruker, idx) => <Rad idx={idx} bruker={bruker} key={idx} />)}
		</tbody>
    );
};
