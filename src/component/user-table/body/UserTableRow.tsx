import React from 'react';
import { Bruker } from '../../../api/data/bruker';
import { lagKommaSeparertBrukerNavn } from '../../../utils';
import { mapTiltakStatusTilTekst, mapTiltakTypeTilTekst } from '../../../utils/text-mappers';
import { PeopleFilled } from '@navikt/ds-icons';
import { Link } from 'react-router-dom';
import styles from './UserTableRow.module.less';
import { formatDateStr } from '../../../utils/date-utils';

export const UserRow = (props: { idx: number, bruker: Bruker }) => {
	const {
		fodselsdato,
		fornavn,
		etternavn,
		tiltak,
		id
	} = props.bruker;

	return (
		<tr>
			<td>{lagKommaSeparertBrukerNavn(fornavn, etternavn)}</td>
			<td>{fodselsdato}</td>
			<td>{mapTiltakTypeTilTekst(tiltak.type)}</td>
			<td>{tiltak.navn}</td>
			<td>{mapTiltakStatusTilTekst(tiltak.status)}</td>
			<td>{tiltak.startdato && formatDateStr(tiltak.startdato)}</td>
			<td>{tiltak.sluttdato && formatDateStr(tiltak.sluttdato)}</td>
			<td>
				<Link to={`/user/${id}`}>
					<PeopleFilled className={styles.personIcon}/>
				</Link>
			</td>
		</tr>
	);
};
