import { Checkbox, CheckboxGroup, Panel } from '@navikt/ds-react'
import React from 'react'

import { useTiltaksoversiktSokStore } from '../../../store/tiltaksoversikt-sok-store'
import { klikkFilterMeny, loggKlikk } from '../../../utils/amplitude-utils'
import styles from './FilterMenyDeltakerliste.module.scss'

interface Props {
	erMedveilederMap: Map<boolean, number>
	className?: string
}

export const FilterMenyVeiledertype = (props: Props): React.ReactElement => {
	const {
		erMedveilederFilter,
		leggTilMedveileder,
		fjernFraMedveileder,
	} = useTiltaksoversiktSokStore()

	const VeiledertypeCheckbox = ({ erMedveileder } : { erMedveileder: boolean }) => {
		const antallDeltakere = props.erMedveilederMap.get(erMedveileder) ?? 0
		const medveilederTekstverdi = medveilederTekst(erMedveileder)

		return  (
			<Checkbox
				className={styles.checkbox}
				name="filter-veiledertype"
				checked={erMedveilederFilter.includes(erMedveileder)}
				onChange={(e) => {
					if (e.target.checked) {
						leggTilMedveileder(erMedveileder)
						loggKlikk(klikkFilterMeny, medveilederTekstverdi, 'checked')
					} else {
						fjernFraMedveileder(erMedveileder)
						loggKlikk(klikkFilterMeny, medveilederTekstverdi, 'unchecked')
					}
				}}
				value={medveilederTekstverdi}
			>
				<span className={styles.content}>
					<span>{medveilederTekstverdi}</span>
					<span className={styles.occurrences}>{antallDeltakere}</span>
				</span>
			</Checkbox>
		)
	}

	return (
		<Panel border className={props.className}>
			<CheckboxGroup legend="Type veileder" aria-label="Filtrer deltakere på veiledertype">
				{[ false, true ].map((erMedveileder) => (
					<VeiledertypeCheckbox erMedveileder={erMedveileder} key={medveilederTekst((erMedveileder))}/>
				))}
			</CheckboxGroup>
		</Panel>
	)
}

const medveilederTekst = (erMedveileder: boolean) => erMedveileder ? 'Medveileder' : 'Veileder'
