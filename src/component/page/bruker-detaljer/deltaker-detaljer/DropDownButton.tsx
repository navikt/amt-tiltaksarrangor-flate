import React from 'react'
import styles from './DropDownButton.module.scss'

import { EndringTypeIkon } from './EndringTypeIkon'
import { endringTypeTekstMapper } from './tekst-mappers'
import { EndringType } from './types'
import { Dropdown } from '@navikt/ds-react'

interface DropDownButtonProps {
	onClick: () => void
	endringstype: EndringType
}

export const DropDownButton = (props: DropDownButtonProps) => {

	const endringTypeClassMapper = (endringsType: EndringType) => {
		switch (endringsType) {
			case EndringType.DELTAKER_IKKE_AKTUELL: return styles.deltakerIkkeAktuell
			default: return ''
		}
	}

	return (
		<Dropdown.Menu.List.Item onClick={props.onClick}>
			<EndringTypeIkon type={props.endringstype}/>
			<span className={endringTypeClassMapper(props.endringstype)}>{endringTypeTekstMapper(props.endringstype)}</span>
		</Dropdown.Menu.List.Item>
	)
}
