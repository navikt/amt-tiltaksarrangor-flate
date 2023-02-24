import { CheckboxGroup, Table } from '@navikt/ds-react'
import React, { useEffect, useState } from 'react'
import { TiltakDeltaker } from '../../../api/data/deltaker'
import { Sortering } from '../../../utils/sortering-utils'
import { TabellBody } from './TabellBody'
import { TabellHeader } from './TabellHeader'

export enum TabellType {
	VEILEDER,
	KOORDINATOR,
}

interface Props {
	deltakere: TiltakDeltaker[]
	sortering: Sortering | undefined
	onSortChange: (v: string | undefined) => void
	visning: TabellType
	visCheckBox?: boolean
	onChange?: (val: string[]) => void
}

export const DeltakerTabell = ({
	deltakere,
	sortering,
	onSortChange,
	visning,
	visCheckBox,
	onChange,
}: Props) => {
	const size = visning === TabellType.KOORDINATOR ? 'small' : 'medium'
	const ariaLabel = visning === TabellType.KOORDINATOR ? 'Deltakere på tiltaksgjennomføring' : 'Mine deltakere'

	const [ markerAlle, setMarkerAlle ] = useState(false)
	const [ markerte, setMarkerte ] = useState<string[]>([])

	useEffect(() => {
		if (onChange !== undefined) {
			onChange(markerte.filter(v => v !== '*'))
		}
	}, [ markerte, onChange ])

	const handleChange = (val: string[]) => {
		if (val.includes('*') && !markerAlle) {
			setMarkerAlle(true)
			const values = deltakere.map(d => d.id)
			values.push('*')
			setMarkerte(values)
			return
		}
		if (!val.includes('*') && markerAlle) {
			setMarkerAlle(false)
			setMarkerte([])
			return
		}

		setMarkerte(val)
	}

	return (
		<Gruppe visCheckBox={visCheckBox} markerte={markerte} handleChange={handleChange}>
			<Table className="tabell" size={size} zebraStripes={true} sort={sortering} onSortChange={onSortChange} aria-label={ariaLabel}>
				<TabellHeader visning={visning} visCheckBox={visCheckBox} />
				<TabellBody
					deltakere={deltakere}
					visning={visning}
					visCheckBox={visCheckBox}
				/>
			</Table>
		</Gruppe>
	)
}

interface GruppeProps {
	visCheckBox?: boolean
	children: React.ReactNode
	markerte: string[]
	handleChange: (val: string[]) => void
}

const Gruppe = ({ visCheckBox, markerte, handleChange, children }: GruppeProps): React.ReactElement => {
	if (!visCheckBox) return <>{children}</>
	return <CheckboxGroup value={markerte} legend="Velg deltakere" onChange={handleChange} hideLegend>{children}</CheckboxGroup>
}
