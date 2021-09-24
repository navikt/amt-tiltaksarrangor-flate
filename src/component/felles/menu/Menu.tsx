import styles from './Menu.module.less';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { useValgtVirksomhetStore } from '../../../store/valgt-virksomhet-store';
import React from 'react';
import cls from 'classnames';
import { useDataStore } from '../../../store/data-store';
import { useHistory } from 'react-router-dom';
import { Knapp } from 'nav-frontend-knapper';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import navLogo from './nav-logo.svg';

export const Menu = () => {
	const history = useHistory();
	const { innloggetAnsatt } = useDataStore();
	const { valgtVirksomhet, setValgtVirksomhet } = useValgtVirksomhetStore();

	const tilgjengeligeVirksomheter = innloggetAnsatt.virksomheter;

	const onValgtVirksomhetChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const id = e.target.value;
		const nyValgtVirksomhet = tilgjengeligeVirksomheter.find(virksomhet => virksomhet.id === id);

		if (nyValgtVirksomhet) {
			setValgtVirksomhet(nyValgtVirksomhet);
		}

		// Når vi bytter virksomhet så redirect til tiltaksinstans-oversikt hvis vi ikke allerede er der
		if (history.location.pathname !== '/') {
			history.push('/');
		}
	};

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
				<Normaltekst className="blokk-xxs">Karoline Koordinatorsen</Normaltekst>

				<select
					id="virksomheter"
					name="virksomheter"
					value={valgtVirksomhet?.id}
					onChange={onValgtVirksomhetChanged}
					className={cls(styles.virksomhetSelect, 'blokk-xs')}
				>
					{tilgjengeligeVirksomheter.map(virksomhet => {
						return (
							<option key={virksomhet.id} value={virksomhet.id}>
								{virksomhet.virksomhetsnavn}
							</option>
						)
					})}
				</select>

				<Knapp>Logg ut</Knapp>
			</div>
		</header>
	);
};
