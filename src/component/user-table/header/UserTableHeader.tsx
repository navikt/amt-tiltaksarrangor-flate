import React from 'react';
import cls from 'classnames';
import { INITIAL_DIRECTION, OnOrderByChanged, OrderByData, toggleOrderByDirection } from '../table-utils';
import arrowDownIcon from './arrow-down.svg';
import './UserTableHeader.less';
import { OrderByDirection, OrderByField as HeaderFieldName } from '../types';
import { Show } from '../../felles/Show';

interface UserTableHeaderProps {
	onOrderByChanged: OnOrderByChanged;
	orderByData: OrderByData;
}

export const UserTableHeader = (props: UserTableHeaderProps) => {
	const { orderByData, onOrderByChanged } = props;

	const handleOnOrderByChanged = (fieldName: HeaderFieldName) => {
		const newOrderByData: OrderByData = {
			field: fieldName,
			direction: INITIAL_DIRECTION
		};

		if (fieldName === orderByData.field) {
			newOrderByData.direction = toggleOrderByDirection(orderByData.direction);
		}

		onOrderByChanged(newOrderByData);
	}

    return (
    	<div role="rowgroup">
		    <div role="row" className="user-table-header">
			    <HeaderField name={HeaderFieldName.NAVN} text="Etternavn, Fornavn" orderByData={orderByData} onOrderByChanged={handleOnOrderByChanged} />
			    <HeaderField name={HeaderFieldName.FODSELSDATO} text="Fodselsdato" orderByData={orderByData} onOrderByChanged={handleOnOrderByChanged} />
			    <HeaderField name={HeaderFieldName.TILTAK_TYPE} text="Tiltakstype" orderByData={orderByData} onOrderByChanged={handleOnOrderByChanged} />
			    <HeaderField name={HeaderFieldName.TILTAK} text="Tiltak" orderByData={orderByData} onOrderByChanged={handleOnOrderByChanged} />
			    <HeaderField name={HeaderFieldName.TILTAK_STATUS} text="Status" orderByData={orderByData} onOrderByChanged={handleOnOrderByChanged} />
		    </div>
	    </div>
    );
};

interface HeaderFieldProps {
	name: HeaderFieldName;
	text: string;
	orderByData: OrderByData;
	onOrderByChanged: (fieldName: HeaderFieldName) => void;
}

const HeaderField = (props: HeaderFieldProps) => {
	const { name, text, orderByData, onOrderByChanged } = props;
	const alt = 'Sortert ' + (orderByData.direction === OrderByDirection.ASC ? 'økende' : 'synkenede');
	const iconClasses = cls('table-header-field__order-icon', {
		'table-header-field__order-icon--asc': orderByData.direction === OrderByDirection.ASC
	});

	const ariaSort = name === orderByData.field && orderByData.direction
			? (orderByData.direction === OrderByDirection.ASC ? 'ascending' : 'descending')
			: 'none';

	return (
		<button role="columnheader" aria-sort={ariaSort} onClick={() => onOrderByChanged(name)} className="table-header-field">
			{text}
			<Show if={orderByData.field === name && orderByData.direction !== undefined}>
				<img className={iconClasses} src={arrowDownIcon} alt={alt} />
			</Show>
		</button>
	);
};
