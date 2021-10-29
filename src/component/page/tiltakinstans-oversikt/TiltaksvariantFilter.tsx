import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel'
import { Checkbox, CheckboxGruppe } from 'nav-frontend-skjema'
import React, { ChangeEvent } from 'react'

import globalStyles from '../../../globals.module.less'

interface Tiltak {
	type: string;
	navn: string;
}

interface TiltaksvariantFilterProps {
	tiltakValg: Tiltak[];
	valgteTyper: string[];
	onTiltakValgtChanged: (valgteTyper: string[]) => void;
}

export const TiltaksvariantFilter = (props: TiltaksvariantFilterProps): React.ReactElement<TiltaksvariantFilterProps> => {
	const { tiltakValg, valgteTyper, onTiltakValgtChanged } = props

	const handleTiltakValgtChanged = (e: ChangeEvent<HTMLInputElement>) => {
		const valgtTiltakType = e.target.value

		if (e.target.checked) {
			onTiltakValgtChanged([ ...valgteTyper, valgtTiltakType ])
		} else {
			onTiltakValgtChanged(valgteTyper.filter(t => t !== valgtTiltakType))
		}
	}

	return (
		<Ekspanderbartpanel tittel="Tiltaksvarianter" className={globalStyles.blokkM} apen>
			<CheckboxGruppe>
				{tiltakValg.map((tiltak) => (
					<Checkbox
						key={tiltak.type}
						label={tiltak.navn}
						name="filter-tiltakstype"
						value={tiltak.type}
						checked={valgteTyper.includes(tiltak.type)}
						onChange={handleTiltakValgtChanged}
					/>
				))}
			</CheckboxGruppe>
		</Ekspanderbartpanel>
	)
}