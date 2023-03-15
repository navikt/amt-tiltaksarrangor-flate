import { ErrorMessage, Label } from '@navikt/ds-react'
import classNames from 'classnames'
import React, { useId } from 'react'
import Select, { MultiValue, SingleValue } from 'react-select'

import styles from './SelectField.module.scss'

export type SelectOption = {
	value: string,
	label: string,
}

interface Props {
	label: string
	isClearable?: boolean
	isMulti?: boolean
	value?: SelectOption | SelectOption[]
	options?: SelectOption[]
	onChange: (valg: MultiValue<SelectOption> | SingleValue<SelectOption>) => void
	className?: string
	isError?: boolean
	feilmelding?: string
}

export const SelectField = ({
	label,
	isClearable,
	isMulti,
	value,
	options,
	onChange,
	className,
	isError,
	feilmelding,
}: Props): React.ReactElement => {
	const selectId = useId()

	return (
		<div>
			<Label htmlFor={selectId}>{label}</Label>
			<Select
				id={selectId}
				isSearchable
				isClearable={isClearable}
				isMulti={isMulti}
				value={value}
				options={options}
				onChange={onChange}
				className={isError ? classNames(className, styles.error) : className}
				placeholder="Skriv fornavn eller etternavn"
				noOptionsMessage={() => 'Ingen treff'}
			/>
			{isError && <ErrorMessage size="small">{feilmelding ? feilmelding : 'Noe gikk galt'}</ErrorMessage>}
		</div>
	)
}
