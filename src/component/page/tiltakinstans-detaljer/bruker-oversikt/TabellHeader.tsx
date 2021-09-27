import React from 'react';

import {
	SorteringType,
	finnNesteSorteringType,
	mapSortDirectionToClassName,
	mapSortDirectionToText,
} from '../../../../utils/sortering-utils';
import { BrukerSortering, Kolonnenavn } from './types';

interface TableHeaderProps {
	title: string;
	name: Kolonnenavn;
	sortering?: BrukerSortering;
	onSortChange: (sortering: BrukerSortering) => void;
}

const SortableHeader = (props: TableHeaderProps) => {
	const { title, name, sortering, onSortChange } = props;
	const sorteringType = name === sortering?.kolonnenavn ? sortering.sorteringType : SorteringType.NONE;

	const nesteSorteringType = finnNesteSorteringType(sorteringType);
	const ariaLabel = `Sorter ${title} ${mapSortDirectionToText(nesteSorteringType)}`;

	return (
		<th role="columnheader" className={mapSortDirectionToClassName(sorteringType)} aria-sort={sorteringType}>
			<button
				aria-label={ariaLabel}
				onClick={() => onSortChange({ sorteringType: nesteSorteringType, kolonnenavn: name })}
			>
				{title}
			</button>
		</th>
	);
};

interface UserTableHeaderProps {
	sortering?: BrukerSortering;
	onSortChange: (sortering: BrukerSortering) => void;
}

export const TabellHeader = (props: UserTableHeaderProps) => {
	const { sortering, onSortChange } = props;
	return (
		<thead>
			<tr>
				<SortableHeader
					sortering={sortering}
					onSortChange={onSortChange}
					title="Etternavn, Fornavn"
					name={Kolonnenavn.NAVN}
				/>
				<SortableHeader
					sortering={sortering}
					onSortChange={onSortChange}
					title="Fødselsnummer"
					name={Kolonnenavn.FODSELSNUMMER}
				/>

				<SortableHeader sortering={sortering} onSortChange={onSortChange} title="Start" name={Kolonnenavn.START} />
				<SortableHeader sortering={sortering} onSortChange={onSortChange} title="Slutt" name={Kolonnenavn.SLUTT} />
				<SortableHeader sortering={sortering} onSortChange={onSortChange} title="Status" name={Kolonnenavn.STATUS} />
			</tr>
		</thead>
	);
};
