import styles from './Menu.module.less';
import { Normaltekst } from 'nav-frontend-typografi';
import { useValgtVirksomhetStore } from '../../../store/valgt-virksomhet-store';
import React from 'react';
import { useDataStore } from '../../../store/data-store';
import { useHistory } from 'react-router-dom';

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
			<div>
				<Normaltekst className="blokk-xxs">Karoline Koordinatorsen</Normaltekst>

				<select
					id="virksomheter"
					name="virksomheter"
					value={valgtVirksomhet?.id}
					onChange={onValgtVirksomhetChanged}
					className={styles.virksomhetSelect}
				>
					{tilgjengeligeVirksomheter.map(virksomhet => {
						return (
							<option key={virksomhet.id} value={virksomhet.id}>
								{virksomhet.virksomhetsnavn}
							</option>
						)
					})}
				</select>
			</div>
		</header>
	);
};
