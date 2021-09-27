import styles from './Menu.module.less';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { useValgtVirksomhetStore } from '../../../store/valgt-virksomhet-store';
import React, { useMemo } from 'react';
import cls from 'classnames';
import { useDataStore } from '../../../store/data-store';
import { useHistory } from 'react-router-dom';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import navLogo from './nav-logo.svg';
import Select, { MultiValue, OptionProps, SingleValue } from 'react-select';
import './VirksomhetVelgerSelect.less';

interface Valg {
	value: string;
	label: string;
}

export const Menu = () => {
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
		<header className={styles.menu}>
			<div className={styles.pilotInfoSection}>
				<AlertStripeInfo>
					Dette er en ny tjeneste som ikke er ferdig.
					Ta kontakt med oss her hvis du har noen tilbakemeldinger.
				</AlertStripeInfo>
			</div>

			<div className={styles.logoAndTitleSection}>
				<img src={navLogo} className="blokk-xs" alt="NAV logo"/>
				<Systemtittel>Oversikt for tiltaksarrangører</Systemtittel>
			</div>

			<div>
				<Normaltekst className="blokk-xxs">{`${innloggetAnsatt.fornavn} ${innloggetAnsatt.etternavn}`}</Normaltekst>

				<Select
					components={{Option: CustomOption}}
					defaultValue={selectedValue}
					onChange={onValgtVirksomhetChanged}
					options={virksomhetValg}
					placeholder="Velg virksomhet"
					className="blokk-xxs"
					classNamePrefix="virksomhet-velger"
					isSearchable={false}
				/>

				<a
					href="/auth-proxy/oauth2/logout?redirect_uri=https://nav.no"
					className={cls('knapp', 'knapp--standard', styles.logoutBtn)}
				>
					Logg ut
				</a>
			</div>
		</header>
	);
};

function CustomOption(props: OptionProps<Valg>) {
	const { innloggetAnsatt } = useDataStore();

	const virksomhet = innloggetAnsatt.virksomheter.find(v => v.id === props.data.value)!;

	return (
		<div
			className={cls(styles.optionItem, props.isFocused && styles.optionItemFocused)}
			onClick={() => props.setValue(props.data, 'select-option', props.data)}
			role="option"
			aria-selected={props.isSelected}
		>
			<Element className={styles.fontSize14}>{virksomhet.organsisasjonsnavn}</Element>
			<Normaltekst className={cls(styles.fontSize14, 'blokk-xs')}>Organisasjonsnr: {virksomhet.organsisasjonsnummer}</Normaltekst>

			<Element>{virksomhet.virksomhetsnavn}</Element>
			<Normaltekst className={styles.fontSize14}>Virksomhetsnr: {virksomhet.virksomhetsnummer}</Normaltekst>
		</div>
	)
}
