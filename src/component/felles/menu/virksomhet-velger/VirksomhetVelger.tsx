import './VirksomhetVelger.scss'

import { BodyShort, Label } from '@navikt/ds-react'
import cls from 'classnames'
import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Select, { MultiValue, OptionProps, SingleValue } from 'react-select'

import globalStyles from '../../../../globals.module.scss'
import { useDataStore } from '../../../../store/data-store'
import { useValgtVirksomhetStore } from '../../../../store/valgt-virksomhet-store'
import { internalUrl } from '../../../../utils/url-utils'
import styles from './VirksomhetVelger.module.scss'

interface Valg {
	value: string;
	label: string;
}

interface VirksomhetVelgerProps {
	className?: string;
}

export const VirksomhetVelger = (props: VirksomhetVelgerProps): React.ReactElement<VirksomhetVelgerProps> => {
	const navigate = useNavigate()
	const { innloggetAnsatt } = useDataStore()
	const { valgtVirksomhet, setValgtVirksomhet } = useValgtVirksomhetStore()

	const tilgjengeligeVirksomheter = innloggetAnsatt.arrangorer

	const onValgtVirksomhetChanged = (valg: SingleValue<Valg> | MultiValue<Valg>) => {
		const singleValg = valg as SingleValue<Valg>

		const nyValgtVirksomhet = tilgjengeligeVirksomheter.find(virksomhet => virksomhet.id === singleValg?.value)

		if (nyValgtVirksomhet) {
			setValgtVirksomhet(nyValgtVirksomhet)

			const rootUrl = internalUrl('/')

			// Når vi bytter virksomhet så redirect til gjennomforing-oversikt hvis vi ikke allerede er der
			if (window.location.pathname !== rootUrl) {
				navigate(rootUrl)
			}
		}
	}

	const virksomhetValg = useMemo(() => {
		return tilgjengeligeVirksomheter.map(v => ({ value: v.id, label: v.navn }))
	}, [ tilgjengeligeVirksomheter ])

	const selectedValue = useMemo(() => {
		return virksomhetValg.find(o => o.value === valgtVirksomhet.id)
	}, [ virksomhetValg, valgtVirksomhet ])

	return (
		<Select
			components={{ Option: VirksomhetValgOption }}
			defaultValue={selectedValue}
			onChange={onValgtVirksomhetChanged}
			options={virksomhetValg}
			placeholder="Velg virksomhet"
			className={props.className}
			classNamePrefix="virksomhet-velger"
			isSearchable={false}
			aria-label="Velg virksomhet"
		/>
	)
}

function VirksomhetValgOption(props: OptionProps<Valg>): React.ReactElement<OptionProps<Valg>> | null {
	const { innloggetAnsatt } = useDataStore()

	const virksomhet = innloggetAnsatt.arrangorer.find(v => v.id === props.data.value)

	if (!virksomhet) {
		return null
	}

	return (
		// Blir fikset av react-select
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus
		<div
			className={cls(styles.optionItem, props.isFocused && styles.optionItemFocused)}
			onClick={() => props.setValue(props.data, 'select-option', props.data)}
			role="option"
			aria-selected={props.isSelected}
		>
			<Label className={styles.fontSize14}>{virksomhet.overordnetEnhetNavn}</Label>
			<BodyShort className={cls(styles.fontSize14, globalStyles.blokkXs)}>Organisasjonsnr: {virksomhet.overordnetEnhetOrganisasjonsnummer}</BodyShort>

			<Label>{virksomhet.navn}</Label>
			<BodyShort className={styles.fontSize14}>Virksomhetsnr: {virksomhet.organisasjonsnummer}</BodyShort>
		</div>
	)
}