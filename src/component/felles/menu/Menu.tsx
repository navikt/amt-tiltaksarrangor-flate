import styles from './Menu.module.less';
import { Normaltekst } from 'nav-frontend-typografi';
import { useValgtVirksomhetStore } from '../../../store/valgt-virksomhet-store';
import React from 'react';
import { useDataStore } from '../../../store/data-store';

export const Menu = () => {
	const { tilgjengeligeVirksomheter } = useDataStore();
	const { valgtVirksomhet, setValgtVirksomhet } = useValgtVirksomhetStore();

	const onValgtVirksomhetChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const id = e.target.value;
		const valgtVirksomhet = tilgjengeligeVirksomheter.find(virksomhet => virksomhet.id === id);

		if (valgtVirksomhet) {
			setValgtVirksomhet(valgtVirksomhet);
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
								{virksomhet.navn}
							</option>
						)
					})}
				</select>
			</div>
		</header>
	);
};
