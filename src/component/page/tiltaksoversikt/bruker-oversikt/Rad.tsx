import React from 'react';
import { Bruker } from '../../../../api/data/bruker';
import { lagKommaSeparertBrukerNavn } from '../../../../utils/bruker-utils';
import { mapTiltakStatusTilTekst, mapTiltakTypeTilTekst } from '../../../../utils/text-mappers';
import { PeopleFilled } from '@navikt/ds-icons';
import { Link } from 'react-router-dom';
import styles from './Rad.module.less';
import { formatDateStr } from '../../../../utils/date-utils';
import { BrukerSortering, Kolonnenavn } from './types';

interface RadProps {
	idx: number;
	bruker: Bruker;
	brukerSortering?: BrukerSortering;
}

const sortClassName = (name: Kolonnenavn, brukerSortering?: BrukerSortering): string | undefined => {
	if (!brukerSortering || name !== brukerSortering.kolonnenavn) {
		return undefined;
	}

	return 'tabell__td--sortert';
}

export const Rad = (props: RadProps) => {
	const {
		fodselsdato,
		fornavn,
		etternavn,
		tiltak,
		id,
	} = props.bruker;
	const userSort = props.brukerSortering;

	return (
		<tr>
			<td className={sortClassName(Kolonnenavn.NAVN, userSort)}>{lagKommaSeparertBrukerNavn(fornavn, etternavn)}</td>
			<td className={sortClassName(Kolonnenavn.FODSELSDATO, userSort)}>{fodselsdato}</td>
			<td className={sortClassName(Kolonnenavn.TILTAKSTYPE, userSort)}>{mapTiltakTypeTilTekst(tiltak.type)}</td>
			<td className={sortClassName(Kolonnenavn.TILTAK, userSort)}>{tiltak.navn}</td>
			<td className={sortClassName(Kolonnenavn.STATUS, userSort)}>{mapTiltakStatusTilTekst(tiltak.status)}</td>
			<td className={sortClassName(Kolonnenavn.START, userSort)}>{tiltak.startdato && formatDateStr(tiltak.startdato)}</td>
			<td className={sortClassName(Kolonnenavn.SLUTT, userSort)}>{tiltak.sluttdato && formatDateStr(tiltak.sluttdato)}</td>
			<td>
				<Link to={`/user/${id}`}>
					<PeopleFilled className={styles.personIcon}/>
				</Link>
			</td>
		</tr>
	);
};
