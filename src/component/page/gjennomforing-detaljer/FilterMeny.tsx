import { Checkbox, CheckboxGroup, Panel } from '@navikt/ds-react'
import React from 'react'

import { TiltakDeltakerStatus } from '../../../api/data/deltaker'
import { useTiltaksoversiktSokStore } from '../../../store/tiltaksoversikt-sok-store'
import { klikkFilterMeny, loggKlikk } from '../../../utils/amplitude-utils'
import { mapTiltakDeltagerStatusTilTekst } from '../../../utils/text-mappers'
import styles from './FilterMeny.module.scss'

interface Props {
	statusMap: Map<TiltakDeltakerStatus, number>
	className?: string
}

export const FilterMeny = (props: Props): React.ReactElement => {
	const {
		tiltakStatusFilter,
		leggTilTiltakStatus,
		fjernFraTiltakStatus,
	} = useTiltaksoversiktSokStore()

	const StatusCheckbox = ({ status } : {status: TiltakDeltakerStatus}) => {
		const statusTekst = mapTiltakDeltagerStatusTilTekst(status)
		const antallDeltakere = props.statusMap.get(status) ?? 0
		return  (
			<Checkbox
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
				value={statusTekst}
			>
				<div className={styles.content} aria-label={`Filtrer på status ${statusTekst}, ${antallDeltakere} deltakere`}>
					<span>{statusTekst}</span>
					<span className={styles.occurrences}>{antallDeltakere}</span>
				</div>
			</Checkbox>
		)
	}

	return (
		<Panel border className={props.className}>
			<CheckboxGroup legend="Status" aria-label="Filtrer deltakere på status">
				{Object.values(TiltakDeltakerStatus).map((status) => (
					<StatusCheckbox status={status} key={status}/>
				))}
			</CheckboxGroup>
		</Panel>
	)
}
