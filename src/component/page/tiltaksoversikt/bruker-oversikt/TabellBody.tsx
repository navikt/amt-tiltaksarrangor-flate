import React from 'react';
import { Rad } from './Rad';
import { Bruker } from '../../../../api/data/bruker';
import { UserSort } from './TabellHeader';

interface TabellBodyProps {
	userSort?: UserSort;
	brukere: Bruker[];
}
export const TabellBody = (props: TabellBodyProps) => {
    return (
	    <tbody>
		    {props.brukere.map((bruker, idx) => <Rad idx={idx} bruker={bruker} userSort={props.userSort} key={idx} />)}
		</tbody>
    );
};
