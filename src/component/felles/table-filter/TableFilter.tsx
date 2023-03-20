import { Checkbox, CheckboxGroup } from '@navikt/ds-react'
import React, { useEffect, useState } from 'react'
import styles from './TableFilter.module.scss'
import { CollapsablePanel } from '../closable-panel/CollapsablePanel'

interface Props {
	navn: string,
	dataMap: Map<string, number>
	className?: string
	filter: string[]
	addFilter: (f: string) => void
	removeFilter: (f: string) => void
}


export const TableFilter = (props: Props) => {
	const [ unikeNavn, setUnikeNavn ] = useState<string[]>([])

	useEffect(() => {
		setUnikeNavn([ ...props.dataMap.keys() ])
	}, [ props.dataMap ])

	const FilterCheckbox = ({ navn }: { navn: string }) => {
		const antall = props.dataMap.get(navn)

		return (
			<Checkbox
				className={styles.checkbox}
				name="filter-tiltakstatus"
				onChange={(e) => {
					if (e.target.checked) {
						props.addFilter(navn)
					} else {
						props.removeFilter(navn)
					}
				}}
				value={navn}
			>
				<span className={styles.content}>
					<span>{navn}</span>
					<span className={styles.occurrences}>{antall}</span>
				</span>
			</Checkbox>
		)
	}

	return (
		<CollapsablePanel title={props.navn}>
			<CheckboxGroup legend="" aria-label="Filtrer deltakere på status" value={props.filter}>
				{unikeNavn.map((navn) => (
					<FilterCheckbox navn={navn} key={navn}/>
				))}
			</CheckboxGroup>
		</CollapsablePanel>
	)

}
