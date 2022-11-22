import { Dropdown } from '@navikt/ds-react-internal'
import React from 'react'

import { EndringTypeIkon } from './EndringTypeIkon'
import { endringTypeTekstMapper } from './tekst-mappers'
import { EndringType } from './types'

interface DropDownButtonProps {
	onClick: () => void
	endringstype: EndringType
}

export const DropDownButton = (props: DropDownButtonProps) => {
	return (
		<Dropdown.Menu.GroupedList.Item onClick={props.onClick}>
			<EndringTypeIkon type={props.endringstype}/>
			{endringTypeTekstMapper(props.endringstype)}
		</Dropdown.Menu.GroupedList.Item>
	)
}