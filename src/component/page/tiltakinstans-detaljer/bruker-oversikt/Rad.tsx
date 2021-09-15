import React from 'react';

import { Deltaker } from '../../../../api/data/bruker';
import { lagKommaSeparertBrukerNavn } from '../../../../utils/bruker-utils';
import { formatDateStr } from '../../../../utils/date-utils';
import { BrukerSortering, Kolonnenavn } from './types';
import { Link } from 'react-router-dom';
import { mapTiltakStatusTilEtikett } from '../../../../utils/text-mappers';

interface RadProps {
	idx: number;
	bruker: Deltaker;
	brukerSortering?: BrukerSortering;
}

const sortClassName = (name: Kolonnenavn, brukerSortering?: BrukerSortering): string | undefined => {
	if (!brukerSortering || name !== brukerSortering.kolonnenavn) {
		return undefined;
	}

	return 'tabell__td--sortert';
};

export const Rad = (props: RadProps) => {
	const { fodselsdato, fornavn, etternavn, tiltak, id, stardato, sluttdato } = props.bruker;
	const userSort = props.brukerSortering;

	return (
		<tr key={id}>
			<td className={sortClassName(Kolonnenavn.NAVN, userSort)}>
				<Link to={`/user/${id}`}>
					{lagKommaSeparertBrukerNavn(fornavn, etternavn)}
				</Link>
			</td>
			<td className={sortClassName(Kolonnenavn.FODSELSDATO, userSort)}>{fodselsdato}</td>
			<td className={sortClassName(Kolonnenavn.START, userSort)}>
				{stardato && formatDateStr(stardato)}
			</td>
			<td className={sortClassName(Kolonnenavn.SLUTT, userSort)}>
				{sluttdato && formatDateStr(sluttdato)}
			</td>
			<td className={sortClassName(Kolonnenavn.STATUS, userSort)}>{mapTiltakStatusTilEtikett(tiltak.status)}</td>
		</tr>
	);
};
