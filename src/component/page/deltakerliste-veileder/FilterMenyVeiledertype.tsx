import { Checkbox, CheckboxGroup, Panel } from '@navikt/ds-react'
import React from 'react'

import { useTiltaksoversiktSokStore } from '../../../store/tiltaksoversikt-sok-store'
import { klikkFilterMeny, loggKlikk } from '../../../utils/amplitude-utils'
import styles from './FilterMenyDeltakerliste.module.scss'

interface Props {
	veiledertypeMap: Map<string, number>
	className?: string
}

export const FilterMenyVeiledertype = (props: Props): React.ReactElement => {
	const {
		veiledertypeFilter,
		leggTilVeiledertype,
		fjernFraVeiledertype,
	} = useTiltaksoversiktSokStore()

	const veilederytyper =[ ...props.veiledertypeMap.keys() ]

	const VeiledertypeCheckbox = ({ veiledertype } : { veiledertype: string }) => {
		const antallDeltakere = props.veiledertypeMap.get(veiledertype) ?? 0

		return  (
			<Checkbox
				className={styles.checkbox}
				name="filter-veiledertype"
				checked={veiledertypeFilter.includes(veiledertype)}
				onChange={(e) => {
					if (e.target.checked) {
						leggTilVeiledertype(veiledertype)
						loggKlikk(klikkFilterMeny, veiledertype, 'checked')
					} else {
						fjernFraVeiledertype(veiledertype)
						loggKlikk(klikkFilterMeny, veiledertype, 'unchecked')
					}
				}}
				value={veiledertype}
			>
				<span className={styles.content}>
					<span>{veiledertype}</span>
					<span className={styles.occurrences}>{antallDeltakere}</span>
				</span>
			</Checkbox>
		)
	}

	return (
		<Panel border className={props.className}>
			<CheckboxGroup legend="Type veileder" aria-label="Filtrer deltakere på veiledertype">
				{veilederytyper.map((veiledertype) => (
					<VeiledertypeCheckbox veiledertype={veiledertype} key={veiledertype}/>
				))}
			</CheckboxGroup>
		</Panel>
	)
}
