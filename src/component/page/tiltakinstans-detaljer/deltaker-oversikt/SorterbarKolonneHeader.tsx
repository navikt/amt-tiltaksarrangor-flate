import React from 'react'

import { useTiltaksoversiktSokStore } from '../../../../store/tiltaksoversikt-sok-store'
import {
	finnNesteSorteringType,
	mapSortDirectionToClassName,
	mapSortDirectionToText,
} from '../../../../utils/sortering-utils'
import styles from './SorterbarKolonneHeader.module.less'
import { DeltakerKolonneNavn } from './types'

interface SortableHeaderProps {
    kolonne: DeltakerKolonneNavn;
}

export const SorterbarKolonneHeader = (props: SortableHeaderProps) : JSX.Element => {
	const { kolonne } = props
	const { deltakerSortering, setDeltakerSortering } = useTiltaksoversiktSokStore()
	const kolonneNavn = kolonne.valueOf()
	const nesteSorteringType = finnNesteSorteringType(deltakerSortering.type)
	const ariaLabel = `Sorter ${kolonneNavn} ${mapSortDirectionToText(nesteSorteringType)}`

	return (
		<th role="columnheader" className={mapSortDirectionToClassName(deltakerSortering.type)} aria-sort={deltakerSortering.type}>
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