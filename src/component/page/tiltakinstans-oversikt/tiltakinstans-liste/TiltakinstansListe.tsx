import React from 'react';
import { TiltakinstansOversiktPanel } from './tiltakinstans-oversikt-panel/TiltakinstansOversiktPanel';
import { Tiltak } from '../../../../api/data/tiltak';
import styles from './TiltaksinstansListe.module.less';
import { Systemtittel } from 'nav-frontend-typografi';
import dayjs from 'dayjs';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';

interface TiltakinstansListeProps {
	tiltak: Tiltak[];
}

export const TiltakinstansListe = (props: TiltakinstansListeProps) => {

	if (props.tiltak.length === 0) {
		return (
			<div>
				<AlertStripeInfo>Ingen tiltak</AlertStripeInfo>
			</div>
		);
	}

	return (
		<ul className={styles.cleanList}>
			{props.tiltak.map((tiltak, tiltakIdx) => {
				return (
					<li key={tiltakIdx} className="blokk-l">
						<Systemtittel className="blokk-m">{tiltak.typeNavn}</Systemtittel>
						<ul className={styles.cleanList}>
							{tiltak.tiltakinstanser.map((tiltakinstanse, tiltakinstanseIdx) => {
								return (
									<li key={tiltakinstanseIdx} className="blokk-s">
										<TiltakinstansOversiktPanel
											id={tiltakinstanse.id}
											navn={tiltak.typeNavn} // TODO: Hva blir navnet for en tiltakinstanse?
											oppstart={dayjs(tiltakinstanse.startdato).toDate()} // TODO: date-utils eller map DTO til ny modell lenger oppe
											deltakere={tiltakinstanse.deltakerAntall}
										/>
									</li>
								);
							})}
						</ul>
					</li>
				);
			})}
		</ul>
	);
};