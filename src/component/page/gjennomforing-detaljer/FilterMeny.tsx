import { Checkbox, CheckboxGroup, Panel } from '@navikt/ds-react'
import React from 'react'

import { TiltakDeltakerStatus } from '../../../api/data/deltaker'
import { useTiltaksoversiktSokStore } from '../../../store/tiltaksoversikt-sok-store'
import { klikkFilterMeny, loggKlikk } from '../../../utils/amplitude-utils'
import { mapTiltakDeltagerStatusTilTekst } from '../../../utils/text-mappers'
import styles from './FilterMeny.module.scss'

interface Props {
	statusMap: Map<TiltakDeltakerStatus, number>
}

export const FilterMeny = (props: Props): React.ReactElement => {
	const {
		tiltakStatusFilter,
		leggTilTiltakStatus,
		fjernFraTiltakStatus,
	} = useTiltaksoversiktSokStore()

	return (
		<Panel border>
			<CheckboxGroup legend="Status">
				{Object.values(TiltakDeltakerStatus).map((status) => (
					<Checkbox
						key={status}
						className={styles.checkbox}
						name="filter-tiltakstatus"
						checked={tiltakStatusFilter.includes(status)}
						onChange={(e) => {
							if (e.target.checked) {
								leggTilTiltakStatus(status)
								loggKlikk(klikkFilterMeny, status, 'checked')

							} else {
								fjernFraTiltakStatus(status)
								loggKlikk(klikkFilterMeny, status, 'unchecked')
							}
						}}
						value={mapTiltakDeltagerStatusTilTekst(status) }
					>
						<span>{mapTiltakDeltagerStatusTilTekst(status)}</span>
						<span className={styles.occurrences}>{props.statusMap.get(status) ?? 0}</span>
					</Checkbox>
				))}
			</CheckboxGroup>
		</Panel>
	)
}
