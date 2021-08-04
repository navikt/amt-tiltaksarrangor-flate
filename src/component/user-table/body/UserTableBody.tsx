import React from 'react';
import { UserRow } from './UserTableRow';
import { Bruker } from '../../../rest/data/bruker';
import './UserTableBody.less';

interface UserTableBodyProps {
	brukere: Bruker[];
}

export const UserTableBody = (props: UserTableBodyProps) => {
    return (
	    <div role="rowgroup" className="user-table-body">
		    {props.brukere.map((bruker, idx) => <UserRow idx={idx} bruker={bruker} key={idx} />)}
	    </div>
    );
};
