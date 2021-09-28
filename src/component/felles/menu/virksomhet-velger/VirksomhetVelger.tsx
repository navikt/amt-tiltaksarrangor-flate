import Select, { MultiValue, OptionProps, SingleValue } from 'react-select';
import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useDataStore } from '../../../../store/data-store';
import { useValgtVirksomhetStore } from '../../../../store/valgt-virksomhet-store';
import cls from 'classnames';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import styles from './VirksomhetVelger.module.less';
import './VirksomhetVelger.less';
import globalStyles from '../../../../globals.module.less';

interface Valg {
	value: string;
	label: string;
}

interface VirksomhetVelgerProps {
	className?: string;
}

export const VirksomhetVelger = (props: VirksomhetVelgerProps) => {
	const history = useHistory();
	const { innloggetAnsatt } = useDataStore();
	const { valgtVirksomhet, setValgtVirksomhet } = useValgtVirksomhetStore();

	const tilgjengeligeVirksomheter = innloggetAnsatt.virksomheter;

	const onValgtVirksomhetChanged = (valg: SingleValue<Valg> | MultiValue<Valg>) => {
		const singleValg = valg as SingleValue<Valg>

		const nyValgtVirksomhet = tilgjengeligeVirksomheter.find(virksomhet => virksomhet.id === singleValg?.value);

		if (nyValgtVirksomhet) {
			setValgtVirksomhet(nyValgtVirksomhet);

			// Når vi bytter virksomhet så redirect til tiltaksinstans-oversikt hvis vi ikke allerede er der
			if (history.location.pathname !== '/') {
				history.push('/');
			}
		}
	};

	const virksomhetValg = useMemo(() => {
		return tilgjengeligeVirksomheter.map(v => ({ value: v.id, label: v.virksomhetsnavn }))
	}, [tilgjengeligeVirksomheter])

	const selectedValue = useMemo(() => {
		return virksomhetValg.find(o => o.value === valgtVirksomhet.id)
	}, [virksomhetValg, valgtVirksomhet])

	return (
		<Select
			components={{Option: VirksomhetValgOption}}
			defaultValue={selectedValue}
			onChange={onValgtVirksomhetChanged}
			options={virksomhetValg}
			placeholder="Velg virksomhet"
			className={props.className}
			classNamePrefix="virksomhet-velger"
			isSearchable={false}
		/>
	);
};

function VirksomhetValgOption(props: OptionProps<Valg>) {
	const { innloggetAnsatt } = useDataStore();

	const virksomhet = innloggetAnsatt.virksomheter.find(v => v.id === props.data.value);

	if (!virksomhet) {
		return null;
	}

	return (
		<div
			className={cls(styles.optionItem, props.isFocused && styles.optionItemFocused)}
			onClick={() => props.setValue(props.data, 'select-option', props.data)}
			role="option"
			aria-selected={props.isSelected}
		>
			<Element className={styles.fontSize14}>{virksomhet.organisasjonsnavn}</Element>
			<Normaltekst className={cls(styles.fontSize14, globalStyles.blokkXs)}>Organisasjonsnr: {virksomhet.organisasjonsnummer}</Normaltekst>

			<Element>{virksomhet.virksomhetsnavn}</Element>
			<Normaltekst className={styles.fontSize14}>Virksomhetsnr: {virksomhet.virksomhetsnummer}</Normaltekst>
		</div>
	)
}