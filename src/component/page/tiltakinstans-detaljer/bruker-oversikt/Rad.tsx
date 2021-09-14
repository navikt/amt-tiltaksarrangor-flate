import React from 'react';

import { Deltaker, TiltakStatus } from '../../../../api/data/bruker';
import { lagKommaSeparertBrukerNavn } from '../../../../utils/bruker-utils';
import { formatDateStr } from '../../../../utils/date-utils';
import { BrukerSortering, Kolonnenavn } from './types';
import { EtikettFokus, EtikettInfo, EtikettSuksess } from 'nav-frontend-etiketter';
import { Link } from 'react-router-dom';

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

const mapTiltakStatusTilEtikett = (tiltakStatus: TiltakStatus) => {
	switch (tiltakStatus) {
		case TiltakStatus.GJENNOMFORES:
			return <EtikettSuksess>Gjennomføres</EtikettSuksess>;
		case TiltakStatus.NY_BRUKER:
			return <EtikettInfo>Ny bruker</EtikettInfo>;
		case TiltakStatus.PAMELDT:
			return <EtikettFokus>Påmeldt</EtikettFokus>;
		default:
			return null;
	}
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
