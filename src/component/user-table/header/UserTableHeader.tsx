import React from 'react';

export enum SortDirection {
	ASCENDING = 'ascending',
	DESCENDING = 'descending',
	NONE = 'none'
}

export enum TableHeaderName {
	NAVN = 'NAVN',
	FODSELSDATO = 'FODSELSDATO',
	TILTAKSTYPE = 'TILTAKSTYPE',
	TILTAK = 'TILTAK',
	STATUS = 'STATUS',
	START = 'START',
	SLUTT = 'SLUTT'
}

export interface UserSort {
	name: TableHeaderName;
	sortDirection: SortDirection;
}

interface TableHeaderProps {
	title: string;
	name: TableHeaderName;
	userSort?: UserSort;
	onSortChange: (sortedHeader: UserSort) => void;
}

const mapSortDirectionToText = (sortDirection: SortDirection): string => {
	switch (sortDirection) {
		case SortDirection.ASCENDING:
			return 'stigende';
		case SortDirection.DESCENDING:
			return 'synkende';
		default:
			return '';
	}
};

const mapSortDirectionToClassName = (sortDirection: SortDirection): string => {
	switch (sortDirection) {
		case SortDirection.ASCENDING:
			return 'tabell__th--sortert-asc';
		case SortDirection.DESCENDING:
			return 'tabell__th--sortert-desc';
		default:
			return '';
	}
};

const getNextSortDirection = (sortDirection: SortDirection): SortDirection => {
	switch (sortDirection) {
		case SortDirection.ASCENDING:
			return SortDirection.DESCENDING;
		case SortDirection.DESCENDING:
			return SortDirection.NONE;
		default:
			// This will be the default sort direction
			return SortDirection.ASCENDING;
	}
};

const TableHeader = (props: TableHeaderProps) => {
	const { title, name, userSort, onSortChange } = props;
	const sortDirection = name === userSort?.name
		? userSort.sortDirection
		: SortDirection.NONE;

	const nextSortDirection = getNextSortDirection(sortDirection);
	const ariaLabel = `Sorter ${title} ${mapSortDirectionToText(nextSortDirection)}`;

	return (
		<th role="columnheader" className={mapSortDirectionToClassName(sortDirection)} aria-sort={sortDirection}>
			<button aria-label={ariaLabel} onClick={() => onSortChange({ sortDirection: nextSortDirection, name })}>{title}</button>
		</th>
	);
};

interface UserTableHeaderProps {
	userSort?: UserSort;
	onSortChange: (sortedHeader: UserSort) => void;
}

export const UserTableHeader = (props: UserTableHeaderProps) => {
	const { userSort, onSortChange } = props;
	return (
		<thead>
		    <tr>
			    {/* TODO: Er mulig å gjøre koden mer DRY på bekostning av kompleksitet */}
			    <TableHeader userSort={userSort} onSortChange={onSortChange} title="Etternavn, Fornavn" name={TableHeaderName.NAVN}/>
			    <TableHeader userSort={userSort} onSortChange={onSortChange} title="Fødselsdato" name={TableHeaderName.FODSELSDATO}/>
			    <TableHeader userSort={userSort} onSortChange={onSortChange} title="Tiltakstype" name={TableHeaderName.TILTAKSTYPE}/>
			    <TableHeader userSort={userSort} onSortChange={onSortChange} title="Tiltak" name={TableHeaderName.TILTAK}/>
			    <TableHeader userSort={userSort} onSortChange={onSortChange} title="Status" name={TableHeaderName.STATUS}/>
				<TableHeader userSort={userSort} onSortChange={onSortChange} title="Start" name={TableHeaderName.START}/>
				<TableHeader userSort={userSort} onSortChange={onSortChange} title="Slutt" name={TableHeaderName.SLUTT}/>
				<th role="columnheader"/>
		    </tr>
		</thead>
    );
};