import React from 'react';
import './TiltaksoversiktPage.less';
import { Checkbox, CheckboxGruppe, Input } from 'nav-frontend-skjema';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { UserTable } from '../../component/user-table/UserTable';
import { PaginationBar } from '../../component/user-table/pagination-bar/PaginationBar';
import { Header } from '../../component/header/Header';

export const TiltaksoversiktPage = () => {
	return (
		<>
			<Header/>
			<div className="tiltaksoversikt-page">

				<main className="tiltaksoversikt-page__filter-column">
					<Input placeholder="Søk etter navn eller fnr" className="blokk-m"/>

					<Ekspanderbartpanel tittel="Tiltakstype" className="blokk-m" apen>
						<CheckboxGruppe>
							{['Jobbsøkerkurs', 'Avklaring', 'Gruppe AMO', 'Oppfølging'].map(tiltakstype => (
								<Checkbox
									key={tiltakstype}
									label={tiltakstype}
									name="filter-tiltakstype"
									checked={false}
									onChange={() => {}}
								/>
							))}
						</CheckboxGruppe>
					</Ekspanderbartpanel>

					<Ekspanderbartpanel tittel="Status" className="blokk-m" apen>
						<CheckboxGruppe>
							{['Ny bruker', 'Påmeldt', 'Gjennomføres'].map(status => (
								<Checkbox
									key={status}
									label={status}
									name="filter-tiltakstatus"
									checked={false}
									onChange={() => {}}
								/>
							))}
						</CheckboxGruppe>
					</ Ekspanderbartpanel>
				</main>

				<div className="tiltaksoversikt-page__table-column">
					<PaginationBar/>
					<UserTable/>
				</div>
			</div>
		</>
	);
}
