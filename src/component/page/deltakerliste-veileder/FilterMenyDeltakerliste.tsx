import { Checkbox, CheckboxGroup, Panel } from '@navikt/ds-react'
import React from 'react'

import { useTiltaksoversiktSokStore } from '../../../store/tiltaksoversikt-sok-store'
import { klikkFilterMeny, loggKlikk } from '../../../utils/amplitude-utils'
import styles from './FilterMenyDeltakerliste.module.scss'

interface Props {
	deltakerlisteMap: Map<string, number>
	className?: string
}

export const FilterMenyDeltakerliste = (props: Props): React.ReactElement => {
	const {
		deltakerlisteFilter,
		leggTilDeltakerliste,
		fjernFraDeltakerliste,
	} = useTiltaksoversiktSokStore()

	const unikeNavn =[ ...props.deltakerlisteMap.keys() ]

	const DeltakerlisteCheckbox = ({ navn } : { navn: string }) => {
		const antallDeltakere = props.deltakerlisteMap.get(navn) ?? 0

		return  (
			<Checkbox
				className={styles.checkbox}
				name="filter-deltakerliste"
				checked={deltakerlisteFilter.includes(navn)}
				onChange={(e) => {
					if (e.target.checked) {
						leggTilDeltakerliste(navn)
						loggKlikk(klikkFilterMeny, navn, 'checked')
					} else {
						fjernFraDeltakerliste(navn)
						loggKlikk(klikkFilterMeny, navn, 'unchecked')
					}
				}}
				value={navn}
			>
				<span className={styles.content}>
					<span>{navn}</span>
					<span className={styles.occurrences}>{antallDeltakere}</span>
				</span>
			</Checkbox>
		)
	}

	return (
		<Panel border className={props.className}>
			<CheckboxGroup legend="Deltakerliste" aria-label="Filtrer deltakere på deltakerliste">
				{unikeNavn.map((navn) => (
					<DeltakerlisteCheckbox navn={navn} key={navn}/>
				))}
			</CheckboxGroup>
		</Panel>
	)
}
