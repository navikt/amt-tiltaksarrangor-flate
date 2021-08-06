import React from 'react';
import { UserRow } from './UserTableRow';
import { Bruker } from '../../../api/data/bruker';

interface UserTableBodyProps {
	brukere: Bruker[];
}

export const UserTableBody = (props: UserTableBodyProps) => {
    return (
	    <tbody>
		    {props.brukere.map((bruker, idx) => <UserRow idx={idx} bruker={bruker} key={idx} />)}
		</tbody>
    );
};
