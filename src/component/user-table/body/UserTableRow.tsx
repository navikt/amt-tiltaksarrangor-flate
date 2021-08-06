import React from 'react';
import { Bruker } from '../../../api/data/bruker';
import { lagBrukerNavn } from '../../../utils';

export const UserRow = (props: { idx: number, bruker: Bruker }) => {
	const {
		fodselsdato,
		fornavn,
		etternavn,
		tiltakType,
		tiltakStatus,
		tiltak
	} = props.bruker;

	return (
		<tr>
			<td>{lagBrukerNavn(fornavn, etternavn)}</td>
			<td>{fodselsdato}</td>
			<td>{tiltakType}</td>
			<td>{tiltak}</td>
			<td>{tiltakStatus}</td>
		</tr>
	);
};
