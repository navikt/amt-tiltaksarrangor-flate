import React from 'react'

import {
	finnNesteSorteringType,
	mapSortDirectionToClassName,
	mapSortDirectionToText,
	SorteringType,
} from '../../../../utils/sortering-utils'
import styles from './TabellHeader.module.less'
import { BrukerSortering, Kolonnenavn } from './types'

interface TableHeaderProps {
	title: string;
	name: Kolonnenavn;
	sortering?: BrukerSortering;
	onSortChange: (sortering: BrukerSortering) => void;
}

const SortableHeader = (props: TableHeaderProps): React.ReactElement<TableHeaderProps> => {
	const { title, name, sortering, onSortChange } = props
	const sorteringType = name === sortering?.kolonnenavn ? sortering.sorteringType : SorteringType.NONE

	const nesteSorteringType = finnNesteSorteringType(sorteringType)
	const ariaLabel = `Sorter ${title} ${mapSortDirectionToText(nesteSorteringType)}`

	return (
		<th role="columnheader" className={mapSortDirectionToClassName(sorteringType)} aria-sort={sorteringType}>
			<button
				className={styles.header}
				aria-label={ariaLabel}
				onClick={() => onSortChange({ sorteringType: nesteSorteringType, kolonnenavn: name })}
			>
				{title}
			</button>
		</th>
	)
}

interface UserTableHeaderProps {
	sortering?: BrukerSortering;
	onSortChange: (sortering: BrukerSortering) => void;
}

export const TabellHeader = (props: UserTableHeaderProps): React.ReactElement<UserTableHeaderProps> => {
	const { sortering, onSortChange } = props
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
				<SortableHeader sortering={sortering} onSortChange={onSortChange} title="Søkt inn" name={Kolonnenavn.REGDATO} />
				<SortableHeader sortering={sortering} onSortChange={onSortChange} title="Status" name={Kolonnenavn.STATUS} />
			</tr>
		</thead>
	)
}
