import { Checkbox, CheckboxGroup, ExpansionCard } from '@navikt/ds-react'
import React from 'react'
import styles from './TableFilter.module.scss'
import { FiltermenyDataEntry } from './filtermeny-data-entry'

interface Props {
	navn: string,
	data: FiltermenyDataEntry[]
	className?: string
	filter: string[]
	open: boolean
	onToggle: (f: boolean) => void
	updateFilter: (f: string[]) => void
}

const FilterCheckbox = (entry: FiltermenyDataEntry) => {
	return (
		<Checkbox
			className={styles.checkbox}
			value={entry.id}
		>
			<span className={styles.content}>
				<span>{entry.displayName}</span>
				<span className={styles.occurrences}>{entry.antallDeltakere}</span>
			</span>
		</Checkbox>
	)
}

export const FilterMeny = (props: Props) => {
	return (
		<ExpansionCard
			className={styles.expansionCard}
			size="small"
			aria-label={props.navn}
			open={props.open}
			onToggle={props.onToggle}
		>
			<ExpansionCard.Header>
				<ExpansionCard.Title size="small" as="h4" >{props.navn}</ExpansionCard.Title>
			</ExpansionCard.Header>

			<ExpansionCard.Content className={styles.expansionContent} >
				<CheckboxGroup
					legend=""
					className={styles.checkboxGroup}
					aria-label={`Filtrer deltakere på ${props.navn}`}
					value={props.filter}
					onChange={(newFilter: string[]) => props.updateFilter(newFilter)}
				>
					{props.data.map((e: FiltermenyDataEntry) => (
						<FilterCheckbox key={e.id} id={e.id} displayName={e.displayName} antallDeltakere={e.antallDeltakere} />
					))}
				</CheckboxGroup>
			</ExpansionCard.Content>
		</ExpansionCard>
	)
}
