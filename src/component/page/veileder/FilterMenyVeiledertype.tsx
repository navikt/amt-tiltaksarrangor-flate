import { Checkbox, CheckboxGroup, Panel } from '@navikt/ds-react'
import React from 'react'

import { useTiltaksoversiktSokStore } from '../../../store/tiltaksoversikt-sok-store'
import { klikkVeiledertypeFilterMeny, loggKlikk } from '../../../utils/amplitude-utils'
import styles from './FilterMenyDeltakerliste.module.scss'
import { Veiledertype } from '../../../api/data/veileder'

interface Props {
	veiledertypeMap: Map<Veiledertype, number>
	className?: string
}

export const FilterMenyVeiledertype = (props: Props): React.ReactElement => {
	const {
		veiledertypeFilter,
		leggTilVeiledertype,
		fjernFraVeiledertype,
	} = useTiltaksoversiktSokStore()

	const VeiledertypeCheckbox = ({ veiledertype } : { veiledertype: Veiledertype }) => {
		const antallDeltakere = props.veiledertypeMap.get(veiledertype) ?? 0

		return  (
			<Checkbox
				className={styles.checkbox}
				name="filter-veiledertype"
				onChange={(e) => {
					if (e.target.checked) {
						leggTilVeiledertype(veiledertype)
						loggKlikk(klikkVeiledertypeFilterMeny, veiledertype, 'checked')
					} else {
						fjernFraVeiledertype(veiledertype)
						loggKlikk(klikkVeiledertypeFilterMeny, veiledertype, 'unchecked')
					}
				}}
				value={veiledertype.valueOf()}
			>
				<span className={styles.content}>
					<span>{getVeiledertypeVisningsnavn(veiledertype)}</span>
					<span className={styles.occurrences}>{antallDeltakere}</span>
				</span>
			</Checkbox>
		)
	}

	return (
		<Panel border className={props.className}>
			<CheckboxGroup legend="Type veileder" aria-label="Filtrer deltakere på veiledertype" value={veiledertypeFilter}>
				<VeiledertypeCheckbox veiledertype={Veiledertype.VEILEDER} key={Veiledertype.VEILEDER}/>
				<VeiledertypeCheckbox veiledertype={Veiledertype.MEDVEILEDER} key={Veiledertype.MEDVEILEDER}/>
			</CheckboxGroup>
		</Panel>
	)
}

const getVeiledertypeVisningsnavn = (veiledertype: Veiledertype) : string => {
	return veiledertype.substring(0,1).toUpperCase() + veiledertype.substring(1).toLowerCase()
}
