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

export interface BrukerSortering {
	name: TableHeaderName;
	sortDirection: SortDirection;
}

interface TableHeaderProps {
	title: string;
	name: TableHeaderName;
	sortering?: BrukerSortering;
	onSortChange: (sortering: BrukerSortering) => void;
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

const SortableHeader = (props: TableHeaderProps) => {
	const { title, name, sortering, onSortChange } = props;
	const sortDirection = name === sortering?.name
		? sortering.sortDirection
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
	sortering?: BrukerSortering;
	onSortChange: (sortedHeader: BrukerSortering) => void;
}

export const TabellHeader = (props: UserTableHeaderProps) => {
	const { sortering, onSortChange } = props;
	return (
		<thead>
		    <tr>
			    {/* TODO: Er mulig å gjøre koden mer DRY på bekostning av kompleksitet */}
			    <SortableHeader sortering={sortering} onSortChange={onSortChange} title="Etternavn, Fornavn" name={TableHeaderName.NAVN}/>
			    <SortableHeader sortering={sortering} onSortChange={onSortChange} title="Fødselsdato" name={TableHeaderName.FODSELSDATO}/>
			    <SortableHeader sortering={sortering} onSortChange={onSortChange} title="Tiltakstype" name={TableHeaderName.TILTAKSTYPE}/>
			    <SortableHeader sortering={sortering} onSortChange={onSortChange} title="Tiltak" name={TableHeaderName.TILTAK}/>
			    <SortableHeader sortering={sortering} onSortChange={onSortChange} title="Status" name={TableHeaderName.STATUS}/>
				<SortableHeader sortering={sortering} onSortChange={onSortChange} title="Start" name={TableHeaderName.START}/>
				<SortableHeader sortering={sortering} onSortChange={onSortChange} title="Slutt" name={TableHeaderName.SLUTT}/>
				<th/>
		    </tr>
		</thead>
    );
};