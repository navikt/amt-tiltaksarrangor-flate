import React from 'react'

import { useTiltaksoversiktSokStore } from '../../../../store/tiltaksoversikt-sok-store'
import {
	finnNesteSorteringType,
	mapSortDirectionToText, SorteringType,
} from '../../../../utils/sortering-utils'
import styles from './SorterbarKolonneHeader.module.less'
import { DeltakerKolonneNavn, DeltakerSortering } from './types'

interface SortableHeaderProps {
    kolonne: DeltakerKolonneNavn;
}

export const SorterbarKolonneHeader = (props: SortableHeaderProps) : JSX.Element => {
	const { kolonne } = props
	const { deltakerSortering, setDeltakerSortering } = useTiltaksoversiktSokStore()
	const kolonneNavn = kolonne.valueOf()
	const nesteSorteringType = finnNesteSorteringType(deltakerSortering.type)
	const ariaLabel = `Sorter ${kolonneNavn} ${mapSortDirectionToText(nesteSorteringType)}`

	const getClass = (sortering: DeltakerSortering, kolonne: DeltakerKolonneNavn): string => {
		if (sortering.kolonne !== kolonne) return ''
		if (sortering.type === SorteringType.ASCENDING) return 'tabell__th--sortert-asc'
		if (sortering.type === SorteringType.DESCENDING) return 'tabell__th--sortert-desc'
		return ''
	}

	return (
		<th role="columnheader" className={getClass(deltakerSortering, kolonne)} aria-sort={deltakerSortering.type}>
			<button
				className={styles.header}
				aria-label={ariaLabel}
				onClick={() => setDeltakerSortering({ type: nesteSorteringType, kolonne: kolonne })}
			>
				{kolonneNavn}
			</button>
		</th>
	)
}