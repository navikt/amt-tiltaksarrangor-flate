import { Checkbox, CheckboxGroup } from '@navikt/ds-react'
import React from 'react'
import styles from './TableFilter.module.scss'
import { CollapsablePanel } from '../closable-panel/CollapsablePanel'
import { FiltermenyDataEntry } from './filtermeny-data-entry'

interface Props {
	navn: string,
	data: FiltermenyDataEntry[]
	className?: string
	filter: string[]
	addFilter: (f: string) => void
	removeFilter: (f: string) => void
}

export const FilterMeny = (props: Props) => {
	const FilterCheckbox = (entry: FiltermenyDataEntry) => {
		return (
			<Checkbox
				className={styles.checkbox}
				name="filter-tiltakstatus"
				onChange={(e) => {
					if (e.target.checked) {
						props.addFilter(entry.id)
					} else {
						props.removeFilter(entry.id)
					}
				}}
				value={entry.id}
			>
				<span className={styles.content}>
					<span>{entry.displayName}</span>
					<span className={styles.occurrences}>{entry.entries}</span>
				</span>
			</Checkbox>
		)
	}

	return (
		<CollapsablePanel title={props.navn}>
			<CheckboxGroup legend="" aria-label="Filtrer deltakere på status" value={props.filter}>
				{props.data.map((e: FiltermenyDataEntry) => (
					<FilterCheckbox key={e.id} id={e.id} displayName={e.displayName} entries={e.entries}/>
				))}
			</CheckboxGroup>
		</CollapsablePanel>
	)

}
