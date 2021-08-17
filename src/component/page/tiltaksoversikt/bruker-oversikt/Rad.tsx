import React from 'react';
import { Bruker } from '../../../../api/data/bruker';
import { lagKommaSeparertBrukerNavn } from '../../../../utils/bruker-utils';
import { mapTiltakStatusTilTekst, mapTiltakTypeTilTekst } from '../../../../utils/text-mappers';
import { PeopleFilled } from '@navikt/ds-icons';
import { Link } from 'react-router-dom';
import styles from './Rad.module.less';
import { TableHeaderName, UserSort } from './TabellHeader';
import { formatDateStr } from '../../../../utils/date-utils';

interface UserRowProps {
	idx: number;
	bruker: Bruker;
	userSort?: UserSort;
}

const sortClassName = (name: TableHeaderName, userSort?: UserSort): string | undefined => {
	if (!userSort || name !== userSort.name) {
		return undefined;
	}

	return 'tabell__td--sortert';
}

export const Rad = (props: UserRowProps) => {
	const {
		fodselsdato,
		fornavn,
		etternavn,
		tiltak,
		id,
	} = props.bruker;
	const userSort = props.userSort;

	return (
		<tr>
			<td className={sortClassName(TableHeaderName.NAVN, userSort)}>{lagKommaSeparertBrukerNavn(fornavn, etternavn)}</td>
			<td className={sortClassName(TableHeaderName.FODSELSDATO, userSort)}>{fodselsdato}</td>
			<td className={sortClassName(TableHeaderName.TILTAKSTYPE, userSort)}>{mapTiltakTypeTilTekst(tiltak.type)}</td>
			<td className={sortClassName(TableHeaderName.TILTAK, userSort)}>{tiltak.navn}</td>
			<td className={sortClassName(TableHeaderName.STATUS, userSort)}>{mapTiltakStatusTilTekst(tiltak.status)}</td>
			<td className={sortClassName(TableHeaderName.START, userSort)}>{tiltak.startdato && formatDateStr(tiltak.startdato)}</td>
			<td className={sortClassName(TableHeaderName.SLUTT, userSort)}>{tiltak.sluttdato && formatDateStr(tiltak.sluttdato)}</td>
			<td>
				<Link to={`/user/${id}`}>
					<PeopleFilled className={styles.personIcon}/>
				</Link>
			</td>
		</tr>
	);
};
