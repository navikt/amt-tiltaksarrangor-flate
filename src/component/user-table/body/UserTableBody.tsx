import React from 'react';
import { UserRow } from './UserTableRow';
import { Bruker } from '../../../api/data/bruker';
import { UserSort } from '../header/UserTableHeader';

interface UserTableBodyProps {
	userSort?: UserSort;
	brukere: Bruker[];
}

export const UserTableBody = (props: UserTableBodyProps) => {
    return (
	    <tbody>
		    {props.brukere.map((bruker, idx) => <UserRow idx={idx} bruker={bruker} userSort={props.userSort} key={idx} />)}
		</tbody>
    );
};
