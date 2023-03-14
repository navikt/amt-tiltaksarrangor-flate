import { Checkbox, CheckboxGroup, Panel } from '@navikt/ds-react'
import React from 'react'

import { TiltakDeltakerStatus } from '../../../api/data/deltaker'
import { useTiltaksoversiktSokStore } from '../../../store/tiltaksoversikt-sok-store'
import { klikkFilterMeny, loggKlikk } from '../../../utils/amplitude-utils'
import { mapTiltakDeltagerStatusTilTekst } from '../../../utils/text-mappers'
import styles from './FilterMenyStatus.module.scss'

interface Props {
	statusMap: Map<TiltakDeltakerStatus, number>
	className?: string
}

export const FilterMenyStatus = (props: Props): React.ReactElement => {
	const {
		tiltakStatusFilter,
		leggTilTiltakStatus,
		fjernFraTiltakStatus,
	} = useTiltaksoversiktSokStore()

	const StatusCheckbox = ({ status } : {status: TiltakDeltakerStatus}) => {
		const statusTekst = mapTiltakDeltagerStatusTilTekst(status)
		const antallDeltakere = props.statusMap.get(status) ?? 0
		return (
			<Checkbox
				className={styles.checkbox}
				name="filter-tiltakstatus"
				onChange={(e) => {
					if (e.target.checked) {
						leggTilTiltakStatus(status)
						loggKlikk(klikkFilterMeny, status, 'checked')
					} else {
						fjernFraTiltakStatus(status)
						loggKlikk(klikkFilterMeny, status, 'unchecked')
					}
				}}
				value={status}
			>
				<span className={styles.content}>
					<span>{statusTekst}</span>
					<span className={styles.occurrences}>{antallDeltakere}</span>
				</span>
			</Checkbox>
		)
	}

	return (
		<Panel border className={props.className}>
			<CheckboxGroup legend="Status" aria-label="Filtrer deltakere på status" value={tiltakStatusFilter}>
				{Object.values(TiltakDeltakerStatus).map((status) => (
					<StatusCheckbox status={status} key={status}/>
				))}
			</CheckboxGroup>
		</Panel>
	)
}
