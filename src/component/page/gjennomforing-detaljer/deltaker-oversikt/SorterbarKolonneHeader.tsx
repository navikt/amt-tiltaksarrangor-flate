import { Table } from '@navikt/ds-react'
import React from 'react'

import { useTiltaksoversiktSokStore } from '../../../../store/tiltaksoversikt-sok-store'
import { finnNesteSorteringType, mapSortDirectionToText, SorteringType, } from '../../../../utils/sortering-utils'
import styles from './SorterbarKolonneHeader.module.scss'
import { DeltakerKolonneNavn } from './types'

interface SortableHeaderProps {
    kolonne: DeltakerKolonneNavn;
}

export const SorterbarKolonneHeader = (props: SortableHeaderProps) : JSX.Element => {
	const { kolonne } = props
	const { deltakerSortering, setDeltakerSortering } = useTiltaksoversiktSokStore()
	const kolonneNavn = kolonne.valueOf()
	const sortertKolonne = deltakerSortering.kolonne === kolonne
	const nesteSorteringType = sortertKolonne? finnNesteSorteringType(deltakerSortering.type): SorteringType.NONE
	const ariaLabel = `Sorter ${kolonneNavn} ${mapSortDirectionToText(nesteSorteringType)}`

	const getClass = (): string => {
		if (deltakerSortering.kolonne !== kolonne) return ''
		if (deltakerSortering.type === SorteringType.ASCENDING) return 'tabell__th--sortert-asc'
		if (deltakerSortering.type === SorteringType.DESCENDING) return 'tabell__th--sortert-desc'
		return ''
	}

	return (
		<Table.HeaderCell role="columnheader" className={getClass()} aria-sort={deltakerSortering.type}>
			<button
				className={styles.header}
				aria-label={ariaLabel}
				onClick={() => setDeltakerSortering({ type: nesteSorteringType, kolonne: kolonne })}
			>
				{kolonneNavn}
			</button>
		</Table.HeaderCell>
	)
}