import React from 'react';
import { UserTableHeader } from './header/UserTableHeader';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { UserTableBody } from './body/UserTableBody';
import { OrderByData } from './table-utils';
import './UserTable.less';
import { OrderByDirection, OrderByField } from './types';
import { mockBrukere } from '../../mock/data/brukere';

export const UserTable = () => {
	const orderByData: OrderByData = {
		field: OrderByField.NAVN,
		direction: OrderByDirection.ASC
	};

	function handleOnOrderByChanged(nyData: OrderByData) {
		// setOrderByField(nyData.field);
		// setOrderByDirection(nyData.direction);
	}

    return (
    	<div role="table" aria-label="Brukere som har tiltak" aria-rowcount={mockBrukere.length} className="user-table">
		    <UserTableHeader orderByData={orderByData} onOrderByChanged={handleOnOrderByChanged} />
		    {
			    mockBrukere.length === 0
				    ? (
					    <AlertStripeInfo className="user-table__no-users">
						    <span role="alert" aria-live="polite">Fant ingen brukere</span>
					    </AlertStripeInfo>
			        )
				    : <UserTableBody brukere={mockBrukere} />
		    }
	    </div>
    );
};
